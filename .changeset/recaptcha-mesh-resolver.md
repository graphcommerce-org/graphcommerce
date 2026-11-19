---
'@graphcommerce/googlerecaptcha': patch
---

Fix the mesh build with Magento 2.4.8 and later and a `googleRecaptchaKey`: `gc-mesh build` stopped with `ERR_PACKAGE_PATH_NOT_EXPORTED`. Magento 2.4.7 and later resolves `recaptchaV3Config`. For Magento 2.4.6 and earlier, the mesh resolves `recaptchaV3Config` from `googleRecaptchaKey`. There it returned `null`, so the storefront sent mutations without a reCAPTCHA token.
