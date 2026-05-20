# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Repository Overview

GraphCommerce is a React/Next.js framework for building headless ecommerce
storefronts, backed by Magento 2 and Hygraph. It's a **Yarn 4 workspaces
monorepo** with ~68 packages.

### graphcommerce vs graphcommerce-private

This repo (`graphcommerce/`) is the **open-source core framework**. It is a
submodule inside the **`graphcommerce-private`** parent repo
(`../graphcommerce-private/`), which adds proprietary packages in
`packagesPrivate/` (Adobe Commerce features, B2B, gift cards, store credit,
returns, cache-notify, private pricing, etc.).

**Where to put new code:**

- **This repo (`graphcommerce/`)** — Generic, open-source framework features
  that benefit all users. Core Magento integrations, UI components, build
  tooling.
- **Parent repo (`graphcommerce-private/packagesPrivate/`)** — Specialized,
  proprietary features: B2B (company accounts, purchase orders, requisition
  lists, negotiable quotes), Adobe Commerce-specific features (gift cards, store
  credit, returns, reward points), private pricing, cache invalidation, etc.

When building a new feature, ask: "Is this generic enough for the open-source
framework, or is it specific to Adobe Commerce / B2B / a paid add-on?" If the
latter, it belongs in `graphcommerce-private/packagesPrivate/`. Private packages
are activated via `PRIVATE_ADDITIONAL_DEPENDENCIES` in `.env`.

## Common Commands

### Development

```bash
# Start the main example storefront (runs codegen watcher + Next.js dev with Turbopack)
yarn workspace @graphcommerce/magento-graphcms dev

# Watch + rebuild the TS-compiled framework packages in parallel
# (`pkgroll -w` / `tsc -W` — never exits, leave running during development)
yarn packages

# One-shot build of the same set — use this before committing or
# generating patches
yarn packages:build

# Full production build of example
yarn workspace @graphcommerce/magento-graphcms build
```

**After editing TS source in any of the seven framework packages that ship as
compiled `dist/`, run `yarn packages:build` before committing.** The seven
packages are:

| Package                                                 | Path                              |
| ------------------------------------------------------- | --------------------------------- |
| `@graphcommerce/next-config`                            | `packagesDev/next-config`         |
| `@graphcommerce/cli`                                    | `packages/cli`                    |
| `@graphcommerce/hygraph-cli`                            | `packages/hygraph-cli`            |
| `@graphcommerce/changeset-changelog`                    | `packagesDev/changeset-changelog` |
| `@graphcommerce/graphql-codegen-near-operation-file`    | `packagesDev/`                    |
| `@graphcommerce/graphql-codegen-relay-optimizer-plugin` | `packagesDev/`                    |
| `@graphcommerce/graphql-codegen-markdown-docs`          | `packagesDev/`                    |

These ship as compiled `dist/**/*.js`, not source — without rebuilding, the
change is invisible to consumers (including local
`node_modules/@graphcommerce/*` when generating `patch-package` patches). Commit
the regenerated `dist/` alongside the source change so the patch stays in sync.
`yarn packages` (watch mode) is fine during active development — the watchers
hot-rebuild on save — but `yarn packages:build` is the one-shot pre-commit step.

The remaining `packagesDev/*` directories (`prettier-config`, `eslint-config`,
`typescript-config`, `browserslist-config`, `misc`) are config-only — no compile
step, no rebuild needed.

`yarn packages:build` also regenerates
`packagesDev/next-config/dist/generated/config.js` because zod-schema codegen
runs alongside `next-config`'s build. That diff is normally unrelated to your
change and should be discarded with
`git checkout -- packagesDev/next-config/dist/generated/config.js` before
committing — only keep it when your change actually touches the config schema.

### Testing

```bash
yarn test                    # Run all tests (vitest)
yarn test:watch              # Watch mode
yarn test packages/foo       # Run tests matching a path
```

Tests use Vitest with
`include: ['**/__tests__/**/*.ts', '**/*.test.ts', '**/*.test.tsx']`. E2E tests
use Playwright: `yarn playwright`.

### Linting & Type Checking

**Important:** For type checking, use `tsgo` (the native TypeScript compiler)
and run it from the **example directory** (not the repo root):

```bash
# Type check (preferred — fast native TypeScript compiler)
cd examples/magento-graphcms
npx --package=@typescript/native-preview tsgo --noEmit -p .
```

Type checking must be run from an example directory because codegen only
generates types for the specific project (`.mesh/`, `.gql.ts` files). Running
from the repo root will fail with missing type errors.

```bash
yarn eslint:lint      # ESLint across all TS/TSX
yarn eslint:fix       # ESLint with auto-fix
yarn prettier:fix     # Prettier formatting
```

### Code Generation

```bash
# In an example directory — regenerate GraphQL Mesh + codegen types
yarn workspace @graphcommerce/magento-graphcms codegen

# Individual steps:
graphcommerce codegen   # Generate config types
gc-mesh build           # Build GraphQL Mesh (merges Magento + Hygraph schemas)
gc-gql-codegen          # Generate TypeScript from .graphql files → .gql.ts
```

### i18n

```bash
yarn workspace @graphcommerce/magento-graphcms lingui   # Extract translation strings
```

## Architecture

### Directory Layout

- **`packages/`** — Core feature packages (`@graphcommerce/*`): UI components,
  Magento integrations (cart, checkout, product, search, payment), Hygraph/CMS,
  analytics, Algolia search
- **`packagesDev/`** — Build tooling: `next-config` (the framework's core build
  system), codegen plugins, ESLint/Prettier/TypeScript configs, CLI
- **`examples/`** — Full storefronts: `magento-graphcms` (primary),
  `magento-open-source`
- **`docs/`** — Documentation site

### GraphQL Mesh (Schema Federation)

Multiple GraphQL/REST sources are combined into a single schema via GraphQL
Mesh. The merged schema is generated into `examples/*/.mesh/index.ts`. Sources
include Magento GraphQL and Hygraph, with transforms for field renaming,
filtering, and type merging.

### GraphQL Codegen

`.graphql` files throughout packages generate co-located `.gql.ts` files
containing TypeScript types and Apollo Client hooks. The **fragment injection
system** uses an `@inject` directive to extend existing queries:

```graphql
fragment MyCustomData on ProductInterface @inject(into: ["ProductListItem"]) {
  my_custom_attribute
}
```

### Plugin System (Zero-Runtime Interception)

Plugins live in `plugins/` directories and are auto-discovered at build time.
They work via webpack/Turbopack interceptors — no runtime cost. Three types:

- **`component`** — Wraps a React component. Receives `Prev` as a prop to render
  the original.
- **`function`** — Intercepts a function call. Receives `prev` to call the
  original.
- **`replace`** — Completely replaces an export.

Each plugin exports a `config: PluginConfig` with `type` and `module` (the
`@graphcommerce/*` package to intercept). Conditional plugins use `ifConfig`.
Restart dev server after adding the first plugin; hot-reload works after that.

### Configuration

`graphcommerce.config.ts` in each example defines storefront config (Magento
endpoint, Hygraph endpoint, locales, feature flags). Required fields:
`canonicalBaseUrl`, `magentoEndpoint`, `magentoVersion` (245/246/247),
`hygraphEndpoint`, `storefront[]` (locale + magentoStoreCode).

Access config values in code:

```tsx
import { cartDisplayPricesInclTax } from '@graphcommerce/next-config/config'
import { useStorefrontConfig } from '@graphcommerce/next-ui'

// Global value
const global = cartDisplayPricesInclTax

// Per-storefront with fallback
const scoped =
  useStorefrontConfig().cartDisplayPricesInclTax ?? cartDisplayPricesInclTax
```

Extend the config schema by creating a `graphql/Config.graphqls` file:

```graphql
extend input GraphCommerceConfig {
  myConfig: String
}
extend input GraphCommerceStorefrontConfig {
  myField: Boolean
}
```

You can also extend existing enums from other packages:

```graphql
extend enum WebsitePermissions {
  CUSTOMER_ONLY
}
```

### Environment Variables (.env)

Each example directory has a `.env` file. Two types of env vars are used:

**`GC_*` — GraphCommerce config overrides.** Any config value can be overridden:

- Convert camelCase to SCREAMING*SNAKE_CASE, prefix with `GC*`
- Arrays indexed with `_0`, `_1`: `GC_STOREFRONT_0_LOCALE="en"`
- Nested objects with `_`: `GC_DEBUG_PLUGIN_STATUS="1"`
- Booleans: `"1"` / `"true"` / `"0"` / `"false"`
- Objects as JSON: `GC_PERMISSIONS='{"cart":"CUSTOMER_ONLY"}'`

Examples:

```bash
GC_MAGENTO_ENDPOINT="https://magento.example.com/graphql"
GC_MAGENTO_VERSION="247"
GC_LIMIT_SSG="1"
GC_PREVIEW_SECRET="mySecret"
GC_GOOGLE_RECAPTCHA_KEY="6Ld..."
GC_GRAPHQL_MESH_EDIT_MODE="1"
```

Export current config to env vars: `yarn graphcommerce export-config`

**`PRIVATE_ADDITIONAL_DEPENDENCIES` — Activate optional packages.**
Comma-separated list of `@graphcommerce/*` packages to include in dependency
resolution without adding them to `package.json`. This enables their plugins,
GraphQL fragments, and mesh config extensions:

```bash
PRIVATE_ADDITIONAL_DEPENDENCIES="@graphcommerce/magento-search-overlay,@graphcommerce/b2b-permissions"
```

This is also used in the root `package.json` test scripts to include optional
packages during testing. The resolution system only picks up packages with
`graphcommerce` in the name (configurable via `PRIVATE_PACKAGE_NAMESPACES`).

## Plugin System (Development Guide)

**When building new features, prefer plugins over direct code modifications.**
Plugins keep functionality modular and independent from the core codebase.

### Creating a Plugin

Place files in `plugins/` directory (in your example project or in a package).
Each plugin file exports a `config` object and the named export to intercept.

**Component plugin** — wrap a React component:

```tsx
import type { ProductListItemProps } from '@graphcommerce/magento-product'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-product',
}

export function ProductListItem(props: PluginProps<ProductListItemProps>) {
  const { Prev, ...rest } = props
  return <Prev {...rest} subTitle='Custom subtitle' />
}
```

**Function plugin** — intercept a function:

```tsx
import type { graphqlConfig as graphqlConfigType } from '@graphcommerce/graphql'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/graphql',
}

export const graphqlConfig: FunctionPlugin<typeof graphqlConfigType> = (
  prev,
  conf,
) => {
  const results = prev(conf)
  return { ...results, links: [...results.links, myCustomLink] }
}
```

**Replacement plugin** — completely replace an export (no access to original):

```tsx
export const config: PluginConfig = {
  type: 'replace',
  module: '@graphcommerce/magento-product',
}

export function ProductListCount(props: ProductCountProps) {
  return <div>{props.total_count}</div>
}
```

### Plugin Rules

- The exported function/component name must match the target export exactly
- Restart dev server after creating the first plugin; hot-reload works after
  that
- Plugin loading order follows `package.json` dependency order; local plugins
  wrap last (closest to the original)
- Auto-discovered via glob: `${packageLocation}/plugins/**/*.{ts,tsx}`
- Only packages with `graphcommerce` in the name are scanned

### Conditional Plugins

Load a plugin only when a config value is truthy or matches a specific value:

```tsx
export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-product',
  ifConfig: 'demoMode', // loads when demoMode is truthy
}

// Or match a specific value:
export const config: PluginConfig<'compareVariant'> = {
  type: 'component',
  module: '@graphcommerce/magento-product',
  ifConfig: ['compareVariant', 'CHECKBOX'],
}
```

### Extending GraphQL Queries via Fragment Injection

Instead of modifying queries directly, inject fields into existing fragments:

```graphql
fragment MyCustomFragment on ProductInterface
@inject(into: ["ProductListItem"]) {
  my_custom_attribute
}
```

After running `yarn codegen`, `my_custom_attribute` will be available in
`ProductListItem.gql.ts` and all queries that use that fragment.

### Debugging Plugins

Enable with `debug.pluginStatus: true` in config or `GC_DEBUG_PLUGIN_STATUS=1`
in env. This logs which plugins are enabled/disabled during build.

## Authentication & Cookies

Customer auth tokens are stored in Apollo Client cache. Auth state is tracked
via the CSS flags system: the `private-query` flag in the `gc-flags` cookie
indicates a logged-in user. This is set automatically by `setCssFlag` on sign-in
and cleared by `removeCssFlag` on sign-out. The cookie is readable both
client-side and server-side (in Next.js proxy).

**Cookie utility** (`@graphcommerce/next-ui`):

```tsx
import { cookie } from '@graphcommerce/next-ui'
cookie('name', 'value') // set
cookie('name') // read
cookie('name', null) // delete
```

### CSS Flags

CSS flags set `data-*` attributes on `<html>` for instant visual toggling before
JS hydrates. Stored in a `gc-flags` cookie (JSON), restored via a blocking
script in `_document.tsx` (`getCssFlagsInitScript()`) that reads
`document.cookie`. The cookie is also readable server-side in Next.js proxy.

```tsx
import {
  setCssFlag,
  removeCssFlag,
  cssFlag,
  cssNotFlag,
} from '@graphcommerce/next-ui'

setCssFlag('private-query', true)
// In MUI sx: { [cssFlag('private-query')]: { display: 'none' } }
// In MUI sx: { [cssNotFlag('private-query')]: { display: 'none' } }
```

The `private-query` flag is set on sign-in, cleared on sign-out. Used by
`GuestOrCustomerMask` and `PrivateQueryMask` to show/hide customer-specific
content without waiting for React hydration.

### Permissions System

Permissions are configured via `GraphCommercePermissions` input type in
`Config.graphqls`. Set globally and overridable per storefront:

```tsx
import { permissions } from '@graphcommerce/next-config/config'
import { useStorefrontConfig } from '@graphcommerce/next-ui'
const perm =
  useStorefrontConfig().permissions?.website ??
  permissions?.website ??
  'ENABLED'
```

Existing enums: `WebsitePermissions`, `CustomerAccountPermissions`,
`CartPermissions`, `BillingAddressPermissions`. Extendable via `extend enum` in
package `Config.graphqls` files.

### GuestOrCustomerMask

Component for showing different content based on auth state, with CSS-flag-based
masking to avoid flash of wrong content:

```tsx
<GuestOrCustomerMask
  loggedOut={<SignInMessage />}
  skeleton={<Skeleton />}
  loggedIn={<RealContent />}
/>
```

## Tech Stack

- Next.js with Turbopack, React 19, TypeScript 5.9
- Apollo Client 4 for GraphQL
- MUI (Material-UI) + Emotion for styling
- Lingui for i18n
- Framer Motion for animations
- React Hook Form for forms
- Changesets for versioning/releases
