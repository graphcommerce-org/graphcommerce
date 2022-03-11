---
'@graphcommerce/magento-graphcms': patch
---

Upgrade required for `./.meshrc.yml`:

Replace `'{env.MAGENTO_ENDPOINT}'` and other `'{env.SOMETHING}'` with `${MAGENTO_ENDPOINT}` and other `${SOMETHING}`. See the [.meshrc.yml in the examples directory](https://github.com/ho-nl/m2-pwa/blob/master/examples/magento-graphcms/.meshrc.yml) for the result.
