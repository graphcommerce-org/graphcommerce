---
'@graphcommerce/graphql-mesh': minor
---

Fetch request improvements in the mesh (30-100ms): The mesh wouldn't keep ssl handshakes alive causing an additional delay for each request. Performance improvements depend on the ssl handshake performance of the server.
