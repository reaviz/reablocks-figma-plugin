import "!prismjs/themes/prism.css";

import {
  Button,
  Container,
  render,
  VerticalSpace,
  TextboxMultiline,
} from "@create-figma-plugin/ui";
import { emit, once } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useState, useEffect} from "preact/hooks";
import styles from "./styles.css";
import copy from 'copy-to-clipboard';

function Plugin() {
  const [css, setCSS] = useState(`Click on Generate CSS!`);

  const generateCSSButtonClick = useCallback(function (): void {
    emit("GENERATE_CSS");
  }, []);

  useEffect(() => {
    once("SUCCESS", (args) => {
      setCSS(JSON.stringify(args.value, null, 2));
    });
  }, []);

  function copyClipboard() {
    copy(css);
  }

  return (
    <Container space="large">
      <VerticalSpace space="small" />
      <div class={styles.container}>
        <TextboxMultiline
          rows={23}
          placeholder="Click on Generate Tokens"
          value={css}
        />
      </div>
      <VerticalSpace space="large" />
      <Button fullWidth onClick={generateCSSButtonClick}>
        Generate Tokens
      </Button>
      <VerticalSpace space="small" />
      <Button fullWidth onClick={copyClipboard}>
        Copy to clipboard
      </Button>
      <VerticalSpace space="small" />
    </Container>
  );
}

export default render(Plugin);
