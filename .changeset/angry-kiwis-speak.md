---
'@graphcommerce/graphql-mesh': patch
---

The mesh wouldn't keep ssl handshakes alive causing an additional delay for each request. Solving this will improve every fetch request 30-100ms, depending on the ssl handshake performance of the server.
