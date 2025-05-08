import { emit, on, showUI } from '@create-figma-plugin/utilities';
import { kebabCase } from 'change-case';
import chroma from 'chroma-js';

const COLORS_COLLECTION_NAME = 'Lvl 01 - Root'
const MODE_COLLECTION_NAME = 'Lvl 03 (A) - Mode'
const COMPONENTS_COLLECTION_NAME = 'Lvl 04 - Component'

export default function () {
  const getNestedVariable = async (id: string, collectionName: string, mode?: string): Promise<Variable | null> => {
    const variable = await figma.variables.getVariableByIdAsync(id);
    const collection = await figma.variables.getVariableCollectionByIdAsync(variable?.variableCollectionId as string);
    const firstValueMode = Object.keys(variable?.valuesByMode ?? [])?.[0];

    if (collection?.name === collectionName) {
      return variable;
    } else {
      return getNestedVariable((variable?.valuesByMode[mode || firstValueMode] as VariableAlias).id, collectionName);
    }
  }

  on('LOAD_MODES', async () => {
    const collections = await figma.variables.getLocalVariableCollectionsAsync();
    const modes = collections.reduce((cur, col) => {
      if (col.name !== MODE_COLLECTION_NAME) {
        return cur;
      }

      for (const mode of col.modes) {
        cur = {...cur, [mode.modeId]:  mode.name};
      }
      return cur;
    }, {} as Record<string, string>);

    emit('LOADED_MODES', { modes });
  });

  on('GENERATE_COLOR_VARIABLES', async () => {
    const tokens = [];
    const collections = await figma.variables.getLocalVariableCollectionsAsync();
    const colorsCollection = collections.filter(({ name }) => name === COLORS_COLLECTION_NAME)?.[0];
    const mode = colorsCollection?.modes?.[0]?.modeId; // Only one mode is supported for Root level

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
    emit('GENERATED_COLOR_VARIABLES', { tokens });
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
          const targetVariable = await getNestedVariable((value as VariableAlias)?.id, COLORS_COLLECTION_NAME);

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
    const tokens = [];
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

          tokens.push({
            token: name,
            value: kebabCase(targetVariable?.name ?? ''),
          })
        }
      }
    }

    emit('GENERATED_COMPONENT_VARIABLES', { tokens });
  });

  showUI({ height: 500, width: 400 });
}
