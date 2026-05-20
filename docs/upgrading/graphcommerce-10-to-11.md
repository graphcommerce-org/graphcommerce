# Upgrading from GraphCommerce 10 to 11

GraphCommerce 11 drops support for Node.js 20 (EOL April 2026) and aligns the
framework with the
[Node.js release schedule](https://nodejs.org/en/about/previous-releases). The
minimum supported version is now Node.js 22, and Node.js 24 is recommended.

There are no source-code or API breaking changes in this release — only the
supported runtime has shifted.

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

## Step 4: Reinstall

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
