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
      config: {
        builder: 'rolldown',
        preset: process.env.NITRO_PRESET,
      },
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

const config = defineConfig(async () => ({
  build: { chunkSizeWarningLimit: 1000 },
  server: { port: 3000 },
  resolve: {
    conditions: ['source'],
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  plugins: await getPlugins(),
  ssr: {
    // Remotion is client-only — exclude from SSR bundle to avoid parse errors
    noExternal: [],
    external: ['remotion', '@remotion/player', '@remotion/media-utils'],
  },
}))

export default config
