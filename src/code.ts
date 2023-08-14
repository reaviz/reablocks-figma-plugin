figma.showUI(__html__);

function rgbaToHex(red: number, green: number, blue: number, opacity: number): string {
  if (
    red < 0 ||
    red > 255 ||
    green < 0 ||
    green > 255 ||
    blue < 0 ||
    blue > 255 ||
    opacity < 0 ||
    opacity > 100
  ) {
    throw new Error(`Invalid color value: rgba(${red}, ${green}, ${blue}, ${opacity})`);
  }

  const opacityDecimal = Math.round(opacity * 255);

  const opacityHex = Math.round(opacityDecimal).toString(16);
  const hex = `#${Number(red).toString(16)}${Number(green).toString(16)}${Number(blue).toString(
    16
  )}`;

  return opacityDecimal === 255 ? hex : `${hex}${opacityHex}`;
}

function generateCSS() {
  const localStyles = figma.getLocalPaintStyles();
  const requiredStylesElements = [];

  for (const style of localStyles) {
    if (style.type === "PAINT" && style.paints[0].type === "SOLID") {
      // Example: Split input string like White, 'Primary/100', 'Chart/Chart Red 100' into
      // ['White', undefined], ['Primary', '100'], ['Chart', 'Chart Red 100'] while handling optional secondary value
      const [primaryLabel, secondaryLabel] = style.name.split('/').map((part) => part.trim());
      requiredStylesElements.push({
        fullName: style.name,
        primaryLabel,
        secondaryLabel,
        opacity: style.paints[0].opacity,
        hex: rgbaToHex(
          Math.round((style.paints[0] as SolidPaint).color.r * 255),
          Math.round((style.paints[0] as SolidPaint).color.g * 255),
          Math.round((style.paints[0] as SolidPaint).color.b * 255),
          style.paints[0].opacity ?? 1
        )
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
          [secondaryLabel]: hex
        };
      } else {
        colorJson[primaryLabel] = hex;
      }
    }
  }

  return colorJson;
}

figma.ui.resize(600, 600);

figma.ui.onmessage = (msg) => {
  if (msg.type === 'generate-css') {
    const cssObj = generateCSS();
    figma.ui.postMessage({ status: 'success', value: cssObj });
  }
  // figma.closePlugin();
};
