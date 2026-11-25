# @graphcommerce/address-autocomplete

## 11.0.0-canary.64

## 11.0.0-canary.63

## 11.0.0-canary.62

## 11.0.0-canary.61

## 11.0.0-canary.60

## 11.0.0-canary.59

## 11.0.0-canary.58

## 11.0.0-canary.57

### Major Changes

- [#2708](https://github.com/graphcommerce-org/graphcommerce/pull/2708) [`cb36d6c`](https://github.com/graphcommerce-org/graphcommerce/commit/cb36d6c219e067ffe2fb2e847a8ff84e8f87a5e8) - **Breaking change:** GraphCommerce requires Lingui 6 and Node.js 22.19 or later. Lingui 6 has no `@lingui/macro` package: import the JSX macros from `@lingui/react/macro`. The `lingui-next` config excludes `.d.ts` files and `node_modules` outside the working directory too. ([@paales](https://github.com/paales))

### Patch Changes

- [#2708](https://github.com/graphcommerce-org/graphcommerce/pull/2708) [`1c97bc6`](https://github.com/graphcommerce-org/graphcommerce/commit/1c97bc6d6d01e80d98fe70e595b06804be2ba905) - Uses `@googlemaps/js-api-loader` 2, `cookie` 2, `fetch-retry` 6, `web-vitals` 6 and `schema-dts` 2. `usePlacesAutocomplete` loads the Places library with `setOptions` and `importLibrary`. ([@paales](https://github.com/paales))

## 11.0.0-canary.56

## 11.0.0-canary.55

## 11.0.0-canary.54

## 11.0.0-canary.53

## 11.0.0-canary.52

## 11.0.0-canary.51

## 11.0.0-canary.50

### Patch Changes

- [#2707](https://github.com/graphcommerce-org/graphcommerce/pull/2707) [`abcfce1`](https://github.com/graphcommerce-org/graphcommerce/commit/abcfce130beaf5544a6ceec794fdeb99e4b3e3ba) - **Breaking change:** configuration fields are server-only, unless their definition in `Config.graphqls` has `@public`. In the browser, `@graphcommerce/next-config/config` resolves to a file with only the `@public` fields, so secrets such as `previewSecret` and `hygraphSecret` stay out of the client JavaScript and its source maps. Turbopack stops the build on a browser import of a server-only field. See [docs/upgrading/graphcommerce-10-to-11.md](docs/upgrading/graphcommerce-10-to-11.md). ([@paales](https://github.com/paales))

## 11.0.0-canary.49

## 11.0.0-canary.48

## 11.0.0-canary.47

## 11.0.0-canary.46

## 11.0.0-canary.45

## 10.1.0-canary.44

## 10.1.0-canary.43

## 10.1.0-canary.42

### Minor Changes

- [#2653](https://github.com/graphcommerce-org/graphcommerce/pull/2653) [`18ef8ef`](https://github.com/graphcommerce-org/graphcommerce/commit/18ef8ef45d244aa480508db9377f4fa83e651734) - Adds Google Places address autocomplete to customer and checkout address forms. Selected addresses populate GraphCommerce address fields and Magento regions, with automatic fallback to manual entry when Google Maps is unavailable. ([@hsngdz](https://github.com/hsngdz))
