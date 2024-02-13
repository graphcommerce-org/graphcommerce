import type { KnipConfig } from 'knip'

type WorkspaceEntry = NonNullable<KnipConfig['workspaces']>[string]

const skip: WorkspaceEntry = {
  ignore: ['**/*.*'],
}

const asNextjsDir: WorkspaceEntry = {
  ignore: ['.next', 'public'],
  entry: [
    'next.config.js',
    'graphcommerce.config.js',
    'lingui.config.js',
    'next-sitemap.config.js',
    'next.config.{ts,cjs,mjs}',
    'middleware.{ts}',
    'app/**/route.{ts}',
    'app/**/{error,layout,loading,not-found,page,template}.{jsx,ts,tsx}',
    'instrumentation.{ts}',
    'app/{manifest,sitemap,robots}.{ts}',
    'app/**/{icon,apple-icon}.{ts,tsx}',
    'app/**/{opengraph,twitter}-image.{ts,tsx}',
    'pages/**/*.{jsx,ts,tsx}',
    'plugins/**/*.{ts,tsx}',
  ],
}

const config: KnipConfig = {
  eslint: false,
  playwright: false,
  next: false,
  include: [
    'files',
    'exports',
    // Enable when files and exports are handled.
    // "nsExports",
    // "types"
    // "nsTypes"
    // "duplicates"
  ],
  workspaces: {
    '.': skip,
    'packagesDev/*': {
      ignore: ['__tests__', '**/*.interceptor.tsx', 'dist'],
      entry: ['index.{js,mjs,cjs,ts,tsx}', 'src/index.{js,mjs,cjs,ts,tsx}'],
    },
    'packagesDev/next-config': {
      ignore: ['__tests__', '**/*.interceptor.tsx', 'src/generated/config.ts'],
    },
    'packages/*': {
      ignore: ['**/__tests__', 'test', '**/*.interceptor.tsx'],
      entry: [
        'plugins/**/*.{ts,tsx}',
        'src/bin/*.ts',
        '**/*.{js,mjs,cjs}',
        'index.ts',
        'src/index.ts',
      ],
    },
    'packages/*/example': skip,
    'packages/magento-pagebuilder': skip,
    'examples/magento-graphcms': asNextjsDir,
    'packages/hygraph-dynamic-rows-ui': asNextjsDir,
  },
}

export default config
