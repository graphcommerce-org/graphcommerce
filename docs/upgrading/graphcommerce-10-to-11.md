# Upgrading from GraphCommerce 10 to 11

GraphCommerce 11 drops support for Node.js 20 (EOL April 2026) and aligns the
framework with the
[Node.js release schedule](https://nodejs.org/en/about/previous-releases). The
minimum supported version is now Node.js 22, and Node.js 24 is recommended.
Configuration fields are server-only, unless their definition has `@public`.

## Step 1: Upgrade your local Node.js

| Version              | Status as of May 2026                                 |
| -------------------- | ----------------------------------------------------- |
| Node.js 20 (Iron)    | **EOL** — no longer supported                         |
| Node.js 22 (Jod)     | Maintenance LTS through ~April 2027 — **new minimum** |
| Node.js 24 (Krypton) | Active LTS since Oct 2025 — **recommended**           |
| Node.js 26           | Current since May 2026 — supported                    |

Pick whichever LTS you prefer; `>=22.0.0 <27.0.0` is the accepted range.

With `nvm`:

```bash
nvm install 24
nvm use 24
```

Then re-enable corepack so the project's pinned yarn version is picked up:

```bash
corepack enable
```

## Step 2: Bump `engines.node` in your project

If you copied the example's `engines.node` into your own `package.json`, update
it from the old GC 10 value to the GC 11 range:

```diff
  "engines": {
-   "node": ">=20 <24.0.0"
+   "node": ">=22.0.0 <27.0.0"
  }
```

If your project doesn't set `engines.node` itself, nothing to do — the engine
constraint is inherited from `@graphcommerce/magento-graphcms` (or whichever
example you bootstrapped from).

## Step 3: Update your CI / hosting

Anywhere that pins a Node version, move from 20 to 22 or 24:

- **GitHub Actions** (`.github/workflows/*.yml`):

  ```diff
  - uses: actions/setup-node@v4
    with:
  -   node-version: 20
  +   node-version: 24
  ```

  If you use `actions/setup-node@v3`, bump it to `@v4` while you're there.

- **Vercel** — set the project's "Node.js Version" to 22.x or 24.x under
  Settings → General. Vercel's `20.x` option will be removed in line with Node's
  own EOL.

- **Docker images** — update any `FROM node:20…` to `FROM node:22-…` or
  `FROM node:24-…` (alpine/slim/bookworm variants all work).

- **Devcontainer / Gitpod / Codespaces** — Gitpod users can switch their
  `.gitpod.yml` bootstrap from `nvm install 18` (or 20) to `nvm install 24`.
  Devcontainer setups that use `"lts": true` resolve to v24 automatically and
  need no change.

## Step 4: Add `@public` to configuration fields that browser code reads

1. In `graphql/Config.graphqls`, add `@public` to each scalar or enum field that
   browser code reads, also in nested inputs. Keep secrets without `@public`.

   ```diff
    extend input GraphCommerceConfig {
   -  myFeatureEnabled: Boolean
   +  myFeatureEnabled: Boolean @public
      myApiSecret: String
      myIntegration: MyIntegrationConfig
    }
    input MyIntegrationConfig {
   -  apiUrl: String
   +  apiUrl: String @public
      apiSecret: String
    }
    extend input GraphCommerceStorefrontConfig {
   -  myStoreLabel: String
   +  myStoreLabel: String @public
    }
   ```

2. Run codegen and build:

   ```bash
   yarn codegen
   yarn build
   ```

3. For each error like this one, add `@public` to the field, or move the read to
   server code:

   ```
   Export myApiSecret doesn't exist in target module
   The export myApiSecret was not found in module [project]/node_modules/@graphcommerce/next-config/dist/generated/configValues/publicOnly/index.js [client] (ecmascript).
   ```

   The error names the file that imports the field. When that file is a shared
   module, move the function that reads the field to a module that only server
   code imports:

   ```ts
   // lib/myApi.server.ts
   import { myApiSecret } from '@graphcommerce/next-config/config'

   export const fetchFromMyApi = (path: string) =>
     fetch(`https://api.example.com${path}`, {
       headers: { Authorization: `Bearer ${myApiSecret}` },
     })
   ```

4. Run `yarn dev` and open the pages that use your fields. A server-only field
   of a section, such as `myIntegration.apiSecret`, is `undefined` in browser
   code. A server-only field of a storefront, such as
   `useStorefrontConfig().myServerField`, throws in browser code:

   ```
   storefront[].myServerField is server-only. Read it on the server or add @public to GraphCommerceStorefrontConfig.myServerField in Config.graphqls.
   ```

These fields of GraphCommerce packages are server-only: `previewSecret`,
`hygraphSecret`, `hygraphWriteAccessToken`, `hygraphManagementApi`,
`hygraphProjectId`, `hygraphEndpoint`, `magentoEndpoint`, `graphqlMeshEditMode`,
`limitSsg`, `robotsAllow`, `googlePlaystore`, `algoliaHygraphIndex` and all
fields of `algolia` except `indexNamePrefix`.

## Step 5: Reinstall

After upgrading Node:

```bash
rm -rf node_modules .next
yarn install
yarn codegen
yarn dev
```

## Notes

- Node 22 will move from Maintenance LTS to EOL around April 2027 — start
  planning the move to Node 24 (or 26) before then.
- Node 25/26 are non-LTS "current" releases. They're accepted by the engine
  range, but production deployments should generally stay on the latest LTS.
