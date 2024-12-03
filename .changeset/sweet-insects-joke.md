---
'@graphcommerce/magento-graphcms': patch
'@graphcommerce/next-ui': patch
---

Date strings (12-12-2012) are not supported by older Safari browser versions. must be converted (12/12/2012) in order for it to function; otherwise, it will return NaN if we attempt to access the getTime() on an object.
