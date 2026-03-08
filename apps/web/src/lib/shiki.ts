/**
 * Lightweight Shiki syntax highlighter using fine-grained bundles.
 * Only loads the grammars and themes actually used in presentations.
 */

const bundledLangs = {
  typescript: () => import('@shikijs/langs/typescript'),
  ts: () => import('@shikijs/langs/typescript'),
  tsx: () => import('@shikijs/langs/tsx'),
  javascript: () => import('@shikijs/langs/javascript'),
  js: () => import('@shikijs/langs/javascript'),
  jsx: () => import('@shikijs/langs/jsx'),
  bash: () => import('@shikijs/langs/bash'),
  sh: () => import('@shikijs/langs/bash'),
  shell: () => import('@shikijs/langs/shellscript'),
  shellscript: () => import('@shikijs/langs/shellscript'),
  json: () => import('@shikijs/langs/json'),
  jsonc: () => import('@shikijs/langs/jsonc'),
  yaml: () => import('@shikijs/langs/yaml'),
  yml: () => import('@shikijs/langs/yaml'),
  sql: () => import('@shikijs/langs/sql'),
  toml: () => import('@shikijs/langs/toml'),
  lua: () => import('@shikijs/langs/lua'),
  markdown: () => import('@shikijs/langs/markdown'),
  md: () => import('@shikijs/langs/markdown'),
  mdx: () => import('@shikijs/langs/mdx'),
  css: () => import('@shikijs/langs/css'),
  html: () => import('@shikijs/langs/html'),
  xml: () => import('@shikijs/langs/xml'),
  regex: () => import('@shikijs/langs/regex'),
  diff: () => import('@shikijs/langs/diff'),
  docker: () => import('@shikijs/langs/docker'),
  dockerfile: () => import('@shikijs/langs/dockerfile'),
  ini: () => import('@shikijs/langs/ini'),
  properties: () => import('@shikijs/langs/ini'),
}

const bundledThemes = {
  'github-light': () => import('@shikijs/themes/github-light'),
  'github-dark': () => import('@shikijs/themes/github-dark'),
}

export type BundledLang = keyof typeof bundledLangs
export type BundledTheme = keyof typeof bundledThemes

async function getCreateHighlighter() {
  const { createBundledHighlighter } = await import('shiki/core')
  const { createJavaScriptRegexEngine } = await import('shiki/engine/javascript')
  return createBundledHighlighter({
    langs: bundledLangs as Parameters<typeof createBundledHighlighter>[0]['langs'],
    themes: bundledThemes as Parameters<typeof createBundledHighlighter>[0]['themes'],
    engine: () => createJavaScriptRegexEngine(),
  })
}

/** Lightweight codeToHtml — uses the fine-grained bundle, not full `shiki`. */
export async function codeToHtml(
  code: string,
  options: { lang: string; themes: Record<string, string> }
) {
  const createHighlighter = await getCreateHighlighter()
  const highlighter = await createHighlighter({ langs: [], themes: [] })
  await highlighter.loadLanguage(options.lang as BundledLang)
  for (const theme of Object.values(options.themes)) {
    await highlighter.loadTheme(theme as BundledTheme)
  }
  return highlighter.codeToHtml(code, {
    lang: options.lang,
    themes: options.themes as Record<string, BundledTheme>,
    defaultColor: false,
  })
}
