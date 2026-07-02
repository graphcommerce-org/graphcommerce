---
'@graphcommerce/demo-magento-graphcommerce': patch
---

Fix breadcrumb "up" link title being translated in the wrong locale during static generation. The Lingui `t` macro title was evaluated inside the returned props after awaiting GraphQL queries, so a concurrent static-generation request for another locale could change the global active locale mid-flight. The `up` object is now computed synchronously before any await, capturing the correct locale for the current request.
