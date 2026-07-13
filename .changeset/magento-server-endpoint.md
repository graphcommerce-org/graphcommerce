---
'@graphcommerce/graphql-mesh': minor
---

Route server-side Magento traffic over an internal network with the new runtime-only `GC_MAGENTO_ENDPOINT_SERVER` environment variable (e.g. `http://varnish.magento-namespace.svc.cluster.local`). When set, every mesh request whose URL starts with the origin of `GC_MAGENTO_ENDPOINT` — GraphQL and REST — is rewritten to the internal origin and gains an `X-Forwarded-Proto: https` header, so frontend↔Magento traffic inside a Kubernetes cluster no longer hairpins over the public load balancer. Unset, behavior is unchanged. See the new "Routing Magento traffic over an internal network" section in the mesh docs.
