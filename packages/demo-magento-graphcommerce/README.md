# demo-magento-graphcommerce

There are specifc configurations for the backend used in the demo. Take a look
at the graphql and plugins directory to see what is changed for the demo.

To start with a complete copy of the demo as used on
https://graphcommerce.vercel.app:

1. Copy the [graphql](./graphql/) directory to your local project.
2. Copy the [plugins](./plugins/) directory to your local project.
3. Copy the [package.json](./package.json) `{ dependencies: { ... } }` to your
   package.
4. `yarn install`
5. `yarn codegen`
6. `yarn dev`

## Configuration

Configure the following ([configuration values](./Config.graphqls)) in your
graphcommerce.config.js
