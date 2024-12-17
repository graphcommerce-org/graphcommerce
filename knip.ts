import type { KnipConfig } from 'knip'

type WorkspaceEntry = NonNullable<KnipConfig['workspaces']>[string]

const skip: WorkspaceEntry = {
  ignore: ['**/*.*'],
}

const asPackageDir: WorkspaceEntry = {
  ignore: [
    '__tests__',
    '__mocks__',
    '__fixtures__',
    '**/*.interceptor.tsx',
    '**/*.interceptor.ts',
    'dist',
    'index.ts',
    'index.js',
    'src/index.ts',
  ],
  entry: ['plugins/**/*.{ts,tsx}', 'src/bin/*.ts', '**/resolvers.ts', '**/resolver.ts'],
}

const asNextjsDir: WorkspaceEntry = {
  ignore: ['.next', 'public', 'copy/**', 'copy/**/.well-known/**'],
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
    'lib/sw.ts',
  ],
}

const config: KnipConfig = {
  // eslint: false,
  // playwright: false,
  // next: false,
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
    // '.': skip,
    'packagesDev/*': asPackageDir,
    'packages/*': asPackageDir,
    // 'packagesDev/next-config': {
    //   ignore: ['__tests__', '**/*.interceptor.tsx', 'src/generated/config.ts'],
    // },
    // 'packages/*': {
    //   ignore: ['**/__tests__', 'test', '**/*.interceptor.tsx'],
    //   entry: [
    //     'plugins/**/*.{ts,tsx}',
    //     'src/bin/*.ts',
    //     '**/*.{js,mjs,cjs}',
    //     'index.ts',
    //     'src/index.ts',
    //   ],
    // },

    scripts: skip,
    'packages/*/example': asNextjsDir,
    'packages/magento-pagebuilder': skip,
    'examples/magento-graphcms': asNextjsDir,
    'examples/magento-open-source': asNextjsDir,
    'packages/hygraph-dynamic-rows-ui': asNextjsDir,
  },
}

export default config
