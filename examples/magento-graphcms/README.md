# GraphCommerce with Magento GraphCMS

This example integrates with Magento and GraphCMS.

## Commands

- `yarn dev`
  - Frontend: http://localhost:3000
  - GraphQL Playground: http://localhost:3000/api/graphql
- `yarn build`: Create production build
- `yarn tsc:lint`: Lint the installation with TypeScript

Take a look at the [package.json](./package.json) for all commands.

## Creating your own project based on this example (once)

Note: We currently do not have a oneliner command to create a complete project.
See [Create project cli command](https://github.com/ho-nl/m2-pwa/issues/1174) to
keep updated on the progress.

In all code samples below, replace the following fields:

- `my-project` below for your project-name
- `my-company` below for your company-name

### 1) Download the example.

- `git clone https://github.com/ho-nl/m2-pwa graphcommerce`
- `mkdir my-project`
- `cp -R graphcommerce/examples/magento-graphcms/. my-project`
- `cd my-project`
- `rm CHANGELOG.md && touch CHANGELOG.md`
- `rm -rf node_modules && rm -rf .next`

### 2) Update your package.json

Replace

```json
{
  "name": "@graphcommerce/magento-graphcms",
  "version": "2.124.0",
  "scripts": {
    // ...other scripts
    "codegen-base": "NODE_TLS_REJECT_UNAUTHORIZED=0 CHOKIDAR_USEPOLLING=0 node -r dotenv/config node_modules/.bin/graphql-codegen -c codegen.mono.yml",
    "prepack": "concurrently yarn:prepack:*",
    "prepack:1": "yarn workspace @graphcommerce/next-config prepack",
    "prepack:2": "yarn workspace @graphcommerce/graphql-codegen-near-operation-file prepack",
    "prepack:3": "yarn workspace @graphcommerce/graphql-codegen-relay-optimizer-plugin prepack",
    "postinstall": "patch-typed-document-node && yarn prepack"
  }
}
```

With:

```json
{
  "name": "@my-company/my-project",
  "version": "0.0.0",
  "scripts": {
    // ...other scripts
    "codegen-base": "NODE_TLS_REJECT_UNAUTHORIZED=0 CHOKIDAR_USEPOLLING=0 node -r dotenv/config node_modules/.bin/graphql-codegen",
    "postinstall": "patch-typed-document-node"
  }
}
```

### 3) Remove mollie related code

The example has mollie integrated, but you probably don't have mollie installed.

- Remove `"@graphcommerce/mollie-magento-payment"` from package.json
- Remove all mollie references from `pages/checkout/payment.tsx`

### 4) Done

Alright, we're done! 🎉 You now have a completely separate installation for your
project.

You probably want to commit your project right now:

```bash
git init && git add . && git commit -m "initial commit"
```

## Setting up the project

1. `yarn install`
2. `cp .env.example .env`: You can modify the GraphQL endpoints here.
3. `yarn codegen`: Converts all the GraphQl files to TypeScript files. This
   should run without errors.
4. `yarn dev`
   - http://localhost:3000/api/graphql should show the GraphQL Playground
   - http://localhost:3000 should show the website

Alright we've got it working.

You can customize the backends by modifying the `.env` file

## Common issues

<dl>
  <dt>Failed to generate schema: invalid json response body at
https://your-magento-backend.com/graphql reason: Unexpected token E in JSON at
position 0</dt>
  <dd>This probabaly isn't an error with GraphCommerce. The Magento backend isn't responding with a valid GraphQL response You can probably find the Magento exception in the Magneto logs.</dd>
</dl>
````
