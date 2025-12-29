---
'@graphcommerce/googlerecaptcha': patch
'@graphcommerce/graphql': patch
---

ReCaptcha now using the `recaptchaV3Config` query and add a fallback for Magento 2.4.6 and earlier to still use the configuration. Magento 2.4.7 doesn't need that configuration anymore.
