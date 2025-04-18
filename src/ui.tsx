import '!prismjs/themes/prism.css';

import {
  Button,
  Columns,
  Container,
  render,
  TextboxMultiline,
  VerticalSpace
} from '@create-figma-plugin/ui';
import { emit, once } from '@create-figma-plugin/utilities';
import copy from 'copy-to-clipboard';
import { h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import styles from './styles.css';

function Plugin() {
  const [colorPalette, setColorPalette] = useState(`Click on Generate Tokens!`);
  const [themeTokens, setThemeTokens] = useState(`Click on Generate Tokens!`);

  const generateCSSButtonClick = useCallback(function (): void {
    emit('GENERATE_CSS');
  }, []);

  useEffect(() => {
    once('SUCCESS', (args) => {
      const { colors, tokens } = args.value;
      setColorPalette(JSON.stringify(colors, null, 2));

      // remove quotes from all colorPalette aliases
      // ie, "colorPalette.blue[500]" =>  colorPalette.blue[500]
      const regex = /"colorPalette\.(.+)"/g;
      const formatted = JSON.stringify(tokens, null, 2).replace(
        regex,
        (match) => match.replace(/"/g, '')
      );
      setThemeTokens(formatted);
    });
  }, []);

  function copyColorPalette() {
    copy(colorPalette);
  }

  function copyThemeTokens() {
    copy(themeTokens);
  }

  return (
    <Container space="large">
      <VerticalSpace space="small" />
      Color Palettes:
      <div class={styles.container}>
        <TextboxMultiline
          rows={10}
          placeholder="Click on Generate Tokens"
          value={colorPalette}
        />
      </div>
      <VerticalSpace space="extraSmall" />
      ComponentTokens:
      <div class={styles.container}>
        <TextboxMultiline
          rows={10}
          placeholder="Click on Generate Tokens"
          value={themeTokens}
        />
      </div>
      <VerticalSpace space="small" />
      <Button fullWidth onClick={generateCSSButtonClick}>
        Generate Tokens
      </Button>
      <VerticalSpace space="small" />
      <Columns space="small">
        <Button fullWidth onClick={copyColorPalette}>
          Copy Colors
        </Button>
        <Button fullWidth onClick={copyThemeTokens}>
          Copy Tokens
        </Button>
      </Columns>
      <VerticalSpace space="small" />
    </Container>
  );
}

export default render(Plugin);
