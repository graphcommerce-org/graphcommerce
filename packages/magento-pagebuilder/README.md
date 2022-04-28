# @graphcommerce/magento-pagebuilder

Note: Please make sure you have
[updated](https://www.graphcommerce.org/docs/upgrading) to the latest version
first before you start using this package.

```bash
yarn add @graphcommerce/magento-pagebuilder
```

Add the following to your .meshrc.yml:

```yml
additionalTypeDefs:
  - '@graphcommerce/magento-pagebuilder/mesh/schema.graphqls'
additionalResolvers:
  - '@graphcommerce/magento-pagebuilder/mesh/resolvers.ts'
```

Integrate by using any of the [exported components](./index.ts).
