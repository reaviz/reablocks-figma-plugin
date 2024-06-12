import '!prismjs/themes/prism.css';

import {
  Button,
  Columns,
  Container,
  render,
  VerticalSpace,
  TextboxMultiline
} from '@create-figma-plugin/ui';
import { emit, once } from '@create-figma-plugin/utilities';
import { h } from 'preact';
import { useCallback, useState, useEffect } from 'preact/hooks';
import styles from './styles.css';
import copy from 'copy-to-clipboard';

function Plugin() {
  const [colorPalette, setColorPalette] = useState(`Click on Generate CSS!`);
  const [themeTokens, setThemeTokens] = useState(`Click on Generate CSS!`);

  const generateCSSButtonClick = useCallback(function (): void {
    emit('GENERATE_CSS');
  }, []);

  useEffect(() => {
    once('SUCCESS', (args) => {
      const { colors, themes } = args.value;
      setColorPalette(JSON.stringify(colors, null, 2));

      // remove quotes from all colorPalette aliases
      // ie, "colorPalette.blue[500]" =>  colorPalette.blue[500]
      const regex = /"colorPalette\.(.+)"/g;
      const formatted = JSON.stringify(themes, null, 2).replace(
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
      Themes:
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
          Copy Themes
        </Button>
      </Columns>
      <VerticalSpace space="small" />
    </Container>
  );
}

export default render(Plugin);
