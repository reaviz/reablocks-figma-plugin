import { emit, on, showUI } from '@create-figma-plugin/utilities';
import chroma from 'chroma-js';
import merge from 'lodash.merge';

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
    let unifyTokens: { [k: string]: any } = {};
    /*
    Examples:
    {name: 'Mode 1', modeId: '390:0'}
    {name: 'Light Mode', modeId: '60:0'}
    {name: 'Dark Mode', modeId: '390:1'}
    {name: 'Wireframe Mode', modeId: '1282:1'}
    */

    const collections =
      await figma.variables.getLocalVariableCollectionsAsync();

    // we only care about Component level tokens
    const componentTokenCollectionId = collections.find(
      (col) => col.name === 'Lvl 04 - Component',
    )?.id;

    const modes: any = collections.reduce((cur, col) => {
      if (
        ['Lvl 03 (B) - Typography', 'Lvl 03 (C) - Dimension'].includes(col.name)
      ) {
        return cur;
      }
      const res: any = { ...cur };
      for (const mode of col.modes) {
        res[mode.modeId] = mode.name;
      }
      return res;
    }, {});

    const tokens = await figma.variables.getLocalVariablesAsync();

    for (const token of tokens) {
      if (token.resolvedType === 'COLOR') {
        const modeIds = Object.keys(token.valuesByMode);
        for (const modeId of modeIds) {
          // tease out primary and secondary labels
          let [rawSecondaryLabel, rawPrimaryLabel] = token.name
            .split('/')
            .map((part) => part.trim().toLowerCase())
            .reverse();

          const primaryLabel = sanitizeName(rawPrimaryLabel);
          let secondaryLabel = sanitizeName(rawSecondaryLabel);

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

            // Add color to json
            if (secondaryLabel) {
              colorPalette[primaryLabel][secondaryLabel] = hex;
            } else {
              colorPalette[primaryLabel] = hex;
            }
          } else if (
            token.variableCollectionId !== componentTokenCollectionId
          ) {
            // skip - only pull tokens from Component level tokens
            // the other levels are passthroughs used only for design purposes
          } else {
            // Handle theme tokens
            console.log('modeName', modeName);
            // Get the color variable alias name
            let aliasVariable = await figma.variables.getVariableByIdAsync(
              (token.valuesByMode[modeId] as any).id,
            );

            let aliasValue = '';
            if (!aliasVariable || aliasVariable.resolvedType !== 'COLOR') {
              // ignore anything that's not a color
              console.log('aliasVariable', aliasVariable);
            } else if (aliasVariable.name.includes('/')) {
              // continue to resolve alias until we get to the base color
              let firstKey = Object.keys(aliasVariable.valuesByMode)[0];
              while (
                (aliasVariable && (aliasVariable.valuesByMode[firstKey] as any))
                  .type === 'VARIABLE_ALIAS'
              ) {
                const aliasId = (aliasVariable!.valuesByMode[firstKey] as any)
                  .id;
                aliasVariable = await figma.variables.getVariableByIdAsync(
                  aliasId,
                );
                firstKey = Object.keys(aliasVariable!.valuesByMode)[0];
              }

              // construct the base color value
              const [scale, color] = aliasVariable!.name
                .split('/')
                .map((part) => part.trim().toLowerCase())
                .reverse();
              aliasValue = `colorPalette['${sanitizeName(color)}']['${scale}']`;
            }

            // Pull the full token name and splits it into an array and  to be used to
            // generate the token structure.
            // Note: it remove the "Colors" level as it's not needed in the token structure
            const tokenArray = token.name
              .replace('/Colors', '')
              .split('/')
              .map((part) => part.trim().toLowerCase());

            tokenArray.unshift(modeName);

            // Generate the token structure - generally, should follow something like this:
            // {
            //   component: {
            //     type: {
            //       variant: {
            //         property: {
            //           modifier: { <-- modifier may or may not be present
            //             state: tokenValue
            //           }
            //         }
            //       }
            //     }
            //   }
            // }
            // @ts-expect-error - this is a bit of a hack to get the type inference to work
            const componentToken = tokenArray.reduceRight((acc, key) => {
              const sanitizedKey = sanitizeName(key);
              return { [sanitizedKey]: acc };
            }, aliasValue);
            console.log('componentToken', componentToken);

            // Merge the component token into the rest of the tokens
            merge(unifyTokens, componentToken);
          }
        }
      } else {
        // console.log('token', token.name, token.resolvedType);
      }
    }

    return {
      colors: colorPalette,
      tokens: unifyTokens,
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

/**
 * Remove any non-alphanumeric characters and replaces spaces with a dash
 */
function sanitizeName(name: string) {
  if (!name) return name;
  return name
    .replace(/[^a-zA-Z0-9\- ]/g, '') // remove non-alphanumeric characters
    .replace(/  /g, ' ') // replace double spaces with a single space
    .replace(/ /g, '-'); // replace spaces with a dash
}
