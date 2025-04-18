import '!prismjs/themes/prism.css';

import {
  Button,
  Columns,
  Container,
  Dropdown,
  render,
  TextboxMultiline,
  VerticalSpace
} from '@create-figma-plugin/ui';
import { emit, on, once } from '@create-figma-plugin/utilities';
import copy from 'copy-to-clipboard';
import { h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import styles from './styles.css';

function Plugin() {
  const [colorVariables, setColorVariables] = useState('');
  const [modeVariables, setModeVariables] = useState('');
  const [componentVariables, setComponentVariables] = useState('');
  const [modes, setModes] = useState<Record<string, string>>({});
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  const generateColorVariablesClickHandler = useCallback(() => {
    emit('GENERATE_COLOR_VARIABLES');
    setColorVariables('Generating...')
  }, []);

  const generateModeVariablesClickHandler = useCallback(() => {
    emit('GENERATE_MODE_VARIABLES', { mode: selectedMode });
    setModeVariables('Generating...');
  }, [selectedMode]);

  const generateComponentVariablesClickHandler = useCallback(() => {
    emit('GENERATE_COMPONENT_VARIABLES');
    setComponentVariables('Generating...');
  }, []);

  const copyColors = useCallback(() => {
    copy(colorVariables);
  }, [colorVariables])

  const copyModeTokens = useCallback(() => {
    copy(modeVariables);
  }, [modeVariables]);

  const copyTokens = useCallback(() => {
    copy(componentVariables);
  }, [componentVariables]);

  useEffect(() => {
    emit('LOAD_MODES');
    once('LOADED_MODES', ({ modes }) => {
      setModes(modes);
      setSelectedMode(Object.keys(modes)?.[0])
    });
    on('GENERATED_COLOR_VARIABLES', ({ tokens }: {tokens: { token: string, value: string}[]}) => {
      setColorVariables(tokens.map(({ token, value }) => `--${token}: ${value};`).join(`\n`))
    });
    on('GENERATED_MODE_VARIABLES', ({ tokens }: {tokens: { token: string, value: string}[]}) => {
      setModeVariables(tokens.map(({ token, value }) => `--${token}: var(--${value});`).join(`\n`))
    });
    on('GENERATED_COMPONENT_VARIABLES', ({ tokens }: {tokens: { token: string, value: string}[]}) => {
      setComponentVariables(tokens.map(({ token, value }) => `--color-${token}: var(--${value});`).join(`\n`))
    });
  }, []);

  return (
    <Container space="large">
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
      <Columns space="small">
        <Button fullWidth onClick={generateColorVariablesClickHandler}>
          Generate
        </Button>
        <Button onClick={copyColors}>
          Copy
        </Button>
      </Columns>
      <VerticalSpace space="large" />
      Mode variables:
      <VerticalSpace space="extraSmall" />
      <Dropdown
        placeholder="Select Mode"
        value={selectedMode}
        options={Object.entries(modes).map(([key, val]) => ({text: val, value: key }))}
        onChange={(e) => setSelectedMode(e.currentTarget.value)}
      />
      <VerticalSpace space="extraSmall" />
      <div class={styles.container}>
        <TextboxMultiline
          rows={10}
          placeholder="Click on Generate"
          value={modeVariables}
        />
      </div>
      <VerticalSpace space="small" />
      <Columns space="small">
        <Button fullWidth onClick={generateModeVariablesClickHandler}>
          Generate
        </Button>
        <Button onClick={copyModeTokens}>
          Copy
        </Button>
      </Columns>
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
      <Columns space="small">
        <Button fullWidth onClick={generateComponentVariablesClickHandler}>
          Generate
        </Button>
        <Button onClick={copyTokens}>
          Copy
        </Button>
      </Columns>
    </Container>
  );
}

export default render(Plugin);
