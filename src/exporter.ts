type Token = { token: string; value: string };

export type ExportPayload = {
  fileName?: string;
  rootColors: Token[];
  rootDimensions: Token[];
  modes: Record<string, Token[]>;
  componentColors: Token[];
  componentDimensions: Token[];
  fontFamilies: Token[];
  fontSizes: Token[];
  lineHeights: Token[];
  blurs: Token[];
  shadows: Token[];
};

export function buildArchiveName(fileName?: string): string {
  const fallback = 'styles';
  if (!fileName) return `${fallback}.zip`;
  const slug = fileName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug ? `${slug}-styles.zip` : `${fallback}.zip`;
}

const stripColorsSegment = (name: string) =>
  name.replace(/^--color-colors-/, '--color-');

const stripColorPrefix = (name: string) => name.replace(/^--color-/, '--');

export const INDEX_CSS = `@import "./common.css";
@import "./light.css";
@import "./dark.css";
@import "./root.css";
@import "./tw.css";
`;

export const buildCommonCss = (defaultMode: DefaultMode) => `body {
  color-scheme: ${defaultMode};

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;

  @apply font-sans text-base;
  line-height: 1.3;
}

blockquote,
dd,
dl,
figure,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
pre {
  margin: 0;
}

code {
  @apply font-mono text-base;
}

body,
#root {
  margin: 0;
  display: flex;
  min-height: 100vh;
  width: 100vw;

  @apply bg-background-neutral-canvas-base text-content-text-on-color-light-dark;

  --tooltip-background: var(--color-tooltip-colors-brand-background-default);
  --color-on-tooltip: var(--color-white);
  --tooltip-border-radius: 5px;
  --tooltip-spacing: 5px;
}
`;

// root.css: declares concrete root color hexes + root/component dimension pixel values.
export function buildRootCss(data: ExportPayload): string {
  const lines: string[] = [':root,', ':host {', '  /* Colors */'];
  lines.push('  --color-white: #ffffff;');
  lines.push('  --color-black: #000000;');
  for (const { token, value } of data.rootColors) {
    const name = stripColorsSegment(`--${token}`);
    lines.push(`  ${name}: ${value};`);
  }

  lines.push('');
  lines.push('  /* Dimensions */');
  for (const { token, value } of data.rootDimensions) {
    lines.push(`  --${token}: ${value};`);
  }
  for (const { token, value } of data.componentDimensions) {
    lines.push(`  --${token}: ${value};`);
  }

  lines.push('}');
  return lines.join('\n') + '\n';
}

function modeBody(tokens: Token[], indent: string): string[] {
  return tokens.map(({ token, value }) => {
    const name = stripColorPrefix(`--${token}`);
    const ref = stripColorsSegment(`--${value}`);
    return `${indent}${name}: var(${ref});`;
  });
}

// Mode CSS emitted at :root for the default theme (no selector nesting needed).
export function buildDefaultModeCss(slug: string, tokens: Token[]): string {
  const lines: string[] = [':root,', ':host {', `  --reablocks-theme: ${slug};`, ''];
  lines.push(...modeBody(tokens, '  '));
  lines.push('}');
  return lines.join('\n') + '\n';
}

// Mode CSS wrapped in `.theme-X` / `[data-theme=X]` selectors for non-default themes.
export function buildWrappedModeCss(slug: string, tokens: Token[]): string {
  const aliases =
    slug === 'light' || slug === 'dark'
      ? [
          `  .theme-${slug},`,
          `  &.theme-${slug},`,
          `  .${slug},`,
          `  &.${slug},`,
          `  [data-theme='${slug}'],`,
          `  &[data-theme='${slug}'] {`,
        ]
      : [
          `  .theme-${slug},`,
          `  &.theme-${slug},`,
          `  [data-theme='${slug}'],`,
          `  &[data-theme='${slug}'] {`,
        ];
  const lines: string[] = [
    ':root,',
    ':host {',
    ...aliases,
    `    --reablocks-theme: ${slug};`,
    '',
  ];
  lines.push(...modeBody(tokens, '    '));
  lines.push('  }');
  lines.push('}');
  return lines.join('\n') + '\n';
}

const RESET_COLORS = [
  'red',
  'pink',
  'purple',
  'orange',
  'green',
  'blue',
  'gray',
  'slate',
  'teal',
  'yellow',
];

// tw.css: Tailwind v4 theme config — re-exports tokens through @theme inline aliasing.
export function buildTwCss(data: ExportPayload): string {
  const lines: string[] = [];
  lines.push(`@import 'tailwindcss';`);
  lines.push(`@source "../../../node_modules/reablocks";`);
  lines.push(`@source inline("line-clamp-{1..10}");`);
  lines.push('');
  lines.push(
    `@custom-variant dark (&:where(.theme-dark, .theme-dark *, [data-theme=dark], [data-theme=dark] *));`
  );
  lines.push(
    `@custom-variant light (&:where(.theme-light, .theme-light *, [data-theme=light], [data-theme=light] *));`
  );
  lines.push(
    `@custom-variant disabled-within (&:has(input:is(:disabled), textarea:is(:disabled), button:is(:disabled)));`
  );
  lines.push('');
  lines.push('@theme inline {');

  if (data.fontFamilies.length) {
    lines.push('  /* Fonts */');
    for (const { token, value } of data.fontFamilies) {
      lines.push(`  --${token}: ${value};`);
    }
    lines.push('');
  }

  lines.push('  /* Breakpoints */');
  lines.push('  --breakpoint-3xl: 120rem;');
  lines.push('');

  if (data.fontSizes.length) {
    lines.push('  /* Font Sizes */');
    for (const { token, value } of data.fontSizes) {
      lines.push(`  --${token}: ${value};`);
    }
    lines.push('');
  }

  if (data.lineHeights.length) {
    lines.push('  /* Line Heights */');
    for (const { token, value } of data.lineHeights) {
      lines.push(`  --${token}: ${value};`);
    }
    lines.push('');
  }

  const corners = data.rootDimensions.filter((d) =>
    d.token.startsWith('corner-radius-')
  );
  if (corners.length) {
    lines.push('  /* Corner Radius */');
    for (const { token } of corners) {
      const radiusName = token.replace('corner-radius-', 'radius-');
      lines.push(`  --${radiusName}: var(--${token});`);
    }
    lines.push('');
  }

  if (data.blurs.length) {
    lines.push('  /* Blur */');
    for (const { token, value } of data.blurs) {
      lines.push(`  --${token}: ${value};`);
    }
    lines.push('');
  }

  if (data.shadows.length) {
    lines.push('  /* Shadow */');
    for (const { token, value } of data.shadows) {
      lines.push(`  --${token}: ${value};`);
    }
    lines.push(
      '  --shadow-brand-sm: 0 4px 4px 0 rgba(95, 97, 255, 0.3);',
      '  --shadow-navigation-selected: 0 14px 20px 0 rgba(95, 97, 255, 0.3);',
      '  --shadow-tooltip: 0 8px 12px 0 var(--effects-shadows-base-base);',
      '  --shadow-grid-item: 0 2px 4px 0 rgba(26, 26, 26, 0.12);',
      '  --shadow-menu: var(--drop-shadow-8) var(--drop-shadow-8) var(--blur-14) var(--drop-shadow-0) var(--gradient-brand-400);',
      '  --shadow-backdrop: 0 8px 12px 0 var(--color-effects-shadows-base-base);'
    );
    lines.push('');
  }

  lines.push('  /* Reset defaults */');
  for (const c of RESET_COLORS) {
    lines.push(`  --color-${c}-*: initial;`);
  }
  lines.push('');

  // Level 1: root colors → re-export with same name (used as @theme inline alias)
  lines.push('  /* Color tokens Level 1 */');
  for (const { token } of data.rootColors) {
    const name = stripColorsSegment(`--${token}`);
    lines.push(`  ${name}: var(${name});`);
  }
  lines.push('');

  // Level 3: mode tokens → re-export `--color-X: var(--X)`
  const firstMode = Object.values(data.modes)[0] ?? [];
  if (firstMode.length) {
    lines.push('  /* Color tokens Level 3 */');
    for (const { token } of firstMode) {
      const full = `--${token}`;
      const stripped = stripColorPrefix(full);
      lines.push(`  ${full}: var(${stripped});`);
    }
    lines.push('');
  }

  // Level 4: component color tokens → add `color-` prefix, strip color- from refs
  if (data.componentColors.length) {
    lines.push('  /* Component tokens Level 4 */');
    for (const { token, value } of data.componentColors) {
      const stripped = value.replace(/var\(--color-/g, 'var(--');
      lines.push(`  --color-${token}: ${stripped};`);
    }
  }

  lines.push('}');
  return lines.join('\n') + '\n';
}

export type DefaultMode = 'light' | 'dark';

export function buildAllFiles(
  data: ExportPayload,
  defaultMode: DefaultMode = 'dark'
): Record<string, string> {
  const files: Record<string, string> = {
    'index.css': INDEX_CSS,
    'common.css': buildCommonCss(defaultMode),
    'root.css': buildRootCss(data),
    'tw.css': buildTwCss(data),
  };

  const entries = Object.entries(data.modes);
  let lightEntry = entries.find(([n]) => /\blight\b/i.test(n));
  let darkEntry = entries.find(([n]) => /\bdark\b/i.test(n));

  // Fall back to substring match if word-boundary didn't catch a mode name.
  if (!lightEntry) lightEntry = entries.find(([n]) => n.toLowerCase().includes('light'));
  if (!darkEntry) darkEntry = entries.find(([n]) => n.toLowerCase().includes('dark'));

  if (lightEntry) {
    const builder = defaultMode === 'light' ? buildDefaultModeCss : buildWrappedModeCss;
    files['light.css'] = builder('light', lightEntry[1]);
  }
  if (darkEntry) {
    const builder = defaultMode === 'dark' ? buildDefaultModeCss : buildWrappedModeCss;
    files['dark.css'] = builder('dark', darkEntry[1]);
  }

  for (const [modeName, tokens] of entries) {
    if (modeName === lightEntry?.[0] || modeName === darkEntry?.[0]) continue;
    const slug = modeName.toLowerCase().replace(/\s+/g, '-');
    files[`${slug}.css`] = buildWrappedModeCss(slug, tokens);
  }

  if (!lightEntry) files['light.css'] = '/* No "Light" mode found in Figma variables. */\n';
  if (!darkEntry) files['dark.css'] = '/* No "Dark" mode found in Figma variables. */\n';

  return files;
}
