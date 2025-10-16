import '!prismjs/themes/prism.css';

import {
  Button,
  Container,
  Dropdown,
  render,
  TextboxMultiline,
  VerticalSpace,
} from '@create-figma-plugin/ui';
import { emit, on, once } from '@create-figma-plugin/utilities';
import copy from 'copy-to-clipboard';
import { h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import styles from './styles.css';

const GENERATING_TITLE = 'Generating...';
const COPIED_TITLE = 'Copied!';
const COPY_TITLE = 'Copy';

function Plugin() {
  const [modesLoading, setModesLoading] = useState<boolean>(true);
  const [colorVariables, setColorVariables] = useState('');
  const [modeVariables, setModeVariables] = useState('');
  const [componentVariables, setComponentVariables] = useState('');
  const [otherVariables, setOtherVariables] = useState('');
  const [modes, setModes] = useState<Record<string, string>>({});
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [colorsCopyButtonText, setColorsCopyButtonText] = useState(COPY_TITLE);
  const [modeCopyButtonText, setModeCopyButtonText] = useState(COPY_TITLE);
  const [componentCopyButtonText, setComponentCopyButtonText] =
    useState(COPY_TITLE);
  const [otherCopyButtonText, setOtherCopyButtonText] =
    useState(COPY_TITLE);

  const generateVariablesHandler = useCallback(() => {
    setColorVariables(GENERATING_TITLE);
    setModeVariables(GENERATING_TITLE);
    setComponentVariables(GENERATING_TITLE);
    setOtherVariables(GENERATING_TITLE);
    emit('GENERATE_ROOT_VARIABLES');
    emit('GENERATE_MODE_VARIABLES', { mode: selectedMode });
    emit('GENERATE_COMPONENT_VARIABLES');
    emit('GENERATE_OTHER_VARIABLES');
  }, [selectedMode]);

  const copyColors = useCallback(() => {
    copy(colorVariables);
    setColorsCopyButtonText(COPIED_TITLE);
    setTimeout(() => setColorsCopyButtonText(COPY_TITLE), 2000);
  }, [colorVariables]);

  const copyModeTokens = useCallback(() => {
    copy(modeVariables);
    setModeCopyButtonText(COPIED_TITLE);
    setTimeout(() => setModeCopyButtonText(COPY_TITLE), 2000);
  }, [modeVariables]);

  const copyTokens = useCallback(() => {
    copy(componentVariables);
    setComponentCopyButtonText(COPIED_TITLE);
    setTimeout(() => setComponentCopyButtonText(COPY_TITLE), 2000);
  }, [componentVariables]);

  const copyOther = useCallback(() => {
    copy(otherVariables);
    setOtherCopyButtonText(COPIED_TITLE);
    setTimeout(() => setOtherCopyButtonText(COPY_TITLE), 2000);
  }, [otherVariables]);

  useEffect(() => {
    emit('LOAD_MODES');
    once('LOADED_MODES', ({ modes }) => {
      const mode = Object.keys(modes)?.[0];
      setModes(modes);
      if (mode) {
        setSelectedMode(Object.keys(modes)?.[0]);
      }
      setModesLoading(false);
    });
    on(
      'GENERATED_ROOT_VARIABLES',
      ({ tokens }: { tokens: { token: string; value: string }[] }) => {
        setColorVariables(
          tokens.map((val) => {
            if (typeof val === 'string') {
              return val;
            } else {
              return`--${val.token}: ${val.value};`
            }
          })
          .join(`\n`),
        );
      },
    );
    on(
      'GENERATED_MODE_VARIABLES',
      ({ tokens }: { tokens: { token: string; value: string }[] }) => {
        setModeVariables(
          tokens
            .map(({ token, value }) => `--${token}: var(--${value});`)
            .join(`\n`),
        );
      },
    );
    on(
      'GENERATED_COMPONENT_VARIABLES',
      ({ tokens }: { tokens: (string | { token: string; value: string })[] }) => {
        setComponentVariables(
          tokens
            .map((val) => {
              if (typeof val === 'string') {
                return val;
              } else {
                return`--${val.token}: ${val.value};`
              }
            })
            .join(`\n`),
        );
      },
    );
    on(
      'GENERATED_OTHER_VARIABLES',
      ({ tokens }: { tokens: ({ token: string; value: string } | string)[] }) => {
        setOtherVariables(
          tokens
            .map((val) => {
              if (typeof val === 'string') {
                return val;
              } else {
                return`--${val.token}: ${val.value};`
              }
            })
            .join(`\n`),
        );
      },
    );
  }, [setModes, setSelectedMode]);

  if (modesLoading) {
    return <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <h3>Loading...</h3>
    </div>
  }

  if (Object.keys(modes).length === 0) {
    return (
      <Container space="large">
        <VerticalSpace space="small" />
        <div>
          <p>
          <h2>Heads up! 🙌</h2>
          </p>
          <p>
          It looks like this plugin is running outside of the Unify Design System workspace.
          </p>
          <p>
          The Unify Design System provides shared styles, components, and tokens that this plugin depends on to work correctly.
          </p>
          <p>
          To make full use of its features, please open or install the plugin within a Figma file that’s applied with the Unify Design System.
          </p>
          <p>
          You can find setup instructions, access details, and more information here:
          </p>
          <p>
          👉 Learn more at <a target="_blank" href="https://unifydesignsystem.com">unifydesignsystem.com</a>
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
      <Button fullWidth onClick={generateVariablesHandler}>
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
    </Container>
  );
}

export default render(Plugin);
