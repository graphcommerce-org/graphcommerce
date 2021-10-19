# Setting up an existing project

- Make sure you are using node 14: `nvm install 14 && nvm use 14`
- Make sure you have installed yarn: `npm install --global yarn`

Note: It currenlty isn't possible to automatically set up a GraphCMS project.
Please contact a GraphCommerce maintainer to help you.

- _Replace `my-project` below for your project name_
- _Replace `my-company` below for your company name_

1. `yarn install`
2. `cp src/my-project-api/.env.example src/my-project-api/.env`
3. `cp src/my-project/.env.example src/my-project/.env`
4. Fill in `GRAPHCMS_BEARER` from your GraphCMS instance.
5. Run `yarn workspace @my-company/my-project-api dev`,
   http://localhost:3001/api/graphql should show the GraphQL Playground
6. In a separate terminal, run `yarn workspace @my-company/my-project codegen`,
   this should work as expected.
7. If step 5 and 6 run correctly everything should work. You can now stop the
   process started in step 5. You're done 🎉

## Commands

- `yarn dev`: Start development server
  - frontend: http://localhost:3000
  - graphql playground: http://localhost:3001/api/graphql
- `yarn stop`: Stop development server
- `yarn build`: Create production build of everything
- `yarn tsc:lint`: Lint the installation with TypeScript
- `yarn dev:log`: Information about running processes
