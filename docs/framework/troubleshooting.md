# Troubleshouting

## Common errors

If any errors are detected during the build phase, the console and browser will
display an error message. Common causes for errors are:

```bash
[next] [GraphQL Errors] failed to fetch to https://magento.test/graphql products
```

You are connecting with a local endpoint with a self signed SSL certicate, start
your dev server with `NODE_TLS_REJECT_UNAUTHORIZED=0 yarn dev`

```bash
[next] 🕸️ - m2: Failed to generate schema: request to [...] failed, reason: connect ETIMEDOUT
```

Missing `magentoEndpoint` in your graphcommerce.config.js

```bash
🕸️ - m2: Failed to generate schema: invalid json response body at [...] reason: Unexpected '<'
```

`magentoEndpoint` environment variable is not pointing to a Magento graphql
endpoint

```bash
[next] error - Error: Unexpected token < in JSON at position 0
```

The Magento version is outdated. Make sure you are running Magento 2.4.3 and up

```bash
Error: Invalid src prop ([...]) on 'next/image', hostname "[...]" is not configured under images in your 'next.config.js'
```

Add the image domain to the next.config.js

```bash
node_modules/@graphcommerce/graphql/generated/fragments.json
Error: Interface field RoutableInterface.type expects type UrlRewriteEntityTypeEnum but BundleProduct.type is type String.
```

In the Magento store, a product attribute is configured with attribute_code
'type'. Migrate the product information to a new attribute and remove the
product attribute named 'type'.

## Next steps

- Learn how to [Set up Visual Studio Code](../getting-started/vscode.md) and
  install usefull extensions for an optimal development experience
