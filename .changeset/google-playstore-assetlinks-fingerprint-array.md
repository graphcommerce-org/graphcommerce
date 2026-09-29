---
'@graphcommerce/google-playstore': patch
---

Write `sha256_cert_fingerprints` in `assetlinks.json` as an array. Google Digital Asset Links rejects the file when the field is a string, so Android does not verify the app links of the TWA.
