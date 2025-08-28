import { emit, on, showUI } from '@create-figma-plugin/utilities';
import { kebabCase } from 'change-case';
import chroma from 'chroma-js';

const ROOT_COLLECTION_NAME = 'Lvl 01 - Root';
const STYLE_COLLECTION_NAME = 'Lvl 02 - Style';
const MODE_COLLECTION_NAME = 'Lvl 03 (A) - Mode';
const DIMENSIONS_COLLECTION_NAME = 'Lvl 03 (C) - Dimension';
const COMPONENTS_COLLECTION_NAME = 'Lvl 04 - Component';

const DIMENSIONS_VARIABLES = [
  'Spacing/Padding',
  'Spacing/Space Between',
  'Spacing/Layout Grid/Horizontal',
  'Spacing/Layout Grid/Vertical',
  'Sizing/Dividers & Details',
  'Sizing/Asset',
  'Sizing/Size Tokens',
  'Corner Radius',
];

export default function () {
  const getNestedVariable = async (id: string, collectionName: string, mode?: string): Promise<Variable | null> => {
    const variable = await figma.variables.getVariableByIdAsync(id);
    const collection = await figma.variables.getVariableCollectionByIdAsync(variable?.variableCollectionId as string);
    const firstValueMode = Object.keys(variable?.valuesByMode ?? [])?.[0];

    if (collection?.name === collectionName) {
      return variable;
    } else {
      const value = (variable?.valuesByMode[mode || firstValueMode] as VariableAlias)?.id;
      return value ? getNestedVariable(value, collectionName) : null;
    }
  }

  on('LOAD_MODES', async () => {
    const collections = await figma.variables.getLocalVariableCollectionsAsync();
    const modes = collections.reduce((cur, col) => {
      if (col.name !== MODE_COLLECTION_NAME) {
        return cur;
      }

      for (const mode of col.modes) {
        cur = {...cur, [mode.modeId]: mode.name};
      }
      return cur;
    }, {} as Record<string, string>);

    emit('LOADED_MODES', { modes });
  });

  on('GENERATE_ROOT_VARIABLES', async () => {
    const tokens = [];
    const collections = await figma.variables.getLocalVariableCollectionsAsync();
    const colorsCollection = collections.filter(({ name }) => name === ROOT_COLLECTION_NAME)?.[0];
    const dimensionsCollection = collections.filter(({ name }) => name === DIMENSIONS_COLLECTION_NAME)?.[0];
    const mode = colorsCollection?.modes?.[0]?.modeId; // Only one mode is supported for Root level
    const dimensionsMode = dimensionsCollection?.modes?.[0]?.modeId; // Get the first mode as default

    tokens.push('/* Colors */');
    for (const variableId of colorsCollection?.variableIds || []) {
      const variable = await figma.variables.getVariableByIdAsync(variableId);

      // Only colors need to be exported
      if (variable?.resolvedType === 'COLOR') {
        const name = kebabCase(variable?.name);
        const value = variable?.valuesByMode[mode];
        const { r, g, b, a } = value as any;
        const hex = chroma
          .rgb(r * 255, g * 255, b * 255)
          .alpha(a ?? 1)
          .hex();

        tokens.push({
          token: name,
          value: hex,
        });
      }
    }

    tokens.push('');
    tokens.push('/* Dimensions */');
    for (const variableId of dimensionsCollection?.variableIds || []) {
      const variable = await figma.variables.getVariableByIdAsync(variableId);
      const dimensionVariable = DIMENSIONS_VARIABLES.find((v) =>
        variable?.name?.startsWith(v)
      );

      if (dimensionVariable) {
        const name = variable?.name.split('/')?.pop()?.toLowerCase();
        const value = variable?.valuesByMode?.[dimensionsMode];

        if ((value as VariableAlias)?.type === 'VARIABLE_ALIAS') {
          const targetVariable = await getNestedVariable(
            (value as VariableAlias)?.id,
            ROOT_COLLECTION_NAME
          );
          const firstValueMode = Object.keys(
            targetVariable?.valuesByMode ?? {}
          )[0];
          const padding = targetVariable?.valuesByMode?.[
            firstValueMode
          ] as number;
          tokens.push({
            token: `${kebabCase(dimensionVariable)}-${kebabCase(name ?? '')}`,
            value: `${padding}px`,
          });
        }
      }
    }
    emit('GENERATED_ROOT_VARIABLES', { tokens });
  });

  on('GENERATE_MODE_VARIABLES', async ({ mode }) => {
    const tokens = [];
    const collections = await figma.variables.getLocalVariableCollectionsAsync();
    const modesCollection = collections.filter(({ name }) => name === MODE_COLLECTION_NAME)?.[0];

    for (const variableId of modesCollection?.variableIds || []) {
      const variable = await figma.variables.getVariableByIdAsync(variableId);

      // Only colors need to be exported
      if (variable?.resolvedType === 'COLOR') {
        const name = kebabCase(variable?.name);
        const value = variable.valuesByMode[mode]

        if ((value as VariableAlias)?.type === 'VARIABLE_ALIAS') {
          const targetVariable = await getNestedVariable((value as VariableAlias)?.id, ROOT_COLLECTION_NAME);

          tokens.push({
            token: name,
            value: kebabCase(targetVariable?.name ?? ''),
          })
        }
      }
    }

    emit('GENERATED_MODE_VARIABLES', { tokens });
  });

  on('GENERATE_COMPONENT_VARIABLES', async () => {
    const colorTokens = [];
    const dimensionTokens = [];
    const collections = await figma.variables.getLocalVariableCollectionsAsync();
    const modesCollection = collections.filter(({ name }) => name === COMPONENTS_COLLECTION_NAME)?.[0];
    const mode = modesCollection?.modes?.[0]?.modeId;

    for (const variableId of modesCollection?.variableIds || []) {
      const variable = await figma.variables.getVariableByIdAsync(variableId);

      // Only colors need to be exported
      if (variable?.resolvedType === 'COLOR') {
        const name = kebabCase(variable?.name);
        const value = variable.valuesByMode[mode]

        if ((value as VariableAlias)?.type === 'VARIABLE_ALIAS') {
          const targetVariable = await getNestedVariable((value as VariableAlias)?.id, MODE_COLLECTION_NAME);

          colorTokens.push({
            token: name,
            value: `var(--${kebabCase(targetVariable?.name?.toLowerCase() ?? '')})`,
          })
        }
      } else if (
        Array.isArray(variable?.scopes) &&
        ['GAP', 'WIDTH_HEIGHT', 'CORNER_RADIUS'].some((scope) => variable.scopes.includes(scope as VariableScope))
      ) {
        const name = kebabCase(variable?.name);
        const value = variable.valuesByMode[mode];
        
        if ((value as VariableAlias)?.type === 'VARIABLE_ALIAS') {
          let tokenValue = '';
          const dimensionVariable = await getNestedVariable((value as VariableAlias)?.id, DIMENSIONS_COLLECTION_NAME);
          if (!dimensionVariable) {
            const targetVariable = await getNestedVariable(
              (value as VariableAlias)?.id,
              ROOT_COLLECTION_NAME
            );
            const firstValueMode = Object.keys(targetVariable?.valuesByMode ?? {})?.[0];
            tokenValue = `${targetVariable?.valuesByMode?.[firstValueMode]}px`;
          } else {
            const name = dimensionVariable?.name?.toLowerCase() ?? ''
            tokenValue = `var(--${kebabCase(name)})`
          }
  
          dimensionTokens.push({
            token: kebabCase(name ?? ''),
            value: tokenValue,
          })
        }
      }
    }

    const tokens: (string | { token: string; value: string })[] = [];
    if (colorTokens.length > 0) {
      tokens.push("/* Color Tokens */");
      tokens.push(...colorTokens);
    }
    if (dimensionTokens.length > 0) {
      tokens.push('');
      tokens.push("/* Dimension Tokens */");
      tokens.push(...dimensionTokens);
    }

    emit('GENERATED_COMPONENT_VARIABLES', { tokens });
  });

  on('GENERATE_OTHER_VARIABLES', async () => {
    const tokens = [];
    const collections = await figma.variables.getLocalVariableCollectionsAsync();
    const stylesCollection = collections.filter(({ name }) => name === STYLE_COLLECTION_NAME)?.[0];
    const rootCollection = collections.filter(({ name }) => name === ROOT_COLLECTION_NAME)?.[0];
    const rootMode = rootCollection?.modes?.[0]?.modeId; // Only one mode is supported for Root level
    const stylesMode = stylesCollection?.modes?.[0]?.modeId; // Only one mode is supported for Root level

    let fontsStoredCount = 0;

    tokens.push('/* Font Families */');
    for (const variableId of rootCollection?.variableIds || []) {
      const variable = await figma.variables.getVariableByIdAsync(variableId);

      if (variable?.name?.startsWith('Typography/Family')) {
        if (variable?.name?.toLowerCase()?.includes('mono')) {
          tokens.push({
            token: 'font-mono',
            value: `"${variable?.valuesByMode[rootMode]}", monospace`
          })
        } else if (fontsStoredCount === 0) {
          tokens.push({
            token: 'font-sans',
            value: `"${variable?.valuesByMode[rootMode]}", sans-serif`
          });
        } else if (fontsStoredCount === 1) {
          tokens.push({
            token: 'font-serif',
            value: `"${variable?.valuesByMode[rootMode]}", serif`
          });
        }
        fontsStoredCount++;
      }
    }

    tokens.push('');
    tokens.push('/* Font Sizes */');
    for (const variableId of stylesCollection?.variableIds || []) {
      const variable = await figma.variables.getVariableByIdAsync(variableId);

      if (variable?.name?.startsWith('Typography/Font Size')) {
        const name = variable?.name.split('/')?.pop()?.toLowerCase();
        const value = variable.valuesByMode[stylesMode]

        if ((value as VariableAlias)?.type === 'VARIABLE_ALIAS') {
          const targetVariable = await getNestedVariable((value as VariableAlias)?.id, ROOT_COLLECTION_NAME);
          const fontSize = targetVariable?.valuesByMode?.[rootMode] as number;
          tokens.push({
            token: `text-${name}`,
            value: `${fontSize / 16}rem`,
          })
        }
      }
    }

    tokens.push('');
    tokens.push('/* Line Heights */');
    for (const variableId of stylesCollection?.variableIds || []) {
      const variable = await figma.variables.getVariableByIdAsync(variableId);

      if (variable?.name?.startsWith('Typography/Line Height')) {
        const name = variable?.name.split('/')?.pop()?.toLowerCase();
        const value = variable.valuesByMode[stylesMode]

        if ((value as VariableAlias)?.type === 'VARIABLE_ALIAS') {
          const targetVariable = await getNestedVariable((value as VariableAlias)?.id, ROOT_COLLECTION_NAME);
          const fontSize = targetVariable?.valuesByMode?.[rootMode] as number;
          tokens.push({
            token: `text-${name}--line-height`,
            value: `${fontSize / 16}rem`,
          })
        }
      }
    }

    tokens.push('');
    tokens.push('/* Blur */');
    for (const variableId of rootCollection?.variableIds || []) {
      const variable = await figma.variables.getVariableByIdAsync(variableId);

      if (variable?.name?.startsWith('Effects/Blur')) {
        const name = variable?.name.split('/')?.pop()?.toLowerCase();
        const value = variable.valuesByMode[rootMode] as number;

        tokens.push({
          token: `blur-${name}`,
          value: `${value / 16}rem`,
        })
      }
    }

    tokens.push('');
    tokens.push('/* Shadow */');
    for (const variableId of rootCollection?.variableIds || []) {
      const variable = await figma.variables.getVariableByIdAsync(variableId);

      if (variable?.name?.startsWith('Effects/Shadow')) {
        const name = variable?.name.split('/')?.pop()?.toLowerCase();
        const value = variable.valuesByMode[rootMode] as number;

        tokens.push({
          token: `drop-shadow-${name}`,
          value: `${value / 16}rem`,
        })
      }
    }

    emit('GENERATED_OTHER_VARIABLES', { tokens });
  });

  showUI({ height: 500, width: 400 });
}
