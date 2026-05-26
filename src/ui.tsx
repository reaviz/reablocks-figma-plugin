import '!prismjs/themes/prism.css';

import {
  Button,
  Container,
  Disclosure,
  Dropdown,
  render,
  TextboxMultiline,
  VerticalSpace,
} from '@create-figma-plugin/ui';
import { emit, on, once } from '@create-figma-plugin/utilities';
import copy from 'copy-to-clipboard';
import JSZip from 'jszip';
import { Fragment, h } from 'preact';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import { buildAllFiles, buildArchiveName, DefaultMode, ExportPayload } from './exporter';
import styles from './styles.css';

const GENERATING_TITLE = 'Generating...';
const COPIED_TITLE = 'Copied!';
const COPY_TITLE = 'Copy';
const EXPORT_TITLE = 'Export Styles';
const EXPORT_GENERATING_TITLE = 'Building zip...';
const EXPORT_DONE_TITLE = 'Downloaded!';
const EXPORT_TIMEOUT_MS = 30_000;

type Token = { token: string; value: string };

/**
 * Renders a mixed list of section headers and `{ token, value }` pairs
 * into a single CSS-variable text block. Strings are passed through verbatim
 * (used for `/* Colors *​/` style separators) while token objects become
 * `--token: value;` lines.
 */
function formatTokens(tokens: (string | Token)[]): string {
  return tokens
    .map((val) => (typeof val === 'string' ? val : `--${val.token}: ${val.value};`))
    .join('\n');
}

/**
 * Root component for the plugin UI.
 *
 * Talks to `main.ts` over the @create-figma-plugin message bus:
 *  - emits `LOAD_MODES`, `GENERATE_*`, and `EXPORT_ALL`
 *  - listens for `LOADED_MODES`, `GENERATED_*`, and `EXPORTED_ALL`
 *
 * Renders one of three states: loading, "no Unify variables found", or
 * the main controls (theme picker, export button, and an inspector
 * disclosure with per-section copy buttons).
 */
function Plugin() {
  const [modesLoading, setModesLoading] = useState<boolean>(true);
  const [colorVariables, setColorVariables] = useState('');
  const [modeVariables, setModeVariables] = useState('');
  const [componentVariables, setComponentVariables] = useState('');
  const [otherVariables, setOtherVariables] = useState('');
  const [modes, setModes] = useState<Record<string, string>>({});
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [styleModes, setStyleModes] = useState<Record<string, string>>({});
  const [selectedStyleMode, setSelectedStyleMode] = useState<string | null>(null);
  const [colorsCopyButtonText, setColorsCopyButtonText] = useState(COPY_TITLE);
  const [modeCopyButtonText, setModeCopyButtonText] = useState(COPY_TITLE);
  const [componentCopyButtonText, setComponentCopyButtonText] = useState(COPY_TITLE);
  const [otherCopyButtonText, setOtherCopyButtonText] = useState(COPY_TITLE);
  const [exportButtonText, setExportButtonText] = useState(EXPORT_TITLE);
  const [rootTheme, setRootTheme] = useState<DefaultMode>('dark');
  const [inspectOpen, setInspectOpen] = useState(false);

  const copyTimers = useRef<Record<string, number>>({});
  const exportInFlight = useRef(false);
  const exportUnsubscribe = useRef<(() => void) | null>(null);

  /**
   * Schedules a deferred state reset (used to revert button labels like
   * "Copied!" back to "Copy" after 2 seconds). Any previously scheduled
   * reset under the same `key` is cancelled first, so rapid clicks don't
   * race or leave the label stuck on the wrong state.
   *
   * @param key   Identifier for the timer slot (e.g. `'colors'`, `'export'`).
   * @param reset Callback invoked after the delay to revert state.
   */
  const scheduleReset = useCallback(
    (key: string, reset: () => void) => {
      const prev = copyTimers.current[key];
      if (prev) clearTimeout(prev);
      copyTimers.current[key] = window.setTimeout(() => {
        reset();
        delete copyTimers.current[key];
      }, 2000);
    },
    []
  );

  /**
   * Triggers regeneration of all four inspector token sections (root, mode,
   * component, other) by emitting the matching `GENERATE_*` events to
   * `main.ts`. Each text area is set to "Generating..." until its
   * corresponding `GENERATED_*` response arrives.
   */
  const generateVariablesHandler = useCallback(() => {
    setColorVariables(GENERATING_TITLE);
    setModeVariables(GENERATING_TITLE);
    setComponentVariables(GENERATING_TITLE);
    setOtherVariables(GENERATING_TITLE);
    emit('GENERATE_ROOT_VARIABLES');
    emit('GENERATE_MODE_VARIABLES', { mode: selectedMode });
    emit('GENERATE_COMPONENT_VARIABLES');
    emit('GENERATE_OTHER_VARIABLES', { styleMode: selectedStyleMode });
  }, [selectedMode, selectedStyleMode]);

  /** Copies the root-variables text block to the clipboard and flashes "Copied!" for 2s. */
  const copyColors = useCallback(() => {
    copy(colorVariables);
    setColorsCopyButtonText(COPIED_TITLE);
    scheduleReset('colors', () => setColorsCopyButtonText(COPY_TITLE));
  }, [colorVariables, scheduleReset]);

  /** Copies the mode-tokens text block to the clipboard and flashes "Copied!" for 2s. */
  const copyModeTokens = useCallback(() => {
    copy(modeVariables);
    setModeCopyButtonText(COPIED_TITLE);
    scheduleReset('mode', () => setModeCopyButtonText(COPY_TITLE));
  }, [modeVariables, scheduleReset]);

  /** Copies the component-tokens text block to the clipboard and flashes "Copied!" for 2s. */
  const copyTokens = useCallback(() => {
    copy(componentVariables);
    setComponentCopyButtonText(COPIED_TITLE);
    scheduleReset('component', () => setComponentCopyButtonText(COPY_TITLE));
  }, [componentVariables, scheduleReset]);

  /** Copies the "other" tokens text block (fonts, blurs, shadows) to the clipboard and flashes "Copied!" for 2s. */
  const copyOther = useCallback(() => {
    copy(otherVariables);
    setOtherCopyButtonText(COPIED_TITLE);
    scheduleReset('other', () => setOtherCopyButtonText(COPY_TITLE));
  }, [otherVariables, scheduleReset]);

  /**
   * Kicks off a full export:
   *  1. Asks `main.ts` for all token data via `EXPORT_ALL`.
   *  2. On response, builds the CSS file set with `buildAllFiles`, zips it
   *     with JSZip, and triggers a browser download.
   *
   * Guards:
   *  - `exportInFlight` ref blocks overlapping clicks so we never register
   *    two `once()` handlers at the same time.
   *  - A `EXPORT_TIMEOUT_MS` timer resets the button if `EXPORTED_ALL`
   *    never comes back (e.g. an error in the plugin sandbox).
   *  - The button label is flashed to a status string and reverts via
   *    `scheduleReset` so it can't get stuck on "Downloaded!".
   */
  const exportStylesHandler = useCallback(() => {
    if (exportInFlight.current) return;
    exportInFlight.current = true;
    setExportButtonText(EXPORT_GENERATING_TITLE);

    let timeoutId: number | undefined;
    const finish = (text: string) => {
      if (timeoutId) clearTimeout(timeoutId);
      if (exportUnsubscribe.current) {
        exportUnsubscribe.current();
        exportUnsubscribe.current = null;
      }
      exportInFlight.current = false;
      setExportButtonText(text);
      if (text !== EXPORT_TITLE) {
        scheduleReset('export', () => setExportButtonText(EXPORT_TITLE));
      }
    };

    timeoutId = window.setTimeout(() => {
      console.error('Export timed out waiting for EXPORTED_ALL');
      finish(EXPORT_TITLE);
    }, EXPORT_TIMEOUT_MS);

    exportUnsubscribe.current = once('EXPORTED_ALL', async (payload: ExportPayload) => {
      try {
        const files = buildAllFiles(payload, rootTheme);
        const zip = new JSZip();
        for (const [name, content] of Object.entries(files)) {
          zip.file(name, content);
        }
        const blob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = buildArchiveName(payload.fileName);
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url);
        finish(EXPORT_DONE_TITLE);
      } catch (err) {
        console.error('Failed to build styles zip', err);
        finish(EXPORT_TITLE);
      }
    });

    emit('EXPORT_ALL', { styleMode: selectedStyleMode });
  }, [rootTheme, selectedStyleMode, scheduleReset]);

  useEffect(() => {
    emit('LOAD_MODES');
    once(
      'LOADED_MODES',
      ({
        modes,
        defaultModeId,
        styleModes,
        defaultStyleModeId,
      }: {
        modes: Record<string, string>;
        defaultModeId?: string;
        styleModes: Record<string, string>;
        defaultStyleModeId?: string;
      }) => {
        setModes(modes);
        const firstMode = Object.keys(modes)?.[0];
        const initialMode = defaultModeId && modes[defaultModeId] ? defaultModeId : firstMode;
        if (initialMode) setSelectedMode(initialMode);

        setStyleModes(styleModes);
        const firstStyle = Object.keys(styleModes)?.[0];
        const initialStyle =
          defaultStyleModeId && styleModes[defaultStyleModeId] ? defaultStyleModeId : firstStyle;
        if (initialStyle) setSelectedStyleMode(initialStyle);

        setModesLoading(false);
      }
    );

    // `on()` from @create-figma-plugin/utilities returns its own teardown
    // function. We capture each one as `off*` and call them in the effect
    // cleanup so listeners don't stack on unmount / HMR re-mount.

    /**
     * Teardown for the `GENERATED_ROOT_VARIABLES` listener.
     * Invoke to detach the handler from the plugin message bus.
     */
    const offRoot = on(
      'GENERATED_ROOT_VARIABLES',
      ({ tokens }: { tokens: (string | Token)[] }) => {
        setColorVariables(formatTokens(tokens));
      }
    );

    /**
     * Teardown for the `GENERATED_MODE_VARIABLES` listener.
     * Invoke to detach the handler from the plugin message bus.
     */
    const offMode = on(
      'GENERATED_MODE_VARIABLES',
      ({ tokens }: { tokens: Token[] }) => {
        setModeVariables(
          tokens.map(({ token, value }) => `--${token}: var(--${value});`).join('\n')
        );
      }
    );

    /**
     * Teardown for the `GENERATED_COMPONENT_VARIABLES` listener.
     * Invoke to detach the handler from the plugin message bus.
     */
    const offComponent = on(
      'GENERATED_COMPONENT_VARIABLES',
      ({ tokens }: { tokens: (string | Token)[] }) => {
        setComponentVariables(formatTokens(tokens));
      }
    );

    /**
     * Teardown for the `GENERATED_OTHER_VARIABLES` listener.
     * Invoke to detach the handler from the plugin message bus.
     */
    const offOther = on(
      'GENERATED_OTHER_VARIABLES',
      ({ tokens }: { tokens: (string | Token)[] }) => {
        setOtherVariables(formatTokens(tokens));
      }
    );

    const timers = copyTimers.current;
    return () => {
      offRoot();
      offMode();
      offComponent();
      offOther();
      if (exportUnsubscribe.current) {
        exportUnsubscribe.current();
        exportUnsubscribe.current = null;
      }
      for (const id of Object.values(timers)) clearTimeout(id);
    };
  }, []);

  if (modesLoading) {
    return (
      <div class={styles.loading}>
        <h3>Loading...</h3>
      </div>
    );
  }

  if (Object.keys(modes).length === 0) {
    return (
      <Container space="large">
        <VerticalSpace space="small" />
        <div>
          <h2>Heads up! 🙌</h2>
          <p>
            It looks like this plugin is running outside of the Unify Design System workspace.
          </p>
          <p>
            The Unify Design System provides shared styles, components, and tokens that this plugin depends on to work correctly.
          </p>
          <p>
            To make full use of its features, please open or install the plugin within a Figma file that’s applied with the Unify Design System.
          </p>
          <p>You can find setup instructions, access details, and more information here:</p>
          <p>
            👉 Learn more at{' '}
            <a target="_blank" href="https://unifydesignsystem.com">
              unifydesignsystem.com
            </a>
          </p>
          <p>
            If you’re unsure whether your current Figma file is part of Unify, reach out to your design system admin or check your team’s Unify documentation.
          </p>
        </div>
        <VerticalSpace space="small" />
      </Container>
    );
  }

  return (
    <Container space="large">
      <VerticalSpace space="small" />
      {Object.keys(styleModes).length > 1 && (
        <Fragment>
          Style:
          <VerticalSpace space="extraSmall" />
          <Dropdown
            placeholder="Select Style"
            value={selectedStyleMode}
            options={Object.entries(styleModes).map(([key, val]) => ({
              text: val,
              value: key,
            }))}
            onChange={(e) => setSelectedStyleMode(e.currentTarget.value)}
          />
          <VerticalSpace space="small" />
        </Fragment>
      )}
      Default theme:
      <VerticalSpace space="extraSmall" />
      <Dropdown
        value={rootTheme}
        options={[
          { text: 'Dark', value: 'dark' },
          { text: 'Light', value: 'light' },
        ]}
        onChange={(e) => setRootTheme(e.currentTarget.value as DefaultMode)}
      />
      <VerticalSpace space="small" />
      <Button
        fullWidth
        disabled={exportButtonText === EXPORT_GENERATING_TITLE}
        onClick={exportStylesHandler}
      >
        {exportButtonText}
      </Button>
      <VerticalSpace space="large" />
      <Disclosure
        open={inspectOpen}
        onClick={() => setInspectOpen((v) => !v)}
        title="Inspect variables"
      >
        <VerticalSpace space="small" />
        Mode:
        <VerticalSpace space="extraSmall" />
        <Dropdown
          placeholder="Select Mode"
          value={selectedMode}
          options={Object.entries(modes).map(([key, val]) => ({
            text: val,
            value: key,
          }))}
          onChange={(e) => setSelectedMode(e.currentTarget.value)}
        />
        <VerticalSpace space="small" />
        <Button fullWidth secondary onClick={generateVariablesHandler}>
          Generate
        </Button>
        <VerticalSpace space="large" />
        Root variables:
        <VerticalSpace space="extraSmall" />
        <div class={styles.container}>
          <TextboxMultiline
            rows={10}
            placeholder="Click on Generate"
            value={colorVariables}
          />
        </div>
        <VerticalSpace space="small" />
        <Button
          disabled={
            !colorVariables ||
            colorVariables === GENERATING_TITLE ||
            colorsCopyButtonText === COPIED_TITLE
          }
          onClick={copyColors}
        >
          {colorsCopyButtonText}
        </Button>
        <VerticalSpace space="large" />
        Mode variables:
        <VerticalSpace space="extraSmall" />
        <div class={styles.container}>
          <TextboxMultiline
            rows={10}
            placeholder="Click on Generate"
            value={modeVariables}
          />
        </div>
        <VerticalSpace space="small" />
        <Button
          disabled={
            !modeVariables ||
            modeVariables === GENERATING_TITLE ||
            modeCopyButtonText === COPIED_TITLE
          }
          onClick={copyModeTokens}
        >
          {modeCopyButtonText}
        </Button>
        <VerticalSpace space="large" />
        Component variables:
        <VerticalSpace space="extraSmall" />
        <div class={styles.container}>
          <TextboxMultiline
            rows={10}
            placeholder="Click on Generate"
            value={componentVariables}
          />
        </div>
        <VerticalSpace space="small" />
        <Button
          disabled={
            !componentVariables ||
            componentVariables === GENERATING_TITLE ||
            componentCopyButtonText === COPIED_TITLE
          }
          onClick={copyTokens}
        >
          {componentCopyButtonText}
        </Button>
        <VerticalSpace space="large" />
        Other variables:
        <VerticalSpace space="extraSmall" />
        <div class={styles.container}>
          <TextboxMultiline
            rows={10}
            placeholder="Click on Generate"
            value={otherVariables}
          />
        </div>
        <VerticalSpace space="small" />
        <Button
          disabled={
            !otherVariables ||
            otherVariables === GENERATING_TITLE ||
            otherCopyButtonText === COPIED_TITLE
          }
          onClick={copyOther}
        >
          {otherCopyButtonText}
        </Button>
        <VerticalSpace space="small" />
      </Disclosure>
    </Container>
  );
}

export default render(Plugin);
