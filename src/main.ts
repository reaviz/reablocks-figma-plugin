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

type Token = { token: string; value: string };

function isAlias(value: VariableValue | undefined): value is VariableAlias {
  return (
    !!value &&
    typeof value === 'object' &&
    (value as VariableAlias).type === 'VARIABLE_ALIAS'
  );
}

function isRgba(value: VariableValue | undefined): value is RGBA {
  return (
    !!value &&
    typeof value === 'object' &&
    'r' in value &&
    'g' in value &&
    'b' in value
  );
}

export default function () {
  const collections: Map<string, VariableCollection> = new Map();

  async function loadCollections() {
    const all = await figma.variables.getLocalVariableCollectionsAsync();
    collections.clear();
    for (const c of all) collections.set(c.name, c);
    return collections;
  }

  // Resolve aliases through the user-selected style mode when traversing the Style collection,
  // otherwise fall back to the collection's defaultModeId (the "Auto" target in Figma).
  async function resolveAlias(
    id: string,
    targetCollectionName: string,
    styleMode?: string
  ): Promise<Variable | null> {
    const variable = await figma.variables.getVariableByIdAsync(id);
    if (!variable) return null;
    const collection = await figma.variables.getVariableCollectionByIdAsync(
      variable.variableCollectionId
    );
    if (collection?.name === targetCollectionName) return variable;

    const fallbackMode =
      collection?.defaultModeId ?? Object.keys(variable.valuesByMode)[0];
    const resolveMode =
      collection?.name === STYLE_COLLECTION_NAME && styleMode
        ? styleMode
        : fallbackMode;

    const next = variable.valuesByMode[resolveMode];
    return isAlias(next) ? resolveAlias(next.id, targetCollectionName, styleMode) : null;
  }

  async function collectRootColors(): Promise<Token[]> {
    const tokens: Token[] = [];
    const coll = collections.get(ROOT_COLLECTION_NAME);
    const mode = coll?.defaultModeId;
    if (!coll || !mode) return tokens;
    for (const id of coll.variableIds) {
      const variable = await figma.variables.getVariableByIdAsync(id);
      if (variable?.resolvedType !== 'COLOR') continue;
      const value = variable.valuesByMode[mode];
      if (!isRgba(value)) continue;
      const { r, g, b, a } = value;
      const hex = chroma
        .rgb(r * 255, g * 255, b * 255)
        .alpha(a ?? 1)
        .hex();
      tokens.push({ token: kebabCase(variable.name), value: hex });
    }
    return tokens;
  }

  async function collectRootDimensions(): Promise<Token[]> {
    const tokens: Token[] = [];
    const coll = collections.get(DIMENSIONS_COLLECTION_NAME);
    const mode = coll?.defaultModeId;
    if (!coll || !mode) return tokens;
    for (const id of coll.variableIds) {
      const variable = await figma.variables.getVariableByIdAsync(id);
      const group = DIMENSIONS_VARIABLES.find((v) =>
        variable?.name?.startsWith(v)
      );
      if (!variable || !group) continue;
      const leaf = variable.name.split('/').pop()?.toLowerCase() ?? '';
      const value = variable.valuesByMode[mode];
      if (!isAlias(value)) continue;
      const target = await resolveAlias(value.id, ROOT_COLLECTION_NAME);
      const firstMode = Object.keys(target?.valuesByMode ?? {})[0];
      const px = target?.valuesByMode?.[firstMode];
      if (typeof px !== 'number') continue;
      tokens.push({
        token: `${kebabCase(group)}-${kebabCase(leaf)}`,
        value: `${px}px`,
      });
    }
    return tokens;
  }

  async function collectModeTokens(modeId: string): Promise<Token[]> {
    const tokens: Token[] = [];
    const coll = collections.get(MODE_COLLECTION_NAME);
    if (!coll) return tokens;
    for (const id of coll.variableIds) {
      const variable = await figma.variables.getVariableByIdAsync(id);
      if (variable?.resolvedType !== 'COLOR') continue;
      const value = variable.valuesByMode[modeId];
      if (!isAlias(value)) continue;
      const target = await resolveAlias(value.id, ROOT_COLLECTION_NAME);
      tokens.push({
        token: kebabCase(variable.name),
        value: kebabCase(target?.name ?? ''),
      });
    }
    return tokens;
  }

  async function collectComponentTokens(): Promise<{
    colors: Token[];
    dimensions: Token[];
  }> {
    const colors: Token[] = [];
    const dimensions: Token[] = [];
    const coll = collections.get(COMPONENTS_COLLECTION_NAME);
    const mode = coll?.defaultModeId;
    if (!coll || !mode) return { colors, dimensions };

    const dimensionScopes: VariableScope[] = ['GAP', 'WIDTH_HEIGHT', 'CORNER_RADIUS'];

    for (const id of coll.variableIds) {
      const variable = await figma.variables.getVariableByIdAsync(id);
      if (!variable) continue;
      const value = variable.valuesByMode[mode];
      if (!isAlias(value)) continue;

      if (variable.resolvedType === 'COLOR') {
        const target = await resolveAlias(value.id, MODE_COLLECTION_NAME);
        colors.push({
          token: kebabCase(variable.name),
          value: `var(--${kebabCase(target?.name?.toLowerCase() ?? '')})`,
        });
      } else if (
        Array.isArray(variable.scopes) &&
        dimensionScopes.some((s) => variable.scopes.includes(s))
      ) {
        let tokenValue = '';
        const dimensionVariable = await resolveAlias(
          value.id,
          DIMENSIONS_COLLECTION_NAME
        );
        if (!dimensionVariable) {
          const target = await resolveAlias(value.id, ROOT_COLLECTION_NAME);
          const firstMode = Object.keys(target?.valuesByMode ?? {})[0];
          const px = target?.valuesByMode?.[firstMode];
          if (typeof px !== 'number') continue;
          tokenValue = `${px}px`;
        } else {
          tokenValue = `var(--${kebabCase(dimensionVariable.name.toLowerCase())})`;
        }
        dimensions.push({ token: kebabCase(variable.name), value: tokenValue });
      }
    }
    return { colors, dimensions };
  }

  async function collectTypography(stylesMode?: string): Promise<{
    fontFamilies: Token[];
    fontSizes: Token[];
    lineHeights: Token[];
    blurs: Token[];
    shadows: Token[];
  }> {
    const fontFamilies: Token[] = [];
    const fontSizes: Token[] = [];
    const lineHeights: Token[] = [];
    const blurs: Token[] = [];
    const shadows: Token[] = [];

    const rootColl = collections.get(ROOT_COLLECTION_NAME);
    const stylesColl = collections.get(STYLE_COLLECTION_NAME);
    const rootMode = rootColl?.defaultModeId;
    const resolvedStylesMode = stylesMode ?? stylesColl?.defaultModeId;

    if (rootColl && rootMode) {
      let fontsStoredCount = 0;
      for (const id of rootColl.variableIds) {
        const variable = await figma.variables.getVariableByIdAsync(id);
        if (!variable) continue;
        const value = variable.valuesByMode[rootMode];

        if (variable.name.startsWith('Typography/Family')) {
          if (typeof value !== 'string') continue;
          if (variable.name.toLowerCase().includes('mono')) {
            fontFamilies.push({ token: 'font-mono', value: `"${value}", monospace` });
          } else if (fontsStoredCount === 0) {
            fontFamilies.push({ token: 'font-sans', value: `"${value}", sans-serif` });
          } else if (fontsStoredCount === 1) {
            fontFamilies.push({ token: 'font-serif', value: `"${value}", serif` });
          }
          fontsStoredCount++;
        } else if (variable.name.startsWith('Effects/Blur')) {
          const leaf = variable.name.split('/').pop()?.toLowerCase() ?? '';
          if (typeof value !== 'number') continue;
          blurs.push({ token: `blur-${leaf}`, value: `${value / 16}rem` });
        } else if (variable.name.startsWith('Effects/Shadow')) {
          const leaf = variable.name.split('/').pop()?.toLowerCase() ?? '';
          if (typeof value !== 'number') continue;
          shadows.push({ token: `drop-shadow-${leaf}`, value: `${value / 16}rem` });
        }
      }
    }

    if (stylesColl && resolvedStylesMode && rootMode) {
      for (const id of stylesColl.variableIds) {
        const variable = await figma.variables.getVariableByIdAsync(id);
        if (!variable) continue;
        const value = variable.valuesByMode[resolvedStylesMode];
        if (!isAlias(value)) continue;

        if (variable.name.startsWith('Typography/Font Size')) {
          const leaf = variable.name.split('/').pop()?.toLowerCase() ?? '';
          const target = await resolveAlias(value.id, ROOT_COLLECTION_NAME, resolvedStylesMode);
          const px = target?.valuesByMode?.[rootMode];
          if (typeof px !== 'number') continue;
          fontSizes.push({ token: `text-${leaf}`, value: `${px / 16}rem` });
        } else if (variable.name.startsWith('Typography/Line Height')) {
          const leaf = variable.name.split('/').pop()?.toLowerCase() ?? '';
          const target = await resolveAlias(value.id, ROOT_COLLECTION_NAME, resolvedStylesMode);
          const px = target?.valuesByMode?.[rootMode];
          if (typeof px !== 'number') continue;
          lineHeights.push({ token: `text-${leaf}--line-height`, value: `${px / 16}rem` });
        }
      }
    }

    return { fontFamilies, fontSizes, lineHeights, blurs, shadows };
  }

  on('LOAD_MODES', async () => {
    await loadCollections();
    const modeColl = collections.get(MODE_COLLECTION_NAME);
    const styleColl = collections.get(STYLE_COLLECTION_NAME);

    const modes: Record<string, string> = {};
    for (const m of modeColl?.modes ?? []) modes[m.modeId] = m.name;

    const styleModes: Record<string, string> = {};
    for (const m of styleColl?.modes ?? []) styleModes[m.modeId] = m.name;

    emit('LOADED_MODES', {
      modes,
      defaultModeId: modeColl?.defaultModeId,
      styleModes,
      defaultStyleModeId: styleColl?.defaultModeId,
    });
  });

  on('GENERATE_ROOT_VARIABLES', async () => {
    await loadCollections();
    const colors = await collectRootColors();
    const dimensions = await collectRootDimensions();
    const tokens: (string | Token)[] = ['/* Colors */', ...colors, '', '/* Dimensions */', ...dimensions];
    emit('GENERATED_ROOT_VARIABLES', { tokens });
  });

  on('GENERATE_MODE_VARIABLES', async ({ mode }: { mode: string }) => {
    await loadCollections();
    const tokens = await collectModeTokens(mode);
    emit('GENERATED_MODE_VARIABLES', { tokens });
  });

  on('GENERATE_COMPONENT_VARIABLES', async () => {
    await loadCollections();
    const { colors, dimensions } = await collectComponentTokens();
    const tokens: (string | Token)[] = [];
    if (colors.length) tokens.push('/* Color Tokens */', ...colors);
    if (dimensions.length) tokens.push('', '/* Dimension Tokens */', ...dimensions);
    emit('GENERATED_COMPONENT_VARIABLES', { tokens });
  });

  on('GENERATE_OTHER_VARIABLES', async ({ styleMode }: { styleMode?: string } = {}) => {
    await loadCollections();
    const { fontFamilies, fontSizes, lineHeights, blurs, shadows } =
      await collectTypography(styleMode);
    const tokens: (string | Token)[] = [
      '/* Font Families */',
      ...fontFamilies,
      '',
      '/* Font Sizes */',
      ...fontSizes,
      '',
      '/* Line Heights */',
      ...lineHeights,
      '',
      '/* Blur */',
      ...blurs,
      '',
      '/* Shadow */',
      ...shadows,
    ];
    emit('GENERATED_OTHER_VARIABLES', { tokens });
  });

  on('EXPORT_ALL', async ({ styleMode }: { styleMode?: string } = {}) => {
    await loadCollections();
    const modesColl = collections.get(MODE_COLLECTION_NAME);

    const rootColors = await collectRootColors();
    const rootDimensions = await collectRootDimensions();

    const modes: Record<string, Token[]> = {};
    for (const m of modesColl?.modes ?? []) {
      modes[m.name] = await collectModeTokens(m.modeId);
    }

    const { colors: componentColors, dimensions: componentDimensions } =
      await collectComponentTokens();
    const { fontFamilies, fontSizes, lineHeights, blurs, shadows } =
      await collectTypography(styleMode);

    emit('EXPORTED_ALL', {
      fileName: figma.root.name,
      rootColors,
      rootDimensions,
      modes,
      componentColors,
      componentDimensions,
      fontFamilies,
      fontSizes,
      lineHeights,
      blurs,
      shadows,
    });
  });

  showUI({ height: 540, width: 400 });
}
