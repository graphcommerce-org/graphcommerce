# Creating a new project

This Getting Stared guide allows you to use GraphCommerce for your own project.
If you are looking to use GraphCommerce, take a look at the
[Getting Stared guide](./getting-started.md)

## Preparation:

- Make sure you are using node 14: `nvm install 14 && nvm use 14`
- Make sure you have installed yarn: `npm install --global yarn`

## Creating a new project manually

Note: We currently do not have a oneliner command to create a complete project.
See [Create project cli command](https://github.com/ho-nl/m2-pwa/issues/1174) to
keep updated on the progress.

We're going to make a copy of the GraphCommerce main repo and removing all
framework stuff and keeping only project specific stuff.

- _Replace `my-project` below for your project name_
- _Replace `my-company` below for your company name_

### Creating the folder structure

```bash
git clone git@github.com:ho-nl/m2-pwa.git my-project && cd my-project
rm -rf .git
rm yarn.lock
rm -rf packages
rm -rf packagesDev
rm -rf docs
mkdir src
mv examples/magento-graphcms src/my-project
mv examples/magento-graphcms-api src/my-project-api
rm -r examples
rm CHANGELOG.md && touch CHANGELOG.md
rm src/my-project/CHANGELOG.md && touch src/my-project/CHANGELOG.md
rm src/my-project-api/CHANGELOG.md && touch src/my-project-api/CHANGELOG.md
```

### Updating package.json files

Update the `package.json` files with a the project name, start version back from
`0.0.0` and update the scripts:

1. Edit `package.json` and replace the following fields (keep the remaining
   fields)

   ```json
     "name": "@my-company/my-project-root",
     "version": "0.0.0",
     "scripts": {
       "postinstall": "patch-package && patch-typed-document-node",
       "dev:api": "yarn pm2 start -s --name my-project-api \"NODE_TLS_REJECT_UNAUTHORIZED=0 yarn workspace @my-company/my-project-api dev \" && sleep 5",
       "dev:codegen": "yarn pm2 start -s --name codegen \"yarn workspace @my-company/my-project dev:codegen \"",
       "dev:next": "yarn pm2 start -s --name my-project \"NODE_TLS_REJECT_UNAUTHORIZED=0 yarn workspace @my-company/my-project dev\"",
       "dev:log": "yarn pm2 logs",
       "dev": "yarn stop; yarn dev:api && yarn dev:next && yarn dev:codegen && yarn dev:log",
       "postdev": "yarn stop",
       "build:my-project-api": "yarn workspace @my-company/my-project-api build && yarn start:my-project-api",
       "build:my-project": "yarn workspace @my-company/my-project build",
       "build": "yarn stop; yarn build:my-project-api && yarn build:my-project; yarn stop",
       "stop": "yarn pm2 delete all 2> /dev/null",
       "start:my-project-api": "yarn pm2 start -s --name my-project-api \"NODE_TLS_REJECT_UNAUTHORIZED=0 yarn workspace @my-company/my-project-api start-local\" && sleep 2",
       "start:my-project": "NODE_TLS_REJECT_UNAUTHORIZED=0 yarn workspace @my-company/my-project start",
       "start": "yarn start:my-project-api && yarn start:my-project",
       "eslint:lint": "eslint --ignore-path .gitignore '**/{*.js,*.ts,*.tsx}'",
       "eslint:fix": "eslint --fix --ignore-path .gitignore '**/{*.js,*.ts,*.tsx}'",
       "prettier:fix": "yarn prettier --ignore-path .gitignore --write '**/*.{ts,tsx,css,html,json}'",
       "tsc": "./node_modules/.bin/tsc",
       "tsc:lint": "yarn tsc --noEmit -p .",
       "playwright": "npx playwright test --headed --project=chrome"
     },
   ```

2. Edit `src/my-project/packages.json` and replace the following fields (keep
   the remaining fields):

   ```json
   {
     "name": "@my-company/my-project",
     "version": "0.0.0",
     "scripts": {
       "dev": "next",
       "codegen": "NODE_TLS_REJECT_UNAUTHORIZED=0 CHOKIDAR_USEPOLLING=0 node -r dotenv/config node_modules/.bin/graphql-codegen",
       "dev:codegen": "yarn codegen -w",
       "build": "yarn codegen && next build && yarn next-sitemap",
       "start": "next start",
       "postinstall": "patch-package && patch-typed-document-node"
     }
   }
   ```

3. Edit `src/my-project-api/packages.json` and replace the following fields
   (keep the remaining fields)

   ```json
   {
     "name": "@my-company/my-project-api",
     "version": "0.0.0",
     "scripts": {
       "dev": "next -p 3001",
       "build": "next build",
       "start": "next start",
       "start-local": "next start -p 3001"
     }
   }
   ```

### Removing mollie related code

- Remove `- '../../packages/mollie-magento-payment/**/*.graphqls'` lines from
  `src/my-project/codegen.yaml`
- Remove `"@graphcommerce/mollie-magento-payment"`
- Remove all mollie references from `src/my-project/pages/checkout/payment.tsx`

### Updating codegen.yml files:

Replace the lines (4 times) in codegen.yaml

```yml
- '../../packages/magento-*/**/*.graphqls'
- '../../packagesDev/**/*.graphqls'
```

With:

```yml
- '../../node_modules/@graphcommerce/**/*.graphqls'
```

### Commit everything

```bash
git init
git add .
git commit -m "initial commit"
```

### Cloning

### Done

Alright, we're done! 🎉 You now have a completely separate installation for your
project.

Continue with [Setting up an existing project](existing-project.md)
