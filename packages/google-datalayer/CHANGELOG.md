# @graphcommerce/google-datalayer

## 9.0.0-canary.56

## 9.0.0-canary.55

## 9.0.0-canary.54

## 8.1.0-canary.53

## 8.1.0-canary.52

## 8.1.0-canary.51

## 8.1.0-canary.50

## 8.1.0-canary.49

## 8.1.0-canary.48

## 8.1.0-canary.47

## 8.1.0-canary.46

## 8.1.0-canary.45

## 8.1.0-canary.44

## 8.1.0-canary.43

## 8.1.0-canary.42

## 8.1.0-canary.41

## 8.1.0-canary.40

## 8.1.0-canary.39

## 8.1.0-canary.38

## 8.1.0-canary.37

## 8.1.0-canary.36

## 8.1.0-canary.35

## 8.1.0-canary.34

## 8.1.0-canary.33

## 8.1.0-canary.32

## 8.1.0-canary.31

## 8.1.0-canary.30

## 8.1.0-canary.29

## 8.1.0-canary.28

## 8.1.0-canary.27

## 8.1.0-canary.26

## 8.1.0-canary.25

## 8.1.0-canary.24

## 8.1.0-canary.23

## 8.1.0-canary.22

## 8.1.0-canary.21

## 8.1.0-canary.20

### Patch Changes

- [#2246](https://github.com/graphcommerce-org/graphcommerce/pull/2246) [`fc5c04d`](https://github.com/graphcommerce-org/graphcommerce/commit/fc5c04d4a2c0301be7d3cc983d9b31f6fcaf6fe6) - Create useRemoveItemFromCart hook to allow for reuse while keeping compatibility with plugins.
  ([@Jessevdpoel](https://github.com/Jessevdpoel))

## 8.1.0-canary.19

## 8.1.0-canary.18

## 8.1.0-canary.17

## 8.1.0-canary.16

## 8.1.0-canary.15

## 8.1.0-canary.14

## 8.1.0-canary.13

## 8.1.0-canary.12

## 8.1.0-canary.11

## 8.1.0-canary.10

## 8.1.0-canary.9

## 8.1.0-canary.8

## 8.1.0-canary.7

## 8.1.0-canary.6

## 8.1.0-canary.5

## 8.0.6-canary.4

## 8.0.6-canary.3

## 8.0.6-canary.2

### Patch Changes

- [#2234](https://github.com/graphcommerce-org/graphcommerce/pull/2234) [`43bd04a`](https://github.com/graphcommerce-org/graphcommerce/commit/43bd04a777c5800cc7e01bee1e123a5aad82f194) - Prevent BillingPage query from rerunning on each mutation
  ([@FrankHarland](https://github.com/FrankHarland))

## 8.0.6-canary.1

## 8.0.6-canary.0

## 8.0.5

### Patch Changes

- [#2233](https://github.com/graphcommerce-org/graphcommerce/pull/2233) [`f120bce`](https://github.com/graphcommerce-org/graphcommerce/commit/f120bce617808d756aebb7c500aa1deb9e4cf487) - Google Datalayer, Analytics and Tagmanager improvements.

  - Removed `eventFormat` as we could automatically detec the correct event format and it is now the responsibility of GTM or the GTAG to handle the event format.
  - Created cartItemToGoogleDatalayerItem and productToGoogleDatalayerItem for easier modifications. ([@paales](https://github.com/paales))

- [#2233](https://github.com/graphcommerce-org/graphcommerce/pull/2233) [`cabeadc`](https://github.com/graphcommerce-org/graphcommerce/commit/cabeadce2b73ce072a2fa8b8ab1ab49907cda13b) - Added core web vitals measurements to the datalayer.
  ([@paales](https://github.com/paales))

## 8.0.5-canary.10

## 8.0.5-canary.9

## 8.0.5-canary.8

## 8.0.5-canary.7

## 8.0.5-canary.6

## 8.0.5-canary.5

## 8.0.5-canary.4

## 8.0.5-canary.3

## 8.0.5-canary.2

## 8.0.5-canary.1

### Patch Changes

- [#2233](https://github.com/graphcommerce-org/graphcommerce/pull/2233) [`f120bce`](https://github.com/graphcommerce-org/graphcommerce/commit/f120bce617808d756aebb7c500aa1deb9e4cf487) - Google Datalayer, Analytics and Tagmanager improvements.

  - Removed `eventFormat` as we could automatically detec the correct event format and it is now the responsibility of GTM or the GTAG to handle the event format.
  - Created cartItemToGoogleDatalayerItem and productToGoogleDatalayerItem for easier modifications. ([@paales](https://github.com/paales))

- [#2233](https://github.com/graphcommerce-org/graphcommerce/pull/2233) [`cabeadc`](https://github.com/graphcommerce-org/graphcommerce/commit/cabeadce2b73ce072a2fa8b8ab1ab49907cda13b) - Added core web vitals measurements to the datalayer.
  ([@paales](https://github.com/paales))

## 8.0.5-canary.0

## 8.0.4

### Patch Changes

- [#2158](https://github.com/graphcommerce-org/graphcommerce/pull/2158) [`34de808`](https://github.com/graphcommerce-org/graphcommerce/commit/34de8085e9352d1f3b20b26746685370ea10ab90) - Extracted the datalayer from the googleanalytics package and moved to google-datalayer package. Make sure Google Analytics and Google Tagmanager both can send events individually. Be able to configure the datalayer will send as GA4 or legacy GA3 events.
  ([@mikekeehnen](https://github.com/mikekeehnen))

## 8.0.4-canary.1

### Patch Changes

- [#2158](https://github.com/graphcommerce-org/graphcommerce/pull/2158) [`34de808`](https://github.com/graphcommerce-org/graphcommerce/commit/34de8085e9352d1f3b20b26746685370ea10ab90) - Extracted the datalayer from the googleanalytics package and moved to google-datalayer package. Make sure Google Analytics and Google Tagmanager both can send events individually. Be able to configure the datalayer will send as GA4 or legacy GA3 events.
  ([@mikekeehnen](https://github.com/mikekeehnen))
