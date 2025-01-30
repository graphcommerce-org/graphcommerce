# @graphcommerce/google-playstore

Helper package to publish your app to the Google Playstore and be able to handle
the deep links from Android.

## Installation

1. Find current version of your `@graphcommerce/next-ui` in your package.json.
2. `yarn add @graphcommerce/google-playstore@1.2.3` (replace 1.2.3 with the
   version of the step above)

## Configuration

Configure the following ([configuration values](./Config.graphqls)) in your
graphcommerce.config.js

```bash
GC_GOOGLE_PLAYSTORE='{"packageName":"com.example.app","sha256CertificateFingerprint":"0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"}'
```
