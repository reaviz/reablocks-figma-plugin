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
  function generateColors(): CSSJson {
    let colorJson: { [k: string]: any } = {};
    /*
    Examples:
    {name: 'Mode 1', modeId: '390:0'}
    {name: 'Light Mode', modeId: '60:0'}
    {name: 'Dark Mode', modeId: '390:1'}
    {name: 'Wireframe Mode', modeId: '1282:1'}
    */

    const collections = figma.variables.getLocalVariableCollections();
    console.log('collections', collections);

    const modes = collections.reduce((cur, col) => {
      const res = { ...cur };
      for (const mode of col.modes) {
        res[mode.modeId] = mode.name;
      }
      return res;
    }, {});

    const tokens = figma.variables.getLocalVariables();
    console.log('styles', tokens);

    for (const token of tokens) {
      if (token.resolvedType === 'COLOR') {
        const modeIds = Object.keys(token.valuesByMode);
        for (const modeId of modeIds) {
          // Get the token color
          const { r, g, b } = token.valuesByMode[modeId] as any;
          const hex = chroma.rgb(r * 255, g * 255, b * 255).hex();

          // tease out primary and secondary labels
          let [primaryLabel, secondaryLabel] = token.name
            .split('/')
            .map((part) => part.trim().toLowerCase());

          // trim start of label like 'primary 100' to just '100'
          secondaryLabel = secondaryLabel.replace(primaryLabel, '').trim().toString();
          if (secondaryLabel[0] === '-') {
            secondaryLabel = secondaryLabel.substring(1);
          }

          // set default objects
          const modeName = modes[modeId];
          if (colorJson[modeName] === undefined) {
            colorJson[modeName] = {};
          }

          if (colorJson[modeName][primaryLabel] === undefined) {
            colorJson[modeName][primaryLabel] = {};
          }

          if (colorJson[modeName][primaryLabel][secondaryLabel] === undefined) {
            colorJson[modeName][primaryLabel][secondaryLabel] = {};
          }

          // Add color to json
          colorJson[modeName][primaryLabel][secondaryLabel] = hex;
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
    const colorsObj = generateColors();
    emit('SUCCESS', { value: colorsObj });
  });

  showUI({ height: 500, width: 400 });
}
