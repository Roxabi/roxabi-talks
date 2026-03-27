import { fileURLToPath } from 'node:url'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig, type PluginOption } from 'vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'

async function getPlugins() {
  return [
    paraglideVitePlugin({
      project: './project.inlang',
      outdir: './src/paraglide',
      strategy: ['cookie', 'preferredLanguage', 'baseLocale'],
    }),
    nitro({
      preset: process.env.NITRO_PRESET,
      vercel: { entryFormat: 'node' },
    }),
    viteTsConfigPaths({
      projects: [
        './tsconfig.json',
        '../../packages/ui/tsconfig.json',
      ],
    }),
    tailwindcss(),
    tanstackStart({ router: { routeFileIgnorePattern: '\\.test\\.' } }),
    viteReact(),
  ] as PluginOption[]
}

const config = defineConfig(async ({ command }) => ({
  build: { chunkSizeWarningLimit: 1000 },
  server: { port: 3000 },
  // In dev, resolve @repo/ui from TypeScript source so no pre-build is needed.
  // In build, the dist is already built by `bun run --cwd packages/ui build`.
  // WARNING: conditions: ['source'] must NOT be used in build — Rolldown (Nitro builder)
  // does not respect ssr.external when resolving source files, causing Remotion to be
  // bundled into the SSR function and crashing it at runtime (Vercel 508).
  resolve: command === 'serve'
    ? { conditions: ['source'] }
    : {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
          // Force tslib to ESM — Rolldown's __commonJSMin thunk interop is broken
          // and never calls the thunk before passing it to __toESM, so CJS tslib
          // destructures as undefined. The ESM entry avoids the CJS path entirely.
          tslib: 'tslib/tslib.es6.mjs',
        },
      },
  plugins: await getPlugins(),
  ssr: {
    // Remotion is client-only. Vite 8 changed SSR externalization defaults vs 7.x —
    // without this, Remotion's ESM bundle gets included in the SSR service output and
    // Nitro's internal Rolldown fails to parse it at build time.
    external: ['remotion', '@remotion/player', '@remotion/media-utils'],
  },
}))

export default config
