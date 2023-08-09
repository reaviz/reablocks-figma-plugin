figma.showUI(__html__);


const getCurrentColorNameAndWeight = (name: string): [string, string] => {
  const pattern = /\s\d+/;
  const match = pattern.exec(name.trim());
  if (match !== null) {
    const matchIndex = match.index;
    const realName = name.trim().substring(0, matchIndex).toLowerCase();
    const weight = name.trim().substring(matchIndex + 1);
    return [realName, weight];
  }
  return [name.trim().toLowerCase(), ''];
}

const rgbaToHex = (red: number, green: number, blue: number, opacity: number): string => {
  if (red < 0 || red > 255 || green < 0 || green > 255 || blue < 0 || blue > 255 || opacity < 0 || opacity > 100) {
    throw new Error("Invalid color value.");
  }

  const opacityDecimal = Math.round(opacity * 255);

  const opacityHex = Math.round(opacityDecimal).toString(16);
  const hex = `#${Number(red).toString(16)}${Number(green).toString(16)}${Number(blue).toString(16)}`;

  return opacityDecimal === 255 ? hex : `${hex}${opacityHex}`;
}

function generateCSS() {
  const localStyles = figma.getLocalPaintStyles();
  const requiredStylesElements = [];
  for (const style of localStyles) {
    if (style.type === 'PAINT' && style.paints[0].type === 'SOLID') {
      const [colorName, colorWeight] = getCurrentColorNameAndWeight(style.name);
      requiredStylesElements.push({
        fullname: style.name,
        name: colorName,
        weight: colorWeight,
        opacity: style.paints[0].opacity,
        hex: rgbaToHex(Math.round(((style.paints[0] as SolidPaint).color.r) * 255), Math.round(((style.paints[0] as SolidPaint).color.g) * 255), Math.round(((style.paints[0] as SolidPaint).color.b * 255)), style.paints[0].opacity ?? 1)
      })
    }
  }

  let colorJson: { [k: string]: any } = {};

  for (const color of requiredStylesElements) {
    if (colorJson.hasOwnProperty(color.name)) {
      colorJson[color.name][color.weight] = color.hex
    } else {
      if (color.weight) {
        colorJson[color.name] = {};
        colorJson[color.name][color.weight] = color.hex;
      } else {
        colorJson[color.name] = color.hex;
      }
    }
  }
  return colorJson;
}

figma.ui.resize(600, 600);

figma.ui.onmessage = msg => {
  if (msg.type === 'generate-css') {
    const cssObj = generateCSS();
    figma.ui.postMessage({ status: 'success', value: cssObj });
  }
  // figma.closePlugin();
};
