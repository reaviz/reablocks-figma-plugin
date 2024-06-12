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
  async function generateColors() {
    let colorPalette: { [k: string]: any } = {};
    let themeTokens: { [k: string]: any } = {};
    /*
    Examples:
    {name: 'Mode 1', modeId: '390:0'}
    {name: 'Light Mode', modeId: '60:0'}
    {name: 'Dark Mode', modeId: '390:1'}
    {name: 'Wireframe Mode', modeId: '1282:1'}
    */

    const collections =
      await figma.variables.getLocalVariableCollectionsAsync();
    console.log('collections', collections);

    const modes: any = collections.reduce((cur, col) => {
      const res: any = { ...cur };
      for (const mode of col.modes) {
        res[mode.modeId] = mode.name;
      }
      return res;
    }, {});

    const tokens = await figma.variables.getLocalVariablesAsync();
    console.log('styles', tokens);

    for (const token of tokens) {
      if (token.resolvedType === 'COLOR') {
        const modeIds = Object.keys(token.valuesByMode);
        for (const modeId of modeIds) {
          // tease out primary and secondary labels
          let [primaryLabel, secondaryLabel] = token.name
            .split('/')
            .map((part) => part.trim().toLowerCase());

          // trim start of label like 'primary 100' to just '100'
          if (secondaryLabel) {
            secondaryLabel = secondaryLabel
              .replace(primaryLabel, '')
              .trim()
              .toString();
            if (secondaryLabel[0] === '-') {
              secondaryLabel = secondaryLabel.substring(1);
            }
          }

          // set default objects
          const modeName = modes[modeId];
          if (modeName === 'Wireframe Mode') {
            // skip - no need to export wireframe colors
          } else if (modeName === 'Mode 1') {
            // Handle color palette tokens

            const { r, g, b, a } = token.valuesByMode[modeId] as any;
            const hex = chroma
              .rgb(r * 255, g * 255, b * 255)
              .alpha(a ?? 1)
              .hex();

            // for color palette, keep at the root level - shared by both light and dark modes
            if (colorPalette[primaryLabel] === undefined) {
              colorPalette[primaryLabel] = {};
            }

            // replace instances of opacity to match Tailwind conventions
            // ie, primary['500-40'] => priamry['500/40']
            secondaryLabel = secondaryLabel?.replace('-', '/');
            if (
              secondaryLabel &&
              colorPalette[primaryLabel][secondaryLabel] === undefined
            ) {
              colorPalette[primaryLabel][secondaryLabel] = {};
            }

            // Add color to json
            if (secondaryLabel) {
              colorPalette[primaryLabel][secondaryLabel] = hex;
            } else {
              colorPalette[primaryLabel] = hex;
            }
          } else {
            // Handle theme tokens

            // grab the theme - most likely `dark` or `light`
            const theme = modeName.split(' ')[0].toLowerCase();

            // get the color variable alias name
            const aliasVariable = await figma.variables.getVariableByIdAsync(
              token.valuesByMode[modeId].id
            );

            let aliasName = '';
            if (aliasVariable!.name.includes('/')) {
              const [color, scale] = aliasVariable!.name
                .split('/')[1]
                .split(' ')
                .map((part) => part.trim().toLowerCase());

              // if the scale includes opacity, update the format to match Tailwind conventions
              // ie, ['500-40'] => ['500/40']
              const colorScale = `[${
                scale?.includes('-')
                  ? `'${scale.replace('-', '/')}'`
                  : scale.replace('-', '/')
              }]`;
              aliasName = `colorPalette.${color}${colorScale}`;
            } else {
              // for name such as Black or White
              aliasName = `colorPalette.${aliasVariable!.name.toLowerCase()}`;
            }

            // set default objects
            if (themeTokens[theme] === undefined) {
              themeTokens[theme] = {};
            }

            if (themeTokens[theme][primaryLabel] === undefined) {
              themeTokens[theme][primaryLabel] = {};
            }

            if (
              themeTokens[theme][primaryLabel][secondaryLabel] === undefined
            ) {
              themeTokens[theme][primaryLabel][secondaryLabel] = {};
            }

            // Add color to json
            themeTokens[theme][primaryLabel][secondaryLabel] = aliasName;

            // to keep with existing DEFAULT, active, hover, etc structure, set a DEFAULT value
            // that is the same as active
            if (secondaryLabel === 'active') {
              themeTokens[theme][primaryLabel]['DEFAULT'] = aliasName;
            }
          }
        }
      }
    }

    return {
      colors: colorPalette,
      themes: themeTokens
    };
  }

  /**
   * Msg handlers
   */
  on('GENERATE_CSS', () => {
    generateColors().then((colorsObj) => {
      emit('SUCCESS', { value: colorsObj });
    });
  });

  showUI({ height: 500, width: 400 });
}
