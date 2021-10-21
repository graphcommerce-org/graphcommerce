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
- `cp graphcommerce/examples/magento-graphcms my-project`

### 2) Update your package.json

Replace

```json
{
  "name": "@graphcommerce/magento-graphcms",
  "version": "2.124.0",
  "scripts": {
    // ...other scripts
    "prepack": "concurrently yarn:prepack:*",
    "prepack:1": "yarn workspace @graphcommerce/next-config prepack",
    "prepack:2": "yarn workspace @graphcommerce/graphql-codegen-near-operation-file prepack",
    "prepack:3": "yarn workspace @graphcommerce/graphql-codegen-relay-optimizer-plugin prepack",
    "postinstall": "patch-package && patch-typed-document-node && yarn prepack"
  }
}
```

With:

```json
{
  "name": "@my-company/my-project",
  "version": "2.124.0",
  "scripts": {
    // ...other scripts
    "postinstall": "patch-package && patch-typed-document-node"
  }
}
```

### 3) Remove mollie related code

The example has mollie integrated, but you probably don't have mollie installed.

- Remove `- '../../packages/mollie-magento-payment/**/*.graphqls'` lines from
  `codegen.yaml`
- Remove `"@graphcommerce/mollie-magento-payment"` from package.json
- Remove all mollie references from `pages/checkout/payment.tsx`

### 4) Updating codegen.yml files:

Replace the lines (4 times) in codegen.yaml

```yml
- '../../packages/magento-*/**/*.graphqls'
- '../../packagesDev/**/*.graphqls'
```

With:

```yml
- 'node_modules/@graphcommerce/**/*.graphqls'
```

Replace

```yml
- '../../packages/**/*.graphql'
```

With

```yml
- 'node_modules/@graphcommerce/**/*.graphql'
```

### 5) Done

Alright, we're done! 🎉 You now have a completely separate installation for your
project.

## Setting up the project

1. `yarn install`
2. `cp .env.example .env`
3. `yarn dev`
   - http://localhost:3000/api/graphql should show the GraphQL Playground
   - http://localhost:3000 should show the website
