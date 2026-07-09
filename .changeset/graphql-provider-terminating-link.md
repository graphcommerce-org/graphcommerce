---
'@graphcommerce/graphql': minor
---

Add a `terminatingLink` prop to `GraphQLProvider` to override the terminating link at the tail of the Apollo link chain (by default the `HttpLink` to the Mesh backend).

Because the terminating link runs after every context-setting link (customer auth token, store, cache-id, header links), this lets you route specific operations to a different transport while still inheriting all request headers. The motivating case is file uploads: `File`/`Blob` variables must be sent as a `multipart/form-data` request (e.g. via `apollo-upload-client`'s `UploadHttpLink`), which the default `HttpLink` cannot serialize. Previously such an upload link had to be prepended via `links`, where it terminated *before* the auth/header links could run — dropping the customer token from multipart requests, so a logged-in customer's cart mutations were rejected. Supplying the upload-aware split as `terminatingLink` keeps it at the tail, so uploads inherit the token like any other operation.
