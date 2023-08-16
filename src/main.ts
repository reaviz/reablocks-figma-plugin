import { emit, once, showUI } from "@create-figma-plugin/utilities";
import chroma from "chroma-js";

export default function () {
  function generateCSS() {
    const localStyles = figma.getLocalPaintStyles();
    const requiredStylesElements = [];

    for (const style of localStyles) {
      if (style.type === "PAINT" && style.paints[0].type === "SOLID") {
        // Example: Split input string like White, 'Primary/100', 'Chart/Chart Red 100' into
        // ['White', undefined], ['Primary', '100'], ['Chart', 'Chart Red 100'] while handling optional secondary value
        const [primaryLabel, secondaryLabel] = style.name.split("/").map((part) => part.trim());
        const { r, g, b } = (style.paints[0] as SolidPaint).color;
        requiredStylesElements.push({
          fullName: style.name,
          primaryLabel,
          secondaryLabel,
          opacity: style.paints[0].opacity,
          hex: chroma
            .rgb(
              r * 255,
              g * 255,
              b * 255,
              style.paints[0].opacity ?? 1
            )
            .hex(),
        });
      }
    }

    let colorJson: { [k: string]: any } = {};
    for (const color of requiredStylesElements) {
      const { primaryLabel, secondaryLabel, hex } = color;

      if (primaryLabel) {
        if (secondaryLabel) {
          colorJson[primaryLabel] = {
            ...colorJson[primaryLabel],
            [secondaryLabel]: hex,
          };
        } else {
          colorJson[primaryLabel] = hex;
        }
      }
    }

    return colorJson;
  }

  /**
   * Msg handlers
   */
  once("GENERATE_CSS", () => {
    const cssObj = generateCSS();
    emit("SUCCESS", { value: cssObj });
  });

  showUI({ height: 300, width: 600 });
}
