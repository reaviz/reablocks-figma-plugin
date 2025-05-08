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
  const [colorVariables, setColorVariables] = useState('');
  const [modeVariables, setModeVariables] = useState('');
  const [componentVariables, setComponentVariables] = useState('');
  const [modes, setModes] = useState<Record<string, string>>({});
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [colorsCopyButtonText, setColorsCopyButtonText] = useState(COPY_TITLE);
  const [modeCopyButtonText, setModeCopyButtonText] = useState(COPY_TITLE);
  const [componentCopyButtonText, setComponentCopyButtonText] =
    useState(COPY_TITLE);

  const generateVariablesHandler = useCallback(() => {
    setColorVariables(GENERATING_TITLE);
    setModeVariables(GENERATING_TITLE);
    setComponentVariables(GENERATING_TITLE);
    emit('GENERATE_COLOR_VARIABLES');
    emit('GENERATE_MODE_VARIABLES', { mode: selectedMode });
    emit('GENERATE_COMPONENT_VARIABLES');
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

  useEffect(() => {
    emit('LOAD_MODES');
    once('LOADED_MODES', ({ modes }) => {
      setModes(modes);
      setSelectedMode(Object.keys(modes)?.[0]);
    });
    on(
      'GENERATED_COLOR_VARIABLES',
      ({ tokens }: { tokens: { token: string; value: string }[] }) => {
        setColorVariables(
          tokens.map(({ token, value }) => `--${token}: ${value};`).join(`\n`),
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
      ({ tokens }: { tokens: { token: string; value: string }[] }) => {
        setComponentVariables(
          tokens
            .map(({ token, value }) => `--color-${token}: var(--${value});`)
            .join(`\n`),
        );
      },
    );
  }, [setModes, setSelectedMode]);

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
      Color variables:
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
      <VerticalSpace space="small" />
    </Container>
  );
}

export default render(Plugin);
