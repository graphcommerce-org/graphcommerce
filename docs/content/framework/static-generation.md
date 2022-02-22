# Static Site Generation (SSG) in GraphCommerce

## Built your local environment

Previously, you [created a new GraphCommerce app](../getting-started/create.md).

To start the static build process:

- `cd /examples/magento-graphcms/` Navigate to the project directory
- `yarn build` Start static build process

## getStaticProps

If you export a function called getStaticProps (Static Site Generation) from a
page, Next.js will pre-render this page at build time using the props returned
by getStaticProps.
