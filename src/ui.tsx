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

function Plugin() {
  const [css, setCSS] = useState(`Click on Generate CSS!`);

  const generateCSSButtonClick = useCallback(function (): void {
    emit("GENERATE_CSS");
  }, []);

  useEffect(() => {
    once("SUCCESS", (args) => {
      setCSS(JSON.stringify(args.value));
    });
  }, []);

  return (
    <Container space="large">
      <VerticalSpace space="small" />
      <div class={styles.container}>
        <TextboxMultiline
          grow
          rows={10}
          placeholder="Click on Generate CSS!"
          value={css}
        ></TextboxMultiline>
      </div>
      <VerticalSpace space="large" />
      <Button fullWidth onClick={generateCSSButtonClick}>
        Generate CSS
      </Button>
      <VerticalSpace space="small" />
    </Container>
  );
}

export default render(Plugin);
