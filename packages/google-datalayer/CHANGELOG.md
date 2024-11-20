# @graphcommerce/google-datalayer

## 9.0.0-canary.80

### Patch Changes

- [#2341](https://github.com/graphcommerce-org/graphcommerce/pull/2341) [`e3fe4f7`](https://github.com/graphcommerce-org/graphcommerce/commit/e3fe4f73c8c3e3c6a5ec68cdc7a32820e8f69e07) - Solve an issue where the BillingPage query would be re-queried after setting the payment method. ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

## 9.0.0-canary.73

### Minor Changes

- [#2337](https://github.com/graphcommerce-org/graphcommerce/pull/2337) [`18898df`](https://github.com/graphcommerce-org/graphcommerce/commit/18898df44b786dd68d8e6fec538e3db947c157e4) - All sendEvent calls are now the return type of useSendEvent, to allow plugins to use hooks themselves ([@Renzovh](https://github.com/Renzovh))

## 9.0.0-canary.60

### Patch Changes

- [#2331](https://github.com/graphcommerce-org/graphcommerce/pull/2331) [`702bfc9`](https://github.com/graphcommerce-org/graphcommerce/commit/702bfc93566c9745546988e57988431d5d4d8cb0) - Moved plugins to new format ([@paales](https://github.com/paales))

## 8.1.0-canary.20

### Patch Changes

- [#2246](https://github.com/graphcommerce-org/graphcommerce/pull/2246) [`fc5c04d`](https://github.com/graphcommerce-org/graphcommerce/commit/fc5c04d4a2c0301be7d3cc983d9b31f6fcaf6fe6) - Create useRemoveItemFromCart hook to allow for reuse while keeping compatibility with plugins. ([@Jessevdpoel](https://github.com/Jessevdpoel))

## 8.0.6-canary.2

### Patch Changes

- [#2234](https://github.com/graphcommerce-org/graphcommerce/pull/2234) [`43bd04a`](https://github.com/graphcommerce-org/graphcommerce/commit/43bd04a777c5800cc7e01bee1e123a5aad82f194) - Prevent BillingPage query from rerunning on each mutation ([@FrankHarland](https://github.com/FrankHarland))

## 8.0.5

### Patch Changes

- [#2233](https://github.com/graphcommerce-org/graphcommerce/pull/2233) [`f120bce`](https://github.com/graphcommerce-org/graphcommerce/commit/f120bce617808d756aebb7c500aa1deb9e4cf487) - Google Datalayer, Analytics and Tagmanager improvements.

  - Removed `eventFormat` as we could automatically detec the correct event format and it is now the responsibility of GTM or the GTAG to handle the event format.
  - Created cartItemToGoogleDatalayerItem and productToGoogleDatalayerItem for easier modifications. ([@paales](https://github.com/paales))

- [#2233](https://github.com/graphcommerce-org/graphcommerce/pull/2233) [`cabeadc`](https://github.com/graphcommerce-org/graphcommerce/commit/cabeadce2b73ce072a2fa8b8ab1ab49907cda13b) - Added core web vitals measurements to the datalayer. ([@paales](https://github.com/paales))

## 8.0.4

### Patch Changes

- [#2158](https://github.com/graphcommerce-org/graphcommerce/pull/2158) [`34de808`](https://github.com/graphcommerce-org/graphcommerce/commit/34de8085e9352d1f3b20b26746685370ea10ab90) - Extracted the datalayer from the googleanalytics package and moved to google-datalayer package. Make sure Google Analytics and Google Tagmanager both can send events individually. Be able to configure the datalayer will send as GA4 or legacy GA3 events. ([@mikekeehnen](https://github.com/mikekeehnen))
