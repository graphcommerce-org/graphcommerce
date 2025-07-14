---
'@graphcommerce/graphql': minor
'@graphcommerce/magento-graphql': minor
'@graphcommerce/magento-store': minor
---

Intoduce a new Product-`uid` to solve an issue where cache normalization was not working properly on the frontend when viewing products with a differen curreny, etc.

Products now have a more detailed `uid` which will include the scope the product is retrieved from. For example: `NDg5MDM=?store=nl_NL&currencyCode=EUR`. This results in a better cache normalization in Apollo Client and allows for switching between scopes (store/currency/price views/accounts) without creating a broken cache state.

We have implemented this with a new resolver that rewrites the `uid` passed from Magento to the Mesh Resolver, and additing additonal data to the `uid` based on the headers passed from the client. This also requires each package to implement the `getPrivateQueryContextMesh` method to retrieve the current PrivateQuery context from the GraphQL request headers.
