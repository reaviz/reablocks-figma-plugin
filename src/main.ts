import { emit, on, showUI } from '@create-figma-plugin/utilities';
import chroma from 'chroma-js';

interface ColorTokenInfo {
  primaryLabel: string;
  secondaryLabel: string;
  fullName: string;
  opacity: number | undefined;
  hex: string;
}

interface CSSJson {
  colors: { [k: string]: any };
}

export default function () {
  function generateCSS(): CSSJson {
    const localStyles = figma.getLocalPaintStyles();
    const requiredStylesElements: ColorTokenInfo[] = [];
    let colorJson: { [k: string]: any } = {};

    for (const style of localStyles) {
      if (style.type === 'PAINT' && style.paints[0].type === 'SOLID') {
        // Example: Split input string like White, 'Primary/100', 'Chart/Chart Red 100' into
        // ['White', undefined], ['Primary', '100'], ['Chart', 'Chart Red 100'] while handling optional secondary value
        const [primaryLabel, secondaryLabel] = style.name
          .split("/")
          .map((part) => part.trim().toLowerCase());
        const { r, g, b } = (style.paints[0] as SolidPaint).color;
        const hex = chroma.rgb(r * 255, g * 255, b * 255, style.paints[0].opacity ?? 1).hex();
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
    }

    return {
      'colors': colorJson
    };
  }

  /**
   * Msg handlers
   */
  on('GENERATE_CSS', () => {
    const cssObj = generateCSS();
    emit('SUCCESS', { value: cssObj });
  });

  showUI({ height: 300, width: 600 });
}
