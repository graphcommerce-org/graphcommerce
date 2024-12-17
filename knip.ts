// eslint-disable-next-line import/no-extraneous-dependencies
import { resolveDependenciesSync } from '@graphcommerce/next-config'
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
  entry: [
    'plugins/**/*.{ts,tsx}',
    'src/bin/*.ts',
    '**/resolvers.ts',
    '**/resolver.ts',
    '**/*Resolver.ts',
  ],
}

const dependencies: Record<string, WorkspaceEntry> = Object.fromEntries(
  [...resolveDependenciesSync(`${process.cwd()}/examples/magento-graphcms`).values()]
    .slice(1)
    .map((dir) => [dir, asPackageDir]),
)

const asNextjsDir: WorkspaceEntry = {
  ignore: ['.next', 'public', 'copy/**'],
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

    'classMembers',
    'enumMembers',
    'unlisted',
    'unresolved',
    // Enable when files and exports are handled.
    'nsExports',
    // 'types',
    'nsTypes',
    'duplicates',
  ],
  workspaces: {
    'packagesDev/*': skip,
    'packages/*': skip,
    scripts: skip,

    ...dependencies,
    'packages/*/example': asNextjsDir,
    'packages/magento-pagebuilder': skip,
    'examples/magento-graphcms': asNextjsDir,
    'examples/magento-open-source': asNextjsDir,
    'packages/hygraph-dynamic-rows-ui': asNextjsDir,
  },
}

export default config
