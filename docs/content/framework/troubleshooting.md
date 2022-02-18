# Troubleshouting

## Common build errors

If any errors are detected during the build phase, the console and browser will
display an error message. Common causes for errors are:

```
[next] 🕸️ - m2: Failed to generate schema: request to [...] failed, reason: connect ETIMEDOUT
```

Missing MAGENTO_ENDPOINT environment variable in your .env file

```
🕸️ - m2: Failed to generate schema: invalid json response body at [...] reason: Unexpected '<'
```

MAGENTO_ENDPOINT environment variable is not pointing to a Magento graphql
endpoint

```
[next] error - Error: Unexpected token < in JSON at position 0
```

The Magento version is outdated. Make sure you are running Magento 2.4.3 and up

```
Error: Invalid src prop ([...]) on 'next/image', hostname "[...]" is not configured under images in your 'next.config.js'
```

Add the image domain to IMAGE_DOMAINS in your .env file

```
File /[...]/node_modules/@graphcommerce/magento-payment-braint
ree/hooks/UseBraintree.graphql caused error: Unable to find field "createBraintreeClientToken" on type "Mutation"!
```

Remove "@graphcommerce/magento-payment-braintree" from your dependencies in
package.json. Run `yarn` to update dependencies, then run `yarn dev`.

```
File /[...]/node_modules/@graphcommerce/mollie-magento-payment
/components/MolliePlaceOrder/MolliePlaceOrder.graphql caused error: Unable to
find field "mollie_redirect_url" on type "Order"!
```

Remove "@graphcommerce/mollie-magento-payment" from your dependencies in
package.json. Run `yarn` to update dependencies, then run `yarn dev`.

```
node_modules/@graphcommerce/graphql/generated/fragments.json
Error: Interface field RoutableInterface.type expects type UrlRewriteEntityTypeEnum but BundleProduct.type is type String.
```

In the Magento store, a product attribute is configured with attribute_code
'type'. Migrate the product information to a new attribute and remove the
product attribute named 'type'.

## Magento_Reviews module is disabled

If the Magento_Review module is disabled in the Magento backend, the console and
browser will display an error message:

```
GraphQLError: - Unknown field 'sku' on type 'ProductAttributeFilterInput'.

  .../node_modules/@graphcommerce/magento-review/components/ProductReviews/ProductReviewProductName.graphql:2:22
  1 | query ProductReviewProductName($sku: String!) {
  2 |   products(filter: { sku: { eq: $sku } }) {
    |                      ^
  3 |     items {
```

Enable the
[Magento_Review module ↗](https://magento.stackexchange.com/questions/87781/how-to-disable-magento-2-reviews).
Next, remove all review components from pages:

- In /components/ProductListItems/productListRenderer.tsx, remove the import:

```
import { ProductReviewSummary } from '@graphcommerce/magento-review'
```

- Remove the bottomLeft props:

```
`bottomLeft={<ProductReviewSummary {...props} />}`
```

- In /pages/product/configurable/[url].tsx and all other product pages, remove
  the import:

```
import { jsonLdProductReview, ProductReviewChip } from '@graphcommerce/magento-review'
```

- Remove the data from the `<JsonLd>` component:

```
...jsonLdProductReview(product),

```

- Remove the `<ProductReviewChip>` component:

```
<ProductReviewChip rating={product.rating_summary} reviewSectionId='reviews' size='small' />
```
