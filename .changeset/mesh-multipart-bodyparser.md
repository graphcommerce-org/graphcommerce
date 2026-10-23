---
'@graphcommerce/graphql-mesh': patch
---

Fix GraphQL multipart uploads (`Upload` scalar) through the Mesh. Next.js'
pages-router bodyParser decodes multipart request bodies as UTF-8 text before
Yoga can parse them, silently corrupting binary upload bytes (invalid UTF-8
sequences become replacement characters and the part's mime type is lost). The
`/api/graphql` route now sets `bodyParser: false` so Yoga receives the raw
stream, and `createServer` throws a descriptive error when it receives a
multipart request whose body was already consumed by the bodyParser.
