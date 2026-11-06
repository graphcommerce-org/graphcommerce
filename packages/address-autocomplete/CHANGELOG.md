# @graphcommerce/address-autocomplete

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
