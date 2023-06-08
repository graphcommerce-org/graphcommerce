# Change Log

## 6.2.0-canary.37

### Patch Changes

- [#1952](https://github.com/graphcommerce-org/graphcommerce/pull/1952) [`f1fe4f598`](https://github.com/graphcommerce-org/graphcommerce/commit/f1fe4f5986cee1f7c8313152e43691ed939c8f21) - enable password fields when there is an error and user input correction is required. ([@carlocarels90](https://github.com/carlocarels90))

## 6.2.0-canary.36

## 6.2.0-canary.35

## 6.2.0-canary.34

## 6.2.0-canary.33

## 6.2.0-canary.32

## 6.2.0-canary.31

## 6.2.0-canary.30

### Patch Changes

- [#1942](https://github.com/graphcommerce-org/graphcommerce/pull/1942) [`21b0d0c48`](https://github.com/graphcommerce-org/graphcommerce/commit/21b0d0c48603343c09f287978bf051140e9be912) - Customer's session is now revalidated when a previous session is detected on pageload, making sure the customer is still logged in. ([@paales](https://github.com/paales))

## 6.2.0-canary.29

## 6.2.0-canary.28

## 6.2.0-canary.27

## 6.2.0-canary.26

## 6.2.0-canary.25

## 6.2.0-canary.24

## 6.2.0-canary.23

## 6.2.0-canary.22

## 6.2.0-canary.21

## 6.2.0-canary.20

## 6.2.0-canary.19

## 6.2.0-canary.18

## 6.2.0-canary.17

## 6.2.0-canary.16

### Patch Changes

- [#1930](https://github.com/graphcommerce-org/graphcommerce/pull/1930) [`c8d023e9e`](https://github.com/graphcommerce-org/graphcommerce/commit/c8d023e9e874131cd9f8fe192b1fca5fe1a26ee3) - Fix the close menu on search and add the option to secondary menu items ([@StefanAngenent](https://github.com/StefanAngenent))

## 6.2.0-canary.15

### Minor Changes

- [#1926](https://github.com/graphcommerce-org/graphcommerce/pull/1926) [`ab8877fdb`](https://github.com/graphcommerce-org/graphcommerce/commit/ab8877fdb6147960ce656d28306d719e92f6de68) - Made the follow order link in the order card & order details a working <Link /> if provided from magento backend. ([@JoshuaS98](https://github.com/JoshuaS98))

## 6.2.0-canary.14

## 6.2.0-canary.13

## 6.2.0-canary.12

## 6.2.0-canary.11

## 6.2.0-canary.10

## 6.2.0-canary.9

## 6.2.0-canary.8

## 6.2.0-canary.7

### Patch Changes

- [#1916](https://github.com/graphcommerce-org/graphcommerce/pull/1916) [`97ebc19af`](https://github.com/graphcommerce-org/graphcommerce/commit/97ebc19aff093bf57d24d009e96661ad43926fd6) - The customer's token would be invalidated if any authorization error occured. Now only scoped to customer queries and mutations, potentially reducing the amount of random logouts. ([@paales](https://github.com/paales))

## 6.2.0-canary.6

## 6.1.1-canary.5

## 6.1.1-canary.4

### Patch Changes

- [#1914](https://github.com/graphcommerce-org/graphcommerce/pull/1914) [`38d6c4888`](https://github.com/graphcommerce-org/graphcommerce/commit/38d6c488850013b36cae9f388996039219c1327e) - Errors in the cart didn't allow for recovery from the faulty state ([@paales](https://github.com/paales))

## 6.1.1-canary.3

## 6.1.1-canary.2

## 6.1.1-canary.1

## 6.1.1-canary.0

## 6.1.0

### Minor Changes

- [#1869](https://github.com/graphcommerce-org/graphcommerce/pull/1869) [`82111fa35`](https://github.com/graphcommerce-org/graphcommerce/commit/82111fa351b68a76ff053ebb7e0261ee507a826d) - Faster page rendering on all pages that use Apollo Client: Revert to classical useEffect strategy for Apollo cache persist restore and remove custom hydration strategies from the cart/customer.

  This comes with a caviat: When using `<Suspense>` to defer rendering you might run into hydration errors. In the case where the Suspense boundaries are used to improve performance, you are required to remove those. We have a follow-up [PR](https://github.com/graphcommerce-org/graphcommerce/pull/1878) in the works that allows getting the hydration performance improvement, but not have the hydration errors. ([@paales](https://github.com/paales))

### Patch Changes

- [#1866](https://github.com/graphcommerce-org/graphcommerce/pull/1866) [`eafe3a17d`](https://github.com/graphcommerce-org/graphcommerce/commit/eafe3a17d6c6b4a9ca524361498ffa382d44c63f) - useOrderCardItemImages was triggered when there were no urlKeys present, causing unnessary requests to be made to the backend. ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

- [#1889](https://github.com/graphcommerce-org/graphcommerce/pull/1889) [`38bf4b6bc`](https://github.com/graphcommerce-org/graphcommerce/commit/38bf4b6bc6e705d9d124d50b775ba3f440599482) - put the country field first, so the address fields will not be changed afterwards when postcode service is active. ([@carlocarels90](https://github.com/carlocarels90))

- [#1899](https://github.com/graphcommerce-org/graphcommerce/pull/1899) [`3de184ee2`](https://github.com/graphcommerce-org/graphcommerce/commit/3de184ee28d48d8f1c1c092f264ac6b86fdf3ec6) - Make order states translatable ([@carlocarels90](https://github.com/carlocarels90))

- [#1896](https://github.com/graphcommerce-org/graphcommerce/pull/1896) [`4f846293f`](https://github.com/graphcommerce-org/graphcommerce/commit/4f846293f3b020dc7bae885fe4ccd1cbd0cb10d7) - When a customer would log in the current guest information would be lost ([@paales](https://github.com/paales))

## 6.0.2-canary.22

## 6.0.2-canary.21

### Patch Changes

- [#1899](https://github.com/graphcommerce-org/graphcommerce/pull/1899) [`3de184ee2`](https://github.com/graphcommerce-org/graphcommerce/commit/3de184ee28d48d8f1c1c092f264ac6b86fdf3ec6) - Make order states translatable ([@carlocarels90](https://github.com/carlocarels90))

## 6.0.2-canary.20

## 6.0.2-canary.19

## 6.0.2-canary.18

### Patch Changes

- [#1889](https://github.com/graphcommerce-org/graphcommerce/pull/1889) [`38bf4b6bc`](https://github.com/graphcommerce-org/graphcommerce/commit/38bf4b6bc6e705d9d124d50b775ba3f440599482) - put the country field first, so the address fields will not be changed afterwards when postcode service is active. ([@carlocarels90](https://github.com/carlocarels90))

## 6.0.2-canary.17

## 6.0.2-canary.16

### Patch Changes

- [#1896](https://github.com/graphcommerce-org/graphcommerce/pull/1896) [`4f846293f`](https://github.com/graphcommerce-org/graphcommerce/commit/4f846293f3b020dc7bae885fe4ccd1cbd0cb10d7) - When a customer would log in the current guest information would be lost ([@paales](https://github.com/paales))

## 6.0.2-canary.15

## 6.0.2-canary.14

## 6.0.2-canary.13

### Patch Changes

- [#1869](https://github.com/graphcommerce-org/graphcommerce/pull/1869) [`82111fa35`](https://github.com/graphcommerce-org/graphcommerce/commit/82111fa351b68a76ff053ebb7e0261ee507a826d) - Revert to classical useEffect strategy for Apollo cache persist restore and remove custom hydration strategies from the cart. ([@paales](https://github.com/paales))

## 6.0.2-canary.12

## 6.0.2-canary.11

## 6.0.2-canary.10

## 6.0.2-canary.9

## 6.0.2-canary.8

## 6.0.2-canary.7

## 6.0.2-canary.6

## 6.0.2-canary.5

## 6.0.2-canary.4

## 6.0.2-canary.3

## 6.0.2-canary.2

## 6.0.2-canary.1

## 6.0.2-canary.0

### Patch Changes

- [#1866](https://github.com/graphcommerce-org/graphcommerce/pull/1866) [`eafe3a17d`](https://github.com/graphcommerce-org/graphcommerce/commit/eafe3a17d6c6b4a9ca524361498ffa382d44c63f) - don't execute useOrderCardItemImages if urlKeys is empty ([@Giovanni-Schroevers](https://github.com/Giovanni-Schroevers))

## 6.0.1

### Patch Changes

- [#1855](https://github.com/graphcommerce-org/graphcommerce/pull/1855) [`0f789d3be`](https://github.com/graphcommerce-org/graphcommerce/commit/0f789d3be1aa6d724bd98bceee092e1da6701915) - Added registration email validation to inline registration form. ([@mikekeehnen](https://github.com/mikekeehnen))

## 6.0.1-canary.7

## 6.0.1-canary.6

## 6.0.1-canary.5

## 6.0.1-canary.4

## 6.0.1-canary.3

### Patch Changes

- [#1855](https://github.com/graphcommerce-org/graphcommerce/pull/1855) [`0f789d3be`](https://github.com/graphcommerce-org/graphcommerce/commit/0f789d3be1aa6d724bd98bceee092e1da6701915) - Added registration email validation to inline registration form. ([@mikekeehnen](https://github.com/mikekeehnen))

## 6.0.1-canary.2

## 6.0.1-canary.1

## 6.0.1-canary.0

## 6.0.0

### Minor Changes

- [#1816](https://github.com/graphcommerce-org/graphcommerce/pull/1816) [`f61e2e572`](https://github.com/graphcommerce-org/graphcommerce/commit/f61e2e5721806c258b771a7ed5165da8dc7b815b) - Add feedback messages on 'add address form' ([@FrankHarland](https://github.com/FrankHarland))

- [#1779](https://github.com/graphcommerce-org/graphcommerce/pull/1779) [`6c6d7e4d7`](https://github.com/graphcommerce-org/graphcommerce/commit/6c6d7e4d7cf5d68a39acc82b91e1f3acce366517) - Added postcode check for Dutch address fields. Ddds an autocomplete field for the street name and city based of the customers postcode + street number + addition. ([@Jessevdpoel](https://github.com/Jessevdpoel))

### Patch Changes

- [#1768](https://github.com/graphcommerce-org/graphcommerce/pull/1768) [`23e9a4728`](https://github.com/graphcommerce-org/graphcommerce/commit/23e9a472899dfc0b56b989f5d0e8ffb802c8cc5f) - Deprecated @graphcommerce/magento-customer-account & @graphcommerce/magento-customer-order packages and moved all functionality to @graphcomemrce/magento-customer ([@bramvanderholst](https://github.com/bramvanderholst))

- [#1768](https://github.com/graphcommerce-org/graphcommerce/pull/1768) [`7e8dcf447`](https://github.com/graphcommerce-org/graphcommerce/commit/7e8dcf44777aca527c07aaee397d272dd2f6ae44) - Customer accoutn address list now updates after deleting an address. ([@bramvanderholst](https://github.com/bramvanderholst))

- [#1768](https://github.com/graphcommerce-org/graphcommerce/pull/1768) [`9f0e9ab2d`](https://github.com/graphcommerce-org/graphcommerce/commit/9f0e9ab2dec3f9261ae00e9fd44d06a65ddb1d0d) - After editing an address in the my account section it, the user will now be redirected to the over page, instead of redirecting to the edit page. ([@bramvanderholst](https://github.com/bramvanderholst))

- [#1801](https://github.com/graphcommerce-org/graphcommerce/pull/1801) [`12263d608`](https://github.com/graphcommerce-org/graphcommerce/commit/12263d6080c1e550985a42f140ffa9d95d0b0335) - Added translations for the sign-up form. ([@StefanAngenent](https://github.com/StefanAngenent))

- [#1769](https://github.com/graphcommerce-org/graphcommerce/pull/1769) [`2693a616a`](https://github.com/graphcommerce-org/graphcommerce/commit/2693a616af2f9793012a5fb2eeacc084e695b83e) - WaitForCustomer now accepts overridable components for the fallback and unauthenticated state. ([@mikekeehnen](https://github.com/mikekeehnen))

## 6.0.0-canary.54

## 6.0.0-canary.53

## 6.0.0-canary.52

## 6.0.0-canary.51

## 6.0.0-canary.50

## 6.0.0-canary.49

## 6.0.0-canary.48

## 6.0.0-canary.47

## 6.0.0-canary.46

## 6.0.0-canary.45

## 6.0.0-canary.44

## 6.0.0-canary.43

## 6.0.0-canary.42

## 6.0.0-canary.41

## 6.0.0-canary.40

## 6.0.0-canary.39

## 6.0.0-canary.38

## 6.0.0-canary.37

## 6.0.0-canary.36

## 6.0.0-canary.35

## 6.0.0-canary.34

## 6.0.0-canary.33

## 6.0.0-canary.32

## 6.0.0-canary.31

## 6.0.0-canary.30

## 6.0.0-canary.29

## 6.0.0-canary.28

## 6.0.0-canary.27

## 6.0.0-canary.26

## 6.0.0-canary.25

### Patch Changes

- [#1816](https://github.com/graphcommerce-org/graphcommerce/pull/1816) [`f61e2e572`](https://github.com/graphcommerce-org/graphcommerce/commit/f61e2e5721806c258b771a7ed5165da8dc7b815b) - feat(GCOM-1015): add feedback on add address form, update addresslist… ([@FrankHarland](https://github.com/FrankHarland))

## 6.0.0-canary.24

## 6.0.0-canary.23

## 6.0.0-canary.22

## 6.0.0-canary.21

## 6.0.0-canary.20

## 5.2.0-canary.19

## 5.2.0-canary.18

## 5.2.0-canary.17

### Patch Changes

- [#1801](https://github.com/graphcommerce-org/graphcommerce/pull/1801) [`12263d608`](https://github.com/graphcommerce-org/graphcommerce/commit/12263d6080c1e550985a42f140ffa9d95d0b0335) - Add sign up form translations ([@StefanAngenent](https://github.com/StefanAngenent))

## 5.2.0-canary.16

## 5.2.0-canary.15

## 5.2.0-canary.14

## 5.2.0-canary.13

## 5.2.0-canary.12

## 5.2.0-canary.11

## 5.2.0-canary.10

## 5.2.0-canary.9

## 5.2.0-canary.8

### Minor Changes

- [#1779](https://github.com/graphcommerce-org/graphcommerce/pull/1779) [`6c6d7e4d7`](https://github.com/graphcommerce-org/graphcommerce/commit/6c6d7e4d7cf5d68a39acc82b91e1f3acce366517) - Implementation of the Dutch address fields, add an autocomplete field for the street name and city based of the customers postcode + street number + addition. ([@Jessevdpoel](https://github.com/Jessevdpoel))

## 5.2.0-canary.7

## 5.2.0-canary.6

## 5.2.0-canary.5

## 5.2.0-canary.4

## 5.2.0-canary.3

## 5.2.0-canary.2

## 5.2.0-canary.1

### Patch Changes

- [#1768](https://github.com/graphcommerce-org/graphcommerce/pull/1768) [`23e9a4728`](https://github.com/graphcommerce-org/graphcommerce/commit/23e9a472899dfc0b56b989f5d0e8ffb802c8cc5f) - Move magento-customer-account & magento-customer-order into magento-customer package (magento-customer-account & magento-customer-order are now deprecated) ([@bramvanderholst](https://github.com/bramvanderholst))

- [#1768](https://github.com/graphcommerce-org/graphcommerce/pull/1768) [`7e8dcf447`](https://github.com/graphcommerce-org/graphcommerce/commit/7e8dcf44777aca527c07aaee397d272dd2f6ae44) - Update account address list after deleting an address ([@bramvanderholst](https://github.com/bramvanderholst))

- [#1768](https://github.com/graphcommerce-org/graphcommerce/pull/1768) [`9f0e9ab2d`](https://github.com/graphcommerce-org/graphcommerce/commit/9f0e9ab2dec3f9261ae00e9fd44d06a65ddb1d0d) - Redirect to address overview page after creating an address instead of redirecting to the edit page for the address that was just created ([@bramvanderholst](https://github.com/bramvanderholst))

## 5.2.0-canary.0

### Minor Changes

- [#1769](https://github.com/graphcommerce-org/graphcommerce/pull/1769) [`2693a616a`](https://github.com/graphcommerce-org/graphcommerce/commit/2693a616af2f9793012a5fb2eeacc084e695b83e) - WaitForCustomer now accepts overridable components for the fallback and unauthenticated state. ([@mikekeehnen](https://github.com/mikekeehnen))

## 5.1.1

## 5.1.1-canary.1

## 5.1.1-canary.0

## 5.1.0

### Patch Changes

- [#1745](https://github.com/graphcommerce-org/graphcommerce/pull/1745) [`b1444b933`](https://github.com/graphcommerce-org/graphcommerce/commit/b1444b9336107d3ac111563f9b62a884f1b26a8d) - Bring password reset page more in line with standard forms, add missing translations. ([@github-actions](https://github.com/apps/github-actions))

- [#1752](https://github.com/graphcommerce-org/graphcommerce/pull/1752) [`2a6a4d9ec`](https://github.com/graphcommerce-org/graphcommerce/commit/2a6a4d9ecfa1b58a66ba9b9d00016d6feda9aa95) - Updated dependencies to latest versions, except for nextjs; Solve tons of peer dependency issues.

  - Updated the @mui/material package
  - Removed dependencies on react-hook-form-mui and @playwright/test
  - Upgraded dependencies including type-fest and graphql-mesh
  - Solved peer dependency issues ([@paales](https://github.com/paales))

## 5.1.0-canary.11

## 5.1.0-canary.10

## 5.1.0-canary.9

## 5.1.0-canary.8

## 5.1.0-canary.7

## 5.1.0-canary.6

## 5.1.0-canary.5

### Patch Changes

- [`b1444b933`](https://github.com/graphcommerce-org/graphcommerce/commit/b1444b9336107d3ac111563f9b62a884f1b26a8d) - Bring password reset page more in line with standard forms, add missing translations. ([@paales](https://github.com/paales))

## 5.1.0-canary.4

## 5.1.0-canary.3

### Patch Changes

- [#1752](https://github.com/graphcommerce-org/graphcommerce/pull/1752) [`2a6a4d9ec`](https://github.com/graphcommerce-org/graphcommerce/commit/2a6a4d9ecfa1b58a66ba9b9d00016d6feda9aa95) - Updated dependencies to latest versions, except for nextjs; Solve tons of peer dependency issues.

  - Updated the @mui/material package
  - Removed dependencies on react-hook-form-mui and @playwright/test
  - Upgraded dependencies including type-fest and graphql-mesh
  - Solved peer dependency issues ([@paales](https://github.com/paales))

## 5.1.0-canary.2

## 5.1.0-canary.1

## 5.1.0-canary.0

## 5.0.0

### Major Changes

- [#1734](https://github.com/graphcommerce-org/graphcommerce/pull/1734) [`e4c7fe17e`](https://github.com/graphcommerce-org/graphcommerce/commit/e4c7fe17e413e37362ceae92e67f1b3a5f62d398) - Bump major version of all packages ([@github-actions](https://github.com/apps/github-actions))

### Minor Changes

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`761bd2832`](https://github.com/graphcommerce-org/graphcommerce/commit/761bd2832f115afc8b95bedbf479266309dd5acc) - ApolloLinks, typePolicies and migration scripts are now handled with plugins on the new library component `<GraphQLProvider/>`. Hygraph's, Magento Cart, Customer, Store, Wishlist and Magento GraphQL are all migrated to be using plugins.

  If you are using custom `links` / `policies` / `migrations` you can pass them as props to the `<GraphQLProvider/>` or create your own local plugin. ([@paales](https://github.com/paales))

### Patch Changes

- [#1718](https://github.com/graphcommerce-org/graphcommerce/pull/1718) [`37e86cdc8`](https://github.com/graphcommerce-org/graphcommerce/commit/37e86cdc86ccca3db77d6c59b1e14c8112bb7893) - Remove usage of PropsWithChildren ([@paales](https://github.com/paales))

- [#1738](https://github.com/graphcommerce-org/graphcommerce/pull/1738) [`52882a63e`](https://github.com/graphcommerce-org/graphcommerce/commit/52882a63e96c0d3ba9641c3714d288fa4f420c82) - Do not forward the Prev prop in plugins ([@paales](https://github.com/paales))

## 5.0.0-canary.14

## 5.0.0-canary.13

### Major Changes

- [`e4c7fe17e`](https://github.com/graphcommerce-org/graphcommerce/commit/e4c7fe17e413e37362ceae92e67f1b3a5f62d398) - Bump major version of all packages ([@paales](https://github.com/paales))

## 4.14.0-canary.12

## 4.14.0-canary.11

## 4.14.0-canary.10

## 4.14.0-canary.9

## 4.14.0-canary.8

## 4.14.0-canary.7

### Patch Changes

- [#1738](https://github.com/graphcommerce-org/graphcommerce/pull/1738) [`52882a63e`](https://github.com/graphcommerce-org/graphcommerce/commit/52882a63e96c0d3ba9641c3714d288fa4f420c82) - Do not forward the Prev prop in plugins ([@paales](https://github.com/paales))

## 4.14.0-canary.6

## 4.14.0-canary.5

## 4.14.0-canary.4

### Minor Changes

- [#1733](https://github.com/graphcommerce-org/graphcommerce/pull/1733) [`761bd2832`](https://github.com/graphcommerce-org/graphcommerce/commit/761bd2832f115afc8b95bedbf479266309dd5acc) - ApolloLinks, typePolicies and migration scripts are now handled with plugins on the new library component `<GraphQLProvider/>`. Hygraph's, Magento Cart, Customer, Store, Wishlist and Magento GraphQL are all migrated to be using plugins.

  If you are using custom `links` / `policies` / `migrations` you can pass them as props to the `<GraphQLProvider/>` or create your own local plugin. ([@paales](https://github.com/paales))

## 4.14.0-canary.3

## 4.14.0-canary.2

### Patch Changes

- [#1718](https://github.com/graphcommerce-org/graphcommerce/pull/1718) [`37e86cdc8`](https://github.com/graphcommerce-org/graphcommerce/commit/37e86cdc86ccca3db77d6c59b1e14c8112bb7893) - Remove usage of PropsWithChildren ([@paales](https://github.com/paales))

## 4.13.2-canary.1

## 4.13.2-canary.0

## 4.13.3

## 4.13.2

## 4.13.1

## 4.13.1-canary.2

## 4.13.1-canary.1

## 4.13.1-canary.0

## 4.13.0

### Patch Changes

- [#1702](https://github.com/graphcommerce-org/graphcommerce/pull/1702) [`abb15ef4a`](https://github.com/graphcommerce-org/graphcommerce/commit/abb15ef4a79b12eddb32cc006e5d1d31dd06ac2d) Thanks [@paales](https://github.com/paales)! - Added canary releases to GraphCommerce

## 4.13.0-canary.1

### Patch Changes

- [`abb15ef4a`](https://github.com/graphcommerce-org/graphcommerce/commit/abb15ef4a79b12eddb32cc006e5d1d31dd06ac2d) Thanks [@paales](https://github.com/paales)! - Added canary releases to GraphCommerce

## 4.13.0-canary.0

## 4.12.4

### Patch Changes

- [#1688](https://github.com/graphcommerce-org/graphcommerce/pull/1688) [`e0be98a26`](https://github.com/graphcommerce-org/graphcommerce/commit/e0be98a260882039a59a785f41e26517797307fd) Thanks [@paales](https://github.com/paales)! - After switching locales the countries aren’t reloaded while they are dependent on the storeview

- Updated dependencies [[`8393cb266`](https://github.com/graphcommerce-org/graphcommerce/commit/8393cb2662860be0c2aa5df432447bb73c427d8e), [`f544401c7`](https://github.com/graphcommerce-org/graphcommerce/commit/f544401c7b653fda39c7c260ad0dcfb3bf543b65), [`f105d4223`](https://github.com/graphcommerce-org/graphcommerce/commit/f105d4223aa68df30970149e51ae72897e489bf9)]:
  - @graphcommerce/next-ui@4.29.3
  - @graphcommerce/ecommerce-ui@1.5.8
  - @graphcommerce/magento-store@4.3.6

## 4.12.3

### Patch Changes

- Updated dependencies [[`1953c7e27`](https://github.com/graphcommerce-org/graphcommerce/commit/1953c7e27eb606a825fce1ad361393b3c781c6da)]:
  - @graphcommerce/next-ui@4.29.2
  - @graphcommerce/ecommerce-ui@1.5.7
  - @graphcommerce/magento-store@4.3.5

## 4.12.2

### Patch Changes

- Updated dependencies [[`98d6a9cce`](https://github.com/graphcommerce-org/graphcommerce/commit/98d6a9cce1bb9514088be0af2736721b3edda467)]:
  - @graphcommerce/next-ui@4.29.1
  - @graphcommerce/ecommerce-ui@1.5.6
  - @graphcommerce/magento-store@4.3.4

## 4.12.1

### Patch Changes

- Updated dependencies [[`e76df6dc3`](https://github.com/graphcommerce-org/graphcommerce/commit/e76df6dc37c11c793a5d008ba36932d17dc23855), [`0bd9ea582`](https://github.com/graphcommerce-org/graphcommerce/commit/0bd9ea58230dde79c5fe2cdb07e9860151460270)]:
  - @graphcommerce/next-ui@4.29.0
  - @graphcommerce/ecommerce-ui@1.5.5
  - @graphcommerce/magento-store@4.3.3

## 4.12.0

### Minor Changes

- [#1670](https://github.com/graphcommerce-org/graphcommerce/pull/1670) [`8a34f8081`](https://github.com/graphcommerce-org/graphcommerce/commit/8a34f808186274a6fe1d4f309472f1a9c6d00efd) Thanks [@Jessevdpoel](https://github.com/Jessevdpoel)! - Added cache resetting when token expires and logging in with a different account than cached.

### Patch Changes

- [#1675](https://github.com/graphcommerce-org/graphcommerce/pull/1675) [`1b1504c9b`](https://github.com/graphcommerce-org/graphcommerce/commit/1b1504c9b0e51f2787bce91e1ff1940f540411d6) Thanks [@paales](https://github.com/paales)! - Added crosssel functionality

- Updated dependencies [[`9e630670f`](https://github.com/graphcommerce-org/graphcommerce/commit/9e630670ff6c952ab7b938d890b5509804985cf3), [`cf3518499`](https://github.com/graphcommerce-org/graphcommerce/commit/cf351849999ad6fe73ce2bb258098a7dd301d517), [`2e9fa5984`](https://github.com/graphcommerce-org/graphcommerce/commit/2e9fa5984a07ff14fc1b3a4f62189a26e8e3ecdd), [`adf13069a`](https://github.com/graphcommerce-org/graphcommerce/commit/adf13069af6460c960276b402237371c12fc6dec), [`1b1504c9b`](https://github.com/graphcommerce-org/graphcommerce/commit/1b1504c9b0e51f2787bce91e1ff1940f540411d6), [`8a34f8081`](https://github.com/graphcommerce-org/graphcommerce/commit/8a34f808186274a6fe1d4f309472f1a9c6d00efd), [`6c2e27b1b`](https://github.com/graphcommerce-org/graphcommerce/commit/6c2e27b1be4aaa888e65a2bd69eaeb467a54a023), [`3dde492ad`](https://github.com/graphcommerce-org/graphcommerce/commit/3dde492ad3a49d96481eeb7453fb305d0017b1a5)]:
  - @graphcommerce/next-ui@4.28.1
  - @graphcommerce/graphql@3.5.0
  - @graphcommerce/framer-utils@3.2.1
  - @graphcommerce/ecommerce-ui@1.5.4
  - @graphcommerce/magento-store@4.3.2
  - @graphcommerce/magento-graphql@3.1.9
  - @graphcommerce/image@3.1.10

## 4.11.7

### Patch Changes

- Updated dependencies [[`1f2e14ba8`](https://github.com/graphcommerce-org/graphcommerce/commit/1f2e14ba8b674b87257a123e8cb215157890eb22), [`fc32b9ab3`](https://github.com/graphcommerce-org/graphcommerce/commit/fc32b9ab3818eb99c546a89e7f42045a6fbfba81)]:
  - @graphcommerce/react-hook-form@3.3.5
  - @graphcommerce/ecommerce-ui@1.5.3

## 4.11.6

### Patch Changes

- Updated dependencies [[`0c21c5c23`](https://github.com/graphcommerce-org/graphcommerce/commit/0c21c5c233ebab15f6629c234e3de1cc8c0452e1), [`de8925aa9`](https://github.com/graphcommerce-org/graphcommerce/commit/de8925aa910b191c62041530c68c697a58a1e52d), [`f5eae0afd`](https://github.com/graphcommerce-org/graphcommerce/commit/f5eae0afdbd474b1f81c450425ffadf2d025187a)]:
  - @graphcommerce/next-ui@4.28.0
  - @graphcommerce/ecommerce-ui@1.5.2
  - @graphcommerce/magento-store@4.3.1

## 4.11.5

### Patch Changes

- Updated dependencies [[`75ae24a93`](https://github.com/graphcommerce-org/graphcommerce/commit/75ae24a93bd74e3b9b7efda21ec7ba6fbe9a3a75), [`e5048c5ec`](https://github.com/graphcommerce-org/graphcommerce/commit/e5048c5ec52b83dbe70a246ffdcea65b55a884c6)]:
  - @graphcommerce/react-hook-form@3.3.4
  - @graphcommerce/ecommerce-ui@1.5.1

## 4.11.4

### Patch Changes

- Updated dependencies [[`ad63ebf4e`](https://github.com/graphcommerce-org/graphcommerce/commit/ad63ebf4e33bfb0e5c9e5e68ab69b14775f3f8a8), [`9e6fd498e`](https://github.com/graphcommerce-org/graphcommerce/commit/9e6fd498e3242ab30602767ae77a8e22f80d9fd3)]:
  - @graphcommerce/ecommerce-ui@1.5.0
  - @graphcommerce/magento-store@4.3.0
  - @graphcommerce/next-ui@4.27.0

## 4.11.3

### Patch Changes

- Updated dependencies [[`fad7b6b48`](https://github.com/graphcommerce-org/graphcommerce/commit/fad7b6b48732fd631599c17abd8961de3f49c7dc), [`42e7fac75`](https://github.com/graphcommerce-org/graphcommerce/commit/42e7fac75712f9bda7a6b919ede14b3c75d07771)]:
  - @graphcommerce/ecommerce-ui@1.4.0
  - @graphcommerce/next-ui@4.26.0
  - @graphcommerce/magento-store@4.2.35

## 4.11.2

### Patch Changes

- Updated dependencies [[`dc6237644`](https://github.com/graphcommerce-org/graphcommerce/commit/dc6237644ac349debb728059e4c937cec25bf4fd), [`48273bccd`](https://github.com/graphcommerce-org/graphcommerce/commit/48273bccd2e471ce4bc024a600e693da791f1cde)]:
  - @graphcommerce/next-ui@4.25.0
  - @graphcommerce/ecommerce-ui@1.3.3
  - @graphcommerce/magento-store@4.2.34

## 4.11.1

### Patch Changes

- Updated dependencies [[`104103bc2`](https://github.com/graphcommerce-org/graphcommerce/commit/104103bc2a0fbaa510af2e26b6b00ddc63e8495b), [`4487db309`](https://github.com/graphcommerce-org/graphcommerce/commit/4487db309df01a22f49876cf4a5574ece303a8ca)]:
  - @graphcommerce/next-ui@4.24.0
  - @graphcommerce/graphql-mesh@4.2.0
  - @graphcommerce/ecommerce-ui@1.3.2
  - @graphcommerce/magento-store@4.2.33

## 4.11.0

### Minor Changes

- [#1631](https://github.com/graphcommerce-org/graphcommerce/pull/1631) [`c1b8b0352`](https://github.com/graphcommerce-org/graphcommerce/commit/c1b8b03520532223f7b572ff23f1d368a4dfe306) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - Purge local storage on signout, so no cache is preserved

### Patch Changes

- Updated dependencies [[`662f510c2`](https://github.com/graphcommerce-org/graphcommerce/commit/662f510c21fc44a63036e5c7a0726ccb33c31600)]:
  - @graphcommerce/react-hook-form@3.3.3
  - @graphcommerce/ecommerce-ui@1.3.1

## 4.10.5

### Patch Changes

- [#1579](https://github.com/graphcommerce-org/graphcommerce/pull/1579) [`e8639ec5f`](https://github.com/graphcommerce-org/graphcommerce/commit/e8639ec5f6759504211d70a966f5c348c6b3a7f6) Thanks [@paales](https://github.com/paales)! - New FormComponents added which combines react-hook-form and mui's form components for easier form handling

- Updated dependencies [[`e8639ec5f`](https://github.com/graphcommerce-org/graphcommerce/commit/e8639ec5f6759504211d70a966f5c348c6b3a7f6)]:
  - @graphcommerce/ecommerce-ui@1.3.0

## 4.10.4

### Patch Changes

- Updated dependencies [[`9b84a68a1`](https://github.com/graphcommerce-org/graphcommerce/commit/9b84a68a1e7311a79eb687c7dcee905d3000facf)]:
  - @graphcommerce/next-ui@4.23.1
  - @graphcommerce/ecommerce-ui@1.2.3
  - @graphcommerce/magento-store@4.2.32

## 4.10.3

### Patch Changes

- Updated dependencies [[`396b5de5d`](https://github.com/graphcommerce-org/graphcommerce/commit/396b5de5d50c7b8f59bf636807e7a4b50f14e0b2)]:
  - @graphcommerce/graphql@3.4.8
  - @graphcommerce/magento-graphql@3.1.8
  - @graphcommerce/ecommerce-ui@1.2.2
  - @graphcommerce/magento-store@4.2.31

## 4.10.2

### Patch Changes

- Updated dependencies [[`755d2cf83`](https://github.com/graphcommerce-org/graphcommerce/commit/755d2cf83343a5ad3d61063eff595d821de360aa), [`dc7f2dda4`](https://github.com/graphcommerce-org/graphcommerce/commit/dc7f2dda40ff8572fc11161de6eb62ca13e720dd)]:
  - @graphcommerce/next-ui@4.23.0
  - @graphcommerce/ecommerce-ui@1.2.1
  - @graphcommerce/magento-store@4.2.30

## 4.10.1

### Patch Changes

- Updated dependencies [[`448c77681`](https://github.com/graphcommerce-org/graphcommerce/commit/448c77681f9a7794e84ec93139d7e0f16afafbd9)]:
  - @graphcommerce/graphql-mesh@4.1.9
  - @graphcommerce/magento-store@4.2.29

## 4.10.0

### Minor Changes

- [#1609](https://github.com/graphcommerce-org/graphcommerce/pull/1609) [`0ad5159eb`](https://github.com/graphcommerce-org/graphcommerce/commit/0ad5159ebef54b4ce7fee6f71b4bf710dba9ef8e) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Use WaitForCustomer component

  - Fixes bugs where loaders where shown on all pages that require user to log in

* [#1602](https://github.com/graphcommerce-org/graphcommerce/pull/1602) [`5f781a217`](https://github.com/graphcommerce-org/graphcommerce/commit/5f781a217ce63ed56bc1a9983487b04400a8a315) Thanks [@ErwinOtten](https://github.com/ErwinOtten)! - Default styles and layout fixes

  - Scaled icons and fonts down. Size in typography is now more gradual: https://graphcommerce.vercel.app/test/typography
  - Multiple accessibility fixes. Missing button/input labels, and fixed spacing issues resulting in high % appropriately sized tap targets
  - Replaced responsiveVal usage with better performaning breakpointVal where possible
  - All buttons are now Pill by default.
  - Cleaned up checkout styles

### Patch Changes

- Updated dependencies [[`3ff0e7f2d`](https://github.com/graphcommerce-org/graphcommerce/commit/3ff0e7f2d26edad228848268d24e9aaf56cd2c30), [`04708dacc`](https://github.com/graphcommerce-org/graphcommerce/commit/04708daccc213c6ea927bc67fa3bd0d5b1fad619), [`bb94e7045`](https://github.com/graphcommerce-org/graphcommerce/commit/bb94e7045460cb671c45d612a0833731d7c20c30), [`b0dc4e2e1`](https://github.com/graphcommerce-org/graphcommerce/commit/b0dc4e2e1982d502d38dd50a0f493396360a7a15), [`4a5286dfe`](https://github.com/graphcommerce-org/graphcommerce/commit/4a5286dfeaa1719e594a0078f274fbab53969c4e), [`0ad5159eb`](https://github.com/graphcommerce-org/graphcommerce/commit/0ad5159ebef54b4ce7fee6f71b4bf710dba9ef8e), [`d46d5ed0c`](https://github.com/graphcommerce-org/graphcommerce/commit/d46d5ed0cc5794391b7527fc17bbb68ec2212e33), [`5f781a217`](https://github.com/graphcommerce-org/graphcommerce/commit/5f781a217ce63ed56bc1a9983487b04400a8a315), [`01372b918`](https://github.com/graphcommerce-org/graphcommerce/commit/01372b918a291e01cbf5db40edcb40fb1c2af313)]:
  - @graphcommerce/graphql-mesh@4.1.8
  - @graphcommerce/next-ui@4.22.0
  - @graphcommerce/ecommerce-ui@1.2.0
  - @graphcommerce/framer-utils@3.2.0
  - @graphcommerce/magento-store@4.2.28
  - @graphcommerce/graphql@3.4.7
  - @graphcommerce/image@3.1.9
  - @graphcommerce/magento-graphql@3.1.7

## 4.9.5

### Patch Changes

- Updated dependencies [[`1f7ee6f6c`](https://github.com/graphcommerce-org/graphcommerce/commit/1f7ee6f6cfb28544439ed36e10929ac530d1b2b7), [`707dbc73d`](https://github.com/graphcommerce-org/graphcommerce/commit/707dbc73d181204d88fdbbd2e09340e25b2b5f7b), [`5c5645e6e`](https://github.com/graphcommerce-org/graphcommerce/commit/5c5645e6eaf5314c063f05547707fcd4b34a8717)]:
  - @graphcommerce/next-ui@4.21.0
  - @graphcommerce/framer-utils@3.1.5
  - @graphcommerce/graphql@3.4.6
  - @graphcommerce/graphql-mesh@4.1.7
  - @graphcommerce/ecommerce-ui@1.1.12
  - @graphcommerce/magento-store@4.2.27
  - @graphcommerce/image@3.1.8
  - @graphcommerce/magento-graphql@3.1.6

## 4.9.4

### Patch Changes

- [#1596](https://github.com/graphcommerce-org/graphcommerce/pull/1596) [`3a619b70d`](https://github.com/graphcommerce-org/graphcommerce/commit/3a619b70d082804b8de46a8e8232f9431479a8b7) Thanks [@paales](https://github.com/paales)! - Do not activate the customer session during hydration only in the next step

- Updated dependencies [[`43822fd61`](https://github.com/graphcommerce-org/graphcommerce/commit/43822fd61c949215b8ddce9fb37d09f29b638426), [`3a619b70d`](https://github.com/graphcommerce-org/graphcommerce/commit/3a619b70d082804b8de46a8e8232f9431479a8b7)]:
  - @graphcommerce/next-ui@4.20.0
  - @graphcommerce/ecommerce-ui@1.1.11
  - @graphcommerce/magento-store@4.2.26

## 4.9.3

### Patch Changes

- [#1588](https://github.com/graphcommerce-org/graphcommerce/pull/1588) [`1be392e42`](https://github.com/graphcommerce-org/graphcommerce/commit/1be392e42241d38b0ce1862e8ba184d2b5ec23c3) Thanks [@paales](https://github.com/paales)! - Do not activate the customer session during hydration only in the next step

- Updated dependencies [[`b6d3a3c13`](https://github.com/graphcommerce-org/graphcommerce/commit/b6d3a3c13ea63ef0f691f497507f07c0e094de5b)]:
  - @graphcommerce/next-ui@4.19.0
  - @graphcommerce/ecommerce-ui@1.1.10
  - @graphcommerce/magento-store@4.2.25

## 4.9.2

### Patch Changes

- Updated dependencies [[`6ce2cbaf2`](https://github.com/graphcommerce-org/graphcommerce/commit/6ce2cbaf2cf27e21b753f7cb71e7e74826294de6), [`6ce2cbaf2`](https://github.com/graphcommerce-org/graphcommerce/commit/6ce2cbaf2cf27e21b753f7cb71e7e74826294de6)]:
  - @graphcommerce/graphql@3.4.5
  - @graphcommerce/next-ui@4.18.0
  - @graphcommerce/ecommerce-ui@1.1.9
  - @graphcommerce/magento-graphql@3.1.5
  - @graphcommerce/magento-store@4.2.24

## 4.9.1

### Patch Changes

- Updated dependencies [[`49370878a`](https://github.com/graphcommerce-org/graphcommerce/commit/49370878a48b90a4579026a7c56c54f97840cebb), [`b6ce5548c`](https://github.com/graphcommerce-org/graphcommerce/commit/b6ce5548c66a8ca62d3aee29467045f7f07f30c8)]:
  - @graphcommerce/graphql@3.4.4
  - @graphcommerce/next-ui@4.17.0
  - @graphcommerce/ecommerce-ui@1.1.8
  - @graphcommerce/magento-graphql@3.1.4
  - @graphcommerce/magento-store@4.2.23

## 4.9.0

### Minor Changes

- [#1572](https://github.com/graphcommerce-org/graphcommerce/pull/1572) [`8e3b24500`](https://github.com/graphcommerce-org/graphcommerce/commit/8e3b24500a55fa2a1fb4a3ef08c1f1990a46a0ae) Thanks [@paales](https://github.com/paales)! - Added an WaitForCustomer component to allow for easy wrapping of pages and handle loading of queries, handle errors and make sure the customer is logged in.

### Patch Changes

- [#1572](https://github.com/graphcommerce-org/graphcommerce/pull/1572) [`3c809a3a4`](https://github.com/graphcommerce-org/graphcommerce/commit/3c809a3a438995503f6d2290d6c0bb90fbc489be) Thanks [@paales](https://github.com/paales)! - Make sure the useCustomerSession returns the full query so it can be awaited

* [#1572](https://github.com/graphcommerce-org/graphcommerce/pull/1572) [`2c66cca15`](https://github.com/graphcommerce-org/graphcommerce/commit/2c66cca154098a09445977428983e05fe19b9510) Thanks [@paales](https://github.com/paales)! - useGuestQuery also should accept the hydration prop to allow it to return earlier

- [#1572](https://github.com/graphcommerce-org/graphcommerce/pull/1572) [`2c66cca15`](https://github.com/graphcommerce-org/graphcommerce/commit/2c66cca154098a09445977428983e05fe19b9510) Thanks [@paales](https://github.com/paales)! - useFormIsEmailAvailable now always checks if the email is available to prevent issues with it returning the wrong value.

* [#1572](https://github.com/graphcommerce-org/graphcommerce/pull/1572) [`2c66cca15`](https://github.com/graphcommerce-org/graphcommerce/commit/2c66cca154098a09445977428983e05fe19b9510) Thanks [@paales](https://github.com/paales)! - When an authentication error occurs, remove the invalid token from the storage.

* Updated dependencies [[`02023d8d8`](https://github.com/graphcommerce-org/graphcommerce/commit/02023d8d89c8138144243edce67290bd79ff49a7), [`87a188d6f`](https://github.com/graphcommerce-org/graphcommerce/commit/87a188d6f216b7f7b9ec95afbe74f1146cb07ce4), [`199dc8599`](https://github.com/graphcommerce-org/graphcommerce/commit/199dc859989c376281243b59a59addc35138f119), [`1eb131766`](https://github.com/graphcommerce-org/graphcommerce/commit/1eb131766c32db6fcb0a8e83dba2c3d241658595)]:
  - @graphcommerce/react-hook-form@3.3.2
  - @graphcommerce/next-ui@4.16.0
  - @graphcommerce/ecommerce-ui@1.1.7
  - @graphcommerce/magento-store@4.2.22

## 4.8.3

### Patch Changes

- [#1570](https://github.com/graphcommerce-org/graphcommerce/pull/1570) [`d92780d5c`](https://github.com/graphcommerce-org/graphcommerce/commit/d92780d5c3bb80b5a1519c087338548303e4cc2f) Thanks [@paales](https://github.com/paales)! - Always skip hydration phase by default when running useCurrentCartId / useCustomerSession

- Updated dependencies [[`a88f166f0`](https://github.com/graphcommerce-org/graphcommerce/commit/a88f166f0115c58254fe47171da51a5850658a32)]:
  - @graphcommerce/next-ui@4.15.1
  - @graphcommerce/ecommerce-ui@1.1.6
  - @graphcommerce/magento-store@4.2.21

## 4.8.2

### Patch Changes

- Updated dependencies [[`e167992df`](https://github.com/graphcommerce-org/graphcommerce/commit/e167992dfdc6964a392af719667f8a188626ab1b), [`9c2504b4e`](https://github.com/graphcommerce-org/graphcommerce/commit/9c2504b4ed75f41d3003c4d3339814010e85e37e)]:
  - @graphcommerce/next-ui@4.15.0
  - @graphcommerce/ecommerce-ui@1.1.5
  - @graphcommerce/magento-store@4.2.20

## 4.8.1

### Patch Changes

- [#1557](https://github.com/graphcommerce-org/graphcommerce/pull/1557) [`84428ccab`](https://github.com/graphcommerce-org/graphcommerce/commit/84428ccab8d1d263893766197076651eae68759c) Thanks [@paales](https://github.com/paales)! - Use WaitForQuery component to handle the loading state

- Updated dependencies [[`01f1588c9`](https://github.com/graphcommerce-org/graphcommerce/commit/01f1588c9200bb39dd61146e260bfa2b32060612), [`c0a7f9427`](https://github.com/graphcommerce-org/graphcommerce/commit/c0a7f9427466f0a3886b2c3ebf2f0aa5d79ee081)]:
  - @graphcommerce/graphql-mesh@4.1.6
  - @graphcommerce/graphql@3.4.3
  - @graphcommerce/ecommerce-ui@1.1.4
  - @graphcommerce/magento-store@4.2.19
  - @graphcommerce/magento-graphql@3.1.3

## 4.8.0

### Minor Changes

- [#1553](https://github.com/graphcommerce-org/graphcommerce/pull/1553) [`03d01c06c`](https://github.com/graphcommerce-org/graphcommerce/commit/03d01c06c6dc13df8d38ab5b40bd100c567a9e8d) Thanks [@NickdeK](https://github.com/NickdeK)! - Added a `{ hydrate: boolean }` option to `useCartQuery`, `useCurrentCartId`, `useCustomerQuery` and `useCustomerSession` to allow for data during the hydration phase. This can cause hydration warnings, but prevents an additional rerender.

### Patch Changes

- Updated dependencies [[`1afc6a547`](https://github.com/graphcommerce-org/graphcommerce/commit/1afc6a5473d6e31f47b5d0188801803b31865290), [`4a4579bb2`](https://github.com/graphcommerce-org/graphcommerce/commit/4a4579bb2f7da378f3fcc504405caf2560dc10f6), [`afcd8e4bf`](https://github.com/graphcommerce-org/graphcommerce/commit/afcd8e4bfb7010da4d5faeed85b61991ed7975f4), [`02e1988e5`](https://github.com/graphcommerce-org/graphcommerce/commit/02e1988e5f361c6f66ae30d3bbee38ef2ac062df), [`323fdee4b`](https://github.com/graphcommerce-org/graphcommerce/commit/323fdee4b15ae23e0e84dd0588cb2c6446dcfd50)]:
  - @graphcommerce/graphql@3.4.2
  - @graphcommerce/react-hook-form@3.3.1
  - @graphcommerce/next-ui@4.14.0
  - @graphcommerce/ecommerce-ui@1.1.3
  - @graphcommerce/magento-graphql@3.1.2
  - @graphcommerce/magento-store@4.2.18

## 4.7.2

### Patch Changes

- [#1552](https://github.com/graphcommerce-org/graphcommerce/pull/1552) [`18054c441`](https://github.com/graphcommerce-org/graphcommerce/commit/18054c441962ba750bed3acc39ab46c8d3a341ce) Thanks [@paales](https://github.com/paales)! - Updated to Next.js v12.2.2 and other packages and made compatible

- Updated dependencies [[`18054c441`](https://github.com/graphcommerce-org/graphcommerce/commit/18054c441962ba750bed3acc39ab46c8d3a341ce), [`c5c539c44`](https://github.com/graphcommerce-org/graphcommerce/commit/c5c539c44eeac524cd62ce649e132d2e00333794), [`6f69bc54c`](https://github.com/graphcommerce-org/graphcommerce/commit/6f69bc54c6e0224452817c532ae58d9c332b61ea), [`21886d6fa`](https://github.com/graphcommerce-org/graphcommerce/commit/21886d6fa64a48d9e932bfaf8d138c9b13c36e43)]:
  - @graphcommerce/graphql@3.4.1
  - @graphcommerce/graphql-mesh@4.1.5
  - @graphcommerce/next-ui@4.13.1
  - @graphcommerce/ecommerce-ui@1.1.2
  - @graphcommerce/magento-graphql@3.1.1
  - @graphcommerce/magento-store@4.2.17

## 4.7.1

### Patch Changes

- Updated dependencies [[`8d8fda262`](https://github.com/graphcommerce-org/graphcommerce/commit/8d8fda2623e561cb43441110c67ffa34b692668a), [`d41cff721`](https://github.com/graphcommerce-org/graphcommerce/commit/d41cff7211230561ceeb7786cf75790efd6377cd), [`cefa7b365`](https://github.com/graphcommerce-org/graphcommerce/commit/cefa7b3652b55108d2178927e3c5d98a111cf373)]:
  - @graphcommerce/next-ui@4.13.0
  - @graphcommerce/magento-store@4.2.16
  - @graphcommerce/ecommerce-ui@1.1.1

## 4.7.0

### Minor Changes

- [#1544](https://github.com/graphcommerce-org/graphcommerce/pull/1544) [`5f927ebdc`](https://github.com/graphcommerce-org/graphcommerce/commit/5f927ebdc6f0331833e02b96e4f169bfe475ac6b) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - Fixed hydration errors on account, cart and wishlist

### Patch Changes

- [#1545](https://github.com/graphcommerce-org/graphcommerce/pull/1545) [`c87a28e7d`](https://github.com/graphcommerce-org/graphcommerce/commit/c87a28e7dad87bffd0bd125ad5fdca65aaa389cc) Thanks [@paales](https://github.com/paales)! - Faster hydration with useLayoutEffect

- Updated dependencies [[`5f927ebdc`](https://github.com/graphcommerce-org/graphcommerce/commit/5f927ebdc6f0331833e02b96e4f169bfe475ac6b), [`c756f42e5`](https://github.com/graphcommerce-org/graphcommerce/commit/c756f42e503761a497e4a5a7a02d02141df231c3)]:
  - @graphcommerce/ecommerce-ui@1.1.0
  - @graphcommerce/graphql@3.4.0
  - @graphcommerce/magento-graphql@3.1.0
  - @graphcommerce/react-hook-form@3.3.0
  - @graphcommerce/next-ui@4.12.0
  - @graphcommerce/magento-store@4.2.15

## 4.6.3

### Patch Changes

- [#1538](https://github.com/graphcommerce-org/graphcommerce/pull/1538) [`fe4baa42d`](https://github.com/graphcommerce-org/graphcommerce/commit/fe4baa42db0081ed960d62aef688bd36a7ac974f) Thanks [@paales](https://github.com/paales)! - add missing translations

- Updated dependencies [[`fe4baa42d`](https://github.com/graphcommerce-org/graphcommerce/commit/fe4baa42db0081ed960d62aef688bd36a7ac974f)]:
  - @graphcommerce/next-ui@4.11.2
  - @graphcommerce/ecommerce-ui@1.0.23
  - @graphcommerce/magento-store@4.2.14

## 4.6.2

### Patch Changes

- Updated dependencies [[`11bca2d2f`](https://github.com/graphcommerce-org/graphcommerce/commit/11bca2d2f7dbb7c5e2827c04eb0db43d4099f2fd)]:
  - @graphcommerce/next-ui@4.11.1
  - @graphcommerce/ecommerce-ui@1.0.22
  - @graphcommerce/magento-store@4.2.13

## 4.6.1

### Patch Changes

- Updated dependencies [[`9ec0338df`](https://github.com/graphcommerce-org/graphcommerce/commit/9ec0338dfe34d37b0f2c24e36ffa6ed13ea1145e), [`735b78672`](https://github.com/graphcommerce-org/graphcommerce/commit/735b786724d5401cbe6e88f2515e121a1a0945b2)]:
  - @graphcommerce/next-ui@4.11.0
  - @graphcommerce/magento-store@4.2.12
  - @graphcommerce/graphql@3.3.0
  - @graphcommerce/ecommerce-ui@1.0.21
  - @graphcommerce/magento-graphql@3.0.15

## 4.6.0

### Minor Changes

- [#1526](https://github.com/graphcommerce-org/graphcommerce/pull/1526) [`98ff2334d`](https://github.com/graphcommerce-org/graphcommerce/commit/98ff2334d1b7dedb8bc56ebe6abb50836eefedd3) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - Removed form persistance for isEmailAvailableForm that prevented the user from logging in after sign up

## 4.5.4

### Patch Changes

- [#1517](https://github.com/graphcommerce-org/graphcommerce/pull/1517) [`c877e438a`](https://github.com/graphcommerce-org/graphcommerce/commit/c877e438a48f30204fa3e36b611906a546e1cf5c) Thanks [@NickdeK](https://github.com/NickdeK)! - Fixed graphql error display

- Updated dependencies [[`371e6cf52`](https://github.com/graphcommerce-org/graphcommerce/commit/371e6cf52916a3b6c44192bd40cc8271bd608832), [`4143483f3`](https://github.com/graphcommerce-org/graphcommerce/commit/4143483f37c038d2bbf218be2685e27a31a35745)]:
  - @graphcommerce/next-ui@4.10.0
  - @graphcommerce/ecommerce-ui@1.0.20
  - @graphcommerce/magento-store@4.2.11

## 4.5.3

### Patch Changes

- [#1511](https://github.com/graphcommerce-org/graphcommerce/pull/1511) [`8a626ecf7`](https://github.com/graphcommerce-org/graphcommerce/commit/8a626ecf7ed00c46a28088e0b9bae00a4e1ae019) Thanks [@paales](https://github.com/paales)! - make sure useCustomerQuery only runs when the user is actually logged instead of only a token

* [#1490](https://github.com/graphcommerce-org/graphcommerce/pull/1490) [`d311ef48b`](https://github.com/graphcommerce-org/graphcommerce/commit/d311ef48bb3e97806d992af5516d6b7f183ec9cb) Thanks [@paales](https://github.com/paales)! - upgraded packages

* Updated dependencies [[`a9213f1f5`](https://github.com/graphcommerce-org/graphcommerce/commit/a9213f1f5a410d217768386ccb6d9b5ce7bd5782), [`d311ef48b`](https://github.com/graphcommerce-org/graphcommerce/commit/d311ef48bb3e97806d992af5516d6b7f183ec9cb)]:
  - @graphcommerce/next-ui@4.9.0
  - @graphcommerce/ecommerce-ui@1.0.19
  - @graphcommerce/graphql@3.2.1
  - @graphcommerce/graphql-mesh@4.1.4
  - @graphcommerce/image@3.1.7
  - @graphcommerce/magento-graphql@3.0.14
  - @graphcommerce/magento-store@4.2.10
  - @graphcommerce/react-hook-form@3.2.2

## 4.5.2

### Patch Changes

- [#1509](https://github.com/graphcommerce-org/graphcommerce/pull/1509) [`711fa6e04`](https://github.com/graphcommerce-org/graphcommerce/commit/711fa6e04519bbe91825fec7e1714277c1a8fa68) Thanks [@paales](https://github.com/paales)! - onAuthenticationError fix thrown exception on error handling

- Updated dependencies [[`0ab7c5465`](https://github.com/graphcommerce-org/graphcommerce/commit/0ab7c5465441cba9bf8cd185a6790ce2f443f4ed)]:
  - @graphcommerce/next-ui@4.8.4
  - @graphcommerce/ecommerce-ui@1.0.18
  - @graphcommerce/magento-store@4.2.9

## 4.5.1

### Patch Changes

- [#1499](https://github.com/graphcommerce-org/graphcommerce/pull/1499) [`d205b037f`](https://github.com/graphcommerce-org/graphcommerce/commit/d205b037fee82b8c03993f2c586f477e826093bf) Thanks [@paales](https://github.com/paales)! - Unified and simplified the customer authentication error handling

## 4.5.0

### Minor Changes

- [#1492](https://github.com/graphcommerce-org/graphcommerce/pull/1492) [`bed806ddd`](https://github.com/graphcommerce-org/graphcommerce/commit/bed806dddd7e025806a69798ef9587aa165d392f) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - Removed useExtractCustomerErrors hook and implemented error handling via HttpLink Error

### Patch Changes

- Updated dependencies [[`ffec8800a`](https://github.com/graphcommerce-org/graphcommerce/commit/ffec8800a50ff2fe9b9fc5feeb5a0a878b573f0e), [`bed806ddd`](https://github.com/graphcommerce-org/graphcommerce/commit/bed806dddd7e025806a69798ef9587aa165d392f)]:
  - @graphcommerce/react-hook-form@3.2.1
  - @graphcommerce/graphql@3.2.0
  - @graphcommerce/ecommerce-ui@1.0.17
  - @graphcommerce/magento-graphql@3.0.13
  - @graphcommerce/magento-store@4.2.8

## 4.4.2

### Patch Changes

- Updated dependencies [[`858a3b3a3`](https://github.com/graphcommerce-org/graphcommerce/commit/858a3b3a3601cd00491219daf45557c2f1cc804b)]:
  - @graphcommerce/react-hook-form@3.2.0
  - @graphcommerce/ecommerce-ui@1.0.16

## 4.4.1

### Patch Changes

- [#1487](https://github.com/graphcommerce-org/graphcommerce/pull/1487) [`238aa4d34`](https://github.com/graphcommerce-org/graphcommerce/commit/238aa4d3478773b8cb0973f4112c9829e59e16d6) Thanks [@paales](https://github.com/paales)! - When @injecting mandatory fields into the CustomerTokenFragment it would throw a typescript error.

- Updated dependencies [[`afc67103d`](https://github.com/graphcommerce-org/graphcommerce/commit/afc67103d0e00583e274465036fd287537f95e79)]:
  - @graphcommerce/next-ui@4.8.3
  - @graphcommerce/ecommerce-ui@1.0.15
  - @graphcommerce/magento-store@4.2.7

## 4.4.0

### Minor Changes

- [#1485](https://github.com/graphcommerce-org/graphcommerce/pull/1485) [`d6262de71`](https://github.com/graphcommerce-org/graphcommerce/commit/d6262de71d2254a2b0b492e1a60f9e141767470e) Thanks [@paales](https://github.com/paales)! - move to useCustomerSession instead of using the tokenquery directly and fix ssr issues

### Patch Changes

- Updated dependencies [[`c8c246b8a`](https://github.com/graphcommerce-org/graphcommerce/commit/c8c246b8aaab0621b68a2fca2a1c529a56fad962)]:
  - @graphcommerce/next-ui@4.8.2
  - @graphcommerce/ecommerce-ui@1.0.14
  - @graphcommerce/magento-store@4.2.6

## 4.3.2

### Patch Changes

- Updated dependencies [[`a9df81310`](https://github.com/graphcommerce-org/graphcommerce/commit/a9df81310c051876dd82fb2819105dece47cc213), [`f167f9963`](https://github.com/graphcommerce-org/graphcommerce/commit/f167f99630966a7de43717937d43669e66132494)]:
  - @graphcommerce/next-ui@4.8.1
  - @graphcommerce/ecommerce-ui@1.0.13
  - @graphcommerce/magento-store@4.2.5
  - @graphcommerce/image@3.1.6

## 4.3.1

### Patch Changes

- [#1476](https://github.com/graphcommerce-org/graphcommerce/pull/1476) [`a12db31b9`](https://github.com/graphcommerce-org/graphcommerce/commit/a12db31b9db9d27d86f59c1bfe58a0879999b9d3) Thanks [@paales](https://github.com/paales)! - make sure the SignUp and SignIn forms can handle changes to the email field

## 4.3.0

### Minor Changes

- [#1463](https://github.com/graphcommerce-org/graphcommerce/pull/1463) [`7159d3ab3`](https://github.com/graphcommerce-org/graphcommerce/commit/7159d3ab31e937c9c921023c46e80db5813e789c) Thanks [@paales](https://github.com/paales)! - Make the CustomerToken injectable

* [#1466](https://github.com/graphcommerce-org/graphcommerce/pull/1466) [`ed2b67a06`](https://github.com/graphcommerce-org/graphcommerce/commit/ed2b67a0618d9db97e79ed2a8226e0ae12403943) Thanks [@FrankHarland](https://github.com/FrankHarland)! - Added a new useCustomerSession hook to allow for more fine grained control over loading data for customers.

### Patch Changes

- [#1466](https://github.com/graphcommerce-org/graphcommerce/pull/1466) [`00f6167ff`](https://github.com/graphcommerce-org/graphcommerce/commit/00f6167ff4096bf7432f3d8e8e739ecbf6ab0dd2) Thanks [@FrankHarland](https://github.com/FrankHarland)! - Signing in requested client fields which weren't available on the server

* [#1465](https://github.com/graphcommerce-org/graphcommerce/pull/1465) [`32370574b`](https://github.com/graphcommerce-org/graphcommerce/commit/32370574bef6345b857ae911049ca27a64bc7e08) Thanks [@paales](https://github.com/paales)! - make sure the createCustomerV2 also marks the currenly registered email as known and also check the network if an email exists

- [#1461](https://github.com/graphcommerce-org/graphcommerce/pull/1461) [`4c146c682`](https://github.com/graphcommerce-org/graphcommerce/commit/4c146c68242e6edc616807fb73173cc959c26034) Thanks [@mikekeehnen](https://github.com/mikekeehnen)! - User is now able to change their email after the email check. Before the submit, the emailaddress gets checked from the props

- Updated dependencies [[`0363b9671`](https://github.com/graphcommerce-org/graphcommerce/commit/0363b9671db7c2932321d97faf6f1eb385238397), [`3ac90b57c`](https://github.com/graphcommerce-org/graphcommerce/commit/3ac90b57c68b96f9d81771d6664ed9435a28fc1d)]:
  - @graphcommerce/next-ui@4.8.0
  - @graphcommerce/ecommerce-ui@1.0.12
  - @graphcommerce/magento-store@4.2.4

## 4.2.12

### Patch Changes

- Updated dependencies [[`c30893857`](https://github.com/graphcommerce-org/graphcommerce/commit/c3089385791291e812a48c2691a39a2325ee0439)]:
  - @graphcommerce/magento-store@4.2.3

## 4.2.11

### Patch Changes

- [#1451](https://github.com/graphcommerce-org/graphcommerce/pull/1451) [`f698ff85d`](https://github.com/graphcommerce-org/graphcommerce/commit/f698ff85df6bb0922288471bb3c81856091b8061) Thanks [@paales](https://github.com/paales)! - Removed all occurences of @lingui/macro and moved to @lingui/macro / @lingui/core in preparation to move to swc.

  Since we've removed @lingui/macro, all occurences need to be replaced with @lingui/core and @lingui/react.

  All occurences of `<Trans>` and `t` need to be replaced:

  ```tsx
  import { Trans, t } from '@lingui/macro'

  function MyComponent() {
    const foo = 'bar'
    return (
      <div aria-label={t`Account ${foo}`}>
        <Trans>My Translation {foo}</Trans>
      </div>
    )
  }
  ```

  Needs to be replaced with:

  ```tsx
  import { Trans } from '@lingui/react'
  import { i18n } from '@lingui/core'

  function MyComponent() {
    const foo = 'bar'
    return (
      <div aria-label={i18n._(/* i18n */ `Account {foo}`, { foo })}>
        <Trans key='My Translation {foo}' values={{ foo }}></Trans>
      </div>
    )
  }
  ```

  [More examples for Trans](https://lingui.js.org/ref/macro.html#examples-of-jsx-macros) and [more examples for `t`](https://lingui.js.org/ref/macro.html#examples-of-js-macros)

- Updated dependencies [[`50188e378`](https://github.com/graphcommerce-org/graphcommerce/commit/50188e378b4c77561ebc600958ea11cd114fa61a), [`f698ff85d`](https://github.com/graphcommerce-org/graphcommerce/commit/f698ff85df6bb0922288471bb3c81856091b8061)]:
  - @graphcommerce/react-hook-form@3.1.3
  - @graphcommerce/ecommerce-ui@1.0.11
  - @graphcommerce/magento-store@4.2.2
  - @graphcommerce/next-ui@4.7.2
  - @graphcommerce/graphql@3.1.3
  - @graphcommerce/magento-graphql@3.0.12

## 4.2.10

### Patch Changes

- Updated dependencies [[`7618f86da`](https://github.com/graphcommerce-org/graphcommerce/commit/7618f86da930929b10b6baf145646356b1bb3793)]:
  - @graphcommerce/magento-graphql@3.0.11

## 4.2.9

### Patch Changes

- [#1432](https://github.com/graphcommerce-org/graphcommerce/pull/1432) [`80e30bb77`](https://github.com/graphcommerce-org/graphcommerce/commit/80e30bb77015755fbc00a7935d590f80c1c1c18c) Thanks [@paales](https://github.com/paales)! - Updated translations

- Updated dependencies [[`25ef6cf08`](https://github.com/graphcommerce-org/graphcommerce/commit/25ef6cf08c278105307d6f604b7135d637e9046c), [`80e30bb77`](https://github.com/graphcommerce-org/graphcommerce/commit/80e30bb77015755fbc00a7935d590f80c1c1c18c)]:
  - @graphcommerce/graphql@3.1.2
  - @graphcommerce/graphql-mesh@4.1.3
  - @graphcommerce/ecommerce-ui@1.0.10
  - @graphcommerce/magento-graphql@3.0.10
  - @graphcommerce/magento-store@4.2.1
  - @graphcommerce/next-ui@4.7.1

## 4.2.8

### Patch Changes

- Updated dependencies [[`f3d06dd83`](https://github.com/graphcommerce-org/graphcommerce/commit/f3d06dd836c9a76412b419d4d2c79bbd0ee92e04)]:
  - @graphcommerce/magento-store@4.2.0
  - @graphcommerce/next-ui@4.7.0
  - @graphcommerce/ecommerce-ui@1.0.9

## 4.2.7

### Patch Changes

- Updated dependencies [[`e58df7278`](https://github.com/graphcommerce-org/graphcommerce/commit/e58df727829a12941e7b2ae2159ee2233969493c), [`ba8cd4d34`](https://github.com/graphcommerce-org/graphcommerce/commit/ba8cd4d3480a7ec7e555b051cfd0fbc809c7aa12)]:
  - @graphcommerce/magento-graphql@3.0.9
  - @graphcommerce/graphql-mesh@4.1.2
  - @graphcommerce/magento-store@4.1.9

## 4.2.6

### Patch Changes

- Updated dependencies [[`06f7bdff8`](https://github.com/graphcommerce-org/graphcommerce/commit/06f7bdff882396f2b0e1a2873fbb718c7b06fab4), [`100f4c38c`](https://github.com/graphcommerce-org/graphcommerce/commit/100f4c38c8fcda4bc6e0425e38028b550b60adc2)]:
  - @graphcommerce/graphql-mesh@4.1.1
  - @graphcommerce/graphql@3.1.1
  - @graphcommerce/next-ui@4.6.2
  - @graphcommerce/react-hook-form@3.1.2
  - @graphcommerce/magento-store@4.1.8
  - @graphcommerce/ecommerce-ui@1.0.8
  - @graphcommerce/magento-graphql@3.0.8

## 4.2.5

### Patch Changes

- [#1412](https://github.com/graphcommerce-org/graphcommerce/pull/1412) [`d8906cf4a`](https://github.com/graphcommerce-org/graphcommerce/commit/d8906cf4afbfc234aedd91a2c581f82623267357) Thanks [@FrankHarland](https://github.com/FrankHarland)! - add missing translation components

## 4.2.4

### Patch Changes

- [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542) Thanks [@paales](https://github.com/paales)! - Now using [@graphql-yoga](https://github.com/dotansimha/graphql-yoga) for GraphQL which has full support for [envelop](https://www.envelop.dev/) plugins.

* [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542) Thanks [@paales](https://github.com/paales)! - Added a new @graphcommerce/cli package to generate the mesh so it can be generated _inside_ the @graphcommerce/graphql-mesh package to allow for better future extensibility.

- [#1399](https://github.com/graphcommerce-org/graphcommerce/pull/1399) [`da0ae7d02`](https://github.com/graphcommerce-org/graphcommerce/commit/da0ae7d0236e4908ba0bf0fa16656be516e841d4) Thanks [@paales](https://github.com/paales)! - Updated dependencies

- Updated dependencies [[`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542), [`fb277d8e1`](https://github.com/graphcommerce-org/graphcommerce/commit/fb277d8e1e3612c5e9cf890a30d19cfd1ff70542), [`da0ae7d02`](https://github.com/graphcommerce-org/graphcommerce/commit/da0ae7d0236e4908ba0bf0fa16656be516e841d4)]:
  - @graphcommerce/graphql@3.1.0
  - @graphcommerce/graphql-mesh@4.1.0
  - @graphcommerce/magento-graphql@3.0.7
  - @graphcommerce/magento-store@4.1.7
  - @graphcommerce/next-ui@4.6.1
  - @graphcommerce/react-hook-form@3.1.1
  - @graphcommerce/ecommerce-ui@1.0.7
  - @graphcommerce/image@3.1.5

## 4.2.3

### Patch Changes

- [#1397](https://github.com/graphcommerce-org/graphcommerce/pull/1397) [`4169b8c68`](https://github.com/graphcommerce-org/graphcommerce/commit/4169b8c686f682ff6e981b029f13abd87fd5f52a) Thanks [@FrankHarland](https://github.com/FrankHarland)! - fix: if recent order images > 1, images now actually show

## 4.2.2

### Patch Changes

- Updated dependencies [[`3c801f45c`](https://github.com/graphcommerce-org/graphcommerce/commit/3c801f45c7df55131acf30ae2fe0d2344830d480), [`3192fab82`](https://github.com/graphcommerce-org/graphcommerce/commit/3192fab82560e2211dfcacadc3b0b305260527d8), [`104abd14e`](https://github.com/graphcommerce-org/graphcommerce/commit/104abd14e1585ef0d8de77937d25156b8fa1e201), [`0e425e85e`](https://github.com/graphcommerce-org/graphcommerce/commit/0e425e85ee8fed280349317ee0440c7bceea5823), [`2a125b1f9`](https://github.com/graphcommerce-org/graphcommerce/commit/2a125b1f98bb9272d96c3577f21d6c984caad892), [`8a354d1cd`](https://github.com/graphcommerce-org/graphcommerce/commit/8a354d1cd4757497ddfc9b1969a0addbc8ff616b)]:
  - @graphcommerce/next-ui@4.6.0
  - @graphcommerce/react-hook-form@3.1.0
  - @graphcommerce/image@3.1.4
  - @graphcommerce/ecommerce-ui@1.0.6
  - @graphcommerce/magento-store@4.1.6

## 4.2.1

### Patch Changes

- [#1378](https://github.com/graphcommerce-org/graphcommerce/pull/1378) [`b610a6e40`](https://github.com/graphcommerce-org/graphcommerce/commit/b610a6e4049e8c9e8b5d2aeff31b8e1bfc24abe5) Thanks [@paales](https://github.com/paales)! - Pin all versions internally so we can’t end up in an unfixable state for the user

- Updated dependencies [[`b610a6e40`](https://github.com/graphcommerce-org/graphcommerce/commit/b610a6e4049e8c9e8b5d2aeff31b8e1bfc24abe5), [`22ff9df16`](https://github.com/graphcommerce-org/graphcommerce/commit/22ff9df1677742ae8e07d9b7e5b12fbb487580dc)]:
  - @graphcommerce/ecommerce-ui@1.0.5
  - @graphcommerce/graphql@3.0.7
  - @graphcommerce/image@3.1.3
  - @graphcommerce/magento-graphql@3.0.6
  - @graphcommerce/magento-store@4.1.5
  - @graphcommerce/next-ui@4.5.1
  - @graphcommerce/react-hook-form@3.0.7

## 4.2.0

### Minor Changes

- [#1368](https://github.com/graphcommerce-org/graphcommerce/pull/1368) [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a) Thanks [@paales](https://github.com/paales)! - Add a feature to set CUSTOMER_REQUIRE_EMAIL_CONFIRMATION in the env

### Patch Changes

- [#1369](https://github.com/graphcommerce-org/graphcommerce/pull/1369) [`ae6449502`](https://github.com/graphcommerce-org/graphcommerce/commit/ae64495024a455bbe5188588604368c1542840c9) Thanks [@paales](https://github.com/paales)! - Upgraded dependencies

* [#1362](https://github.com/graphcommerce-org/graphcommerce/pull/1362) [`6213f0b0f`](https://github.com/graphcommerce-org/graphcommerce/commit/6213f0b0f5f53d622b993d9f7ea96cbbeb5bd670) Thanks [@timhofman](https://github.com/timhofman)! - persistence layer not purged at logout

* Updated dependencies [[`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`ae6449502`](https://github.com/graphcommerce-org/graphcommerce/commit/ae64495024a455bbe5188588604368c1542840c9), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a), [`892018809`](https://github.com/graphcommerce-org/graphcommerce/commit/8920188093d0422ec50580e408dc28ac5f93e46a)]:
  - @graphcommerce/graphql@3.0.6
  - @graphcommerce/next-ui@4.5.0
  - @graphcommerce/ecommerce-ui@1.0.4
  - @graphcommerce/image@3.1.2
  - @graphcommerce/magento-graphql@3.0.5
  - @graphcommerce/magento-store@4.1.4
  - @graphcommerce/react-hook-form@3.0.6

## 4.1.6

### Patch Changes

- [#1353](https://github.com/graphcommerce-org/graphcommerce/pull/1353) [`0e5ee7ba8`](https://github.com/graphcommerce-org/graphcommerce/commit/0e5ee7ba89698e5e711001e846ed182528060cba) Thanks [@paales](https://github.com/paales)! - Eslint: enable rules that were previously disabled and make fixes

- Updated dependencies [[`49a2d6617`](https://github.com/graphcommerce-org/graphcommerce/commit/49a2d661712e1787fba46c6195f7b559189e23d9), [`f67da3cfb`](https://github.com/graphcommerce-org/graphcommerce/commit/f67da3cfbe2dcf5ea23519d088c5aa0074029182), [`218766869`](https://github.com/graphcommerce-org/graphcommerce/commit/218766869f7468c067a590857c942f3819f8add4), [`0e5ee7ba8`](https://github.com/graphcommerce-org/graphcommerce/commit/0e5ee7ba89698e5e711001e846ed182528060cba), [`829b8690b`](https://github.com/graphcommerce-org/graphcommerce/commit/829b8690bc5d0a46e596299e4120e9837a9f179c)]:
  - @graphcommerce/next-ui@4.4.0

## 4.1.5

### Patch Changes

- [#1322](https://github.com/graphcommerce-org/graphcommerce/pull/1322) [`3b4d46de2`](https://github.com/graphcommerce-org/graphcommerce/commit/3b4d46de2555db9eed733c8fac574bc809d75da4) Thanks [@paales](https://github.com/paales)! - CustomerMenuFabItem badge was rendered with the wrong size

- Updated dependencies [[`5266388ea`](https://github.com/graphcommerce-org/graphcommerce/commit/5266388eaffda41592623ef7a3ddbbe03c8e0dad), [`9b35403d9`](https://github.com/graphcommerce-org/graphcommerce/commit/9b35403d9dbb2606ac7cf3bb641a0f9cc3d8a2ba), [`0298a0de1`](https://github.com/graphcommerce-org/graphcommerce/commit/0298a0de1d13e543c4124a6a099297b4e27e2b05), [`815132ea4`](https://github.com/graphcommerce-org/graphcommerce/commit/815132ea43937b4b84b59ec9974ac593cb4eb456), [`3326742a0`](https://github.com/graphcommerce-org/graphcommerce/commit/3326742a0dceb45f0cac4741ca09dc4d4f09ad90), [`7a3799bfc`](https://github.com/graphcommerce-org/graphcommerce/commit/7a3799bfc107f26aa9991a91db5f228e3476f4aa), [`9a77f88ed`](https://github.com/graphcommerce-org/graphcommerce/commit/9a77f88ed26cbecdae9a135c3cb234a5b7ecf4df), [`0eeaad304`](https://github.com/graphcommerce-org/graphcommerce/commit/0eeaad30461b1d5b486438f0287fa76d49429044), [`bc5213547`](https://github.com/graphcommerce-org/graphcommerce/commit/bc52135471479c83d989449dad24798112e898f4), [`3f1912f55`](https://github.com/graphcommerce-org/graphcommerce/commit/3f1912f553318d5888f8af2b841918ef4ae96a84), [`b6c68cda8`](https://github.com/graphcommerce-org/graphcommerce/commit/b6c68cda8836a1d0c78ef351899cec9ec1037385)]:
  - @graphcommerce/next-ui@4.3.0
  - @graphcommerce/magento-store@4.1.3

## 4.1.4

### Patch Changes

- [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655) Thanks [@paales](https://github.com/paales)! - All default exports are now named exports internally and all `index.tsx` are renamed to the component name.

* [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

* Updated dependencies [[`3d63b39f7`](https://github.com/ho-nl/m2-pwa/commit/3d63b39f7e330d1827a32dba782667d7b21adaba), [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655), [`27cb1f2d8`](https://github.com/ho-nl/m2-pwa/commit/27cb1f2d8dbfb8f1b301ce56fb6a2b6c1fc6a5ef)]:
  - @graphcommerce/next-ui@4.2.4
  - @graphcommerce/ecommerce-ui@1.0.3
  - @graphcommerce/graphql@3.0.4
  - @graphcommerce/image@3.1.1
  - @graphcommerce/magento-graphql@3.0.4
  - @graphcommerce/magento-store@4.1.2
  - @graphcommerce/react-hook-form@3.0.4

## 4.1.3

### Patch Changes

- [#1292](https://github.com/ho-nl/m2-pwa/pull/1292) [`5a1ba9e66`](https://github.com/ho-nl/m2-pwa/commit/5a1ba9e664abbac89c4f5f71f7d6d6ed1aefa5c0) Thanks [@paales](https://github.com/paales)! - Renamed SvgIcon to IconSvg to prevent collisions with MUI

- Updated dependencies [[`5a1ba9e66`](https://github.com/ho-nl/m2-pwa/commit/5a1ba9e664abbac89c4f5f71f7d6d6ed1aefa5c0), [`990df655b`](https://github.com/ho-nl/m2-pwa/commit/990df655b73b469718d6cb5837ee65dfe2ad6a1d), [`63f9b56eb`](https://github.com/ho-nl/m2-pwa/commit/63f9b56eb68ba790567ff1427e599fd2c3c8f1ee)]:
  - @graphcommerce/ecommerce-ui@1.0.2
  - @graphcommerce/next-ui@4.2.0

## 4.1.2

### Patch Changes

- [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96) Thanks [@paales](https://github.com/paales)! - made packages public

- Updated dependencies [[`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96), [`81ea406d5`](https://github.com/ho-nl/m2-pwa/commit/81ea406d54d6b5c662c030a7fea444abc4117a20), [`3a719c88c`](https://github.com/ho-nl/m2-pwa/commit/3a719c88cad1eab58602de28c41adc0fc4827e1d), [`5ffcb56bf`](https://github.com/ho-nl/m2-pwa/commit/5ffcb56bfcbe49ebeaf24f9341e819a145ab9a14)]:
  - @graphcommerce/ecommerce-ui@1.0.1
  - @graphcommerce/graphql@3.0.3
  - @graphcommerce/image@3.1.0
  - @graphcommerce/magento-graphql@3.0.3
  - @graphcommerce/magento-store@4.0.3
  - @graphcommerce/next-ui@4.1.2
  - @graphcommerce/react-hook-form@3.0.3

## 4.1.1

### Patch Changes

- [#1274](https://github.com/ho-nl/m2-pwa/pull/1274) [`381e4c86a`](https://github.com/ho-nl/m2-pwa/commit/381e4c86a8321ce96e1fa5c7d3c0a0c0ff3e02c7) Thanks [@paales](https://github.com/paales)! - Moved `ApolloErrorAlert`, `ApolloErrorFullPage` and `ApolloErrorSnackbar` to the ecommerce-ui package.

  Created `ComposedSubmitButton` and `ComposedSubmitLinkOrButton` to reduce complexity from `magento-graphcms` example.

  Removed dependency an `@graphcommerce/react-hook-form` from `magento-graphcms` example.

  Added dependency `@graphcommerce/ecommerce-ui` from `magento-graphcms` example.

* [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2) Thanks [@paales](https://github.com/paales)! - We've moved lots of internal packages from `dependencies` to `peerDependencies`. The result of this is that there will be significantly less duplicate packages in the node_modules folders.

- [#1274](https://github.com/ho-nl/m2-pwa/pull/1274) [`b08a8eb1d`](https://github.com/ho-nl/m2-pwa/commit/b08a8eb1d024b9d3e7712ef034029151670db275) Thanks [@paales](https://github.com/paales)! - Fixed extraction of translations and updated various translations for english 🇺🇸🇬🇧 and dutch 🇳🇱

* [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d) Thanks [@paales](https://github.com/paales)! - Upgraded to [NextJS 12.1](https://nextjs.org/blog/next-12-1)! This is just for compatibility, but we'll be implementing [On-demand Incremental Static Regeneration](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta) soon.

  This will greatly reduce the requirement to rebuid stuff and we'll add a management UI on the frontend to be able to revalidate pages manually.

* Updated dependencies [[`381e4c86a`](https://github.com/ho-nl/m2-pwa/commit/381e4c86a8321ce96e1fa5c7d3c0a0c0ff3e02c7), [`351347afe`](https://github.com/ho-nl/m2-pwa/commit/351347afeae5bd837408d46c7593bcf5473dc621), [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2), [`e7c8e2756`](https://github.com/ho-nl/m2-pwa/commit/e7c8e2756d637cbcd2e793d62ef5721d35d9fa7b), [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d)]:
  - @graphcommerce/ecommerce-ui@1.0.0
  - @graphcommerce/next-ui@4.1.1
  - @graphcommerce/react-hook-form@3.0.2
  - @graphcommerce/graphql@3.0.2
  - @graphcommerce/image@3.0.2
  - @graphcommerce/magento-graphql@3.0.2
  - @graphcommerce/magento-store@4.0.2

## 4.1.0

### Minor Changes

- [#1273](https://github.com/ho-nl/m2-pwa/pull/1273) [`8c4e4f7cd`](https://github.com/ho-nl/m2-pwa/commit/8c4e4f7cdd2fa4252788fbc9889d0803bba20eef) Thanks [@paales](https://github.com/paales)! - Added darkmode support! ☀️🌑, adds a toggle to the hamburger menu.

### Patch Changes

- Updated dependencies [[`e0008d60d`](https://github.com/ho-nl/m2-pwa/commit/e0008d60d712603219129dd411d1985bf1ebbed1), [`5d9f8320f`](https://github.com/ho-nl/m2-pwa/commit/5d9f8320ff9621d7357fbe01319ab0cafdf9095d), [`8c4e4f7cd`](https://github.com/ho-nl/m2-pwa/commit/8c4e4f7cdd2fa4252788fbc9889d0803bba20eef), [`5082b8c81`](https://github.com/ho-nl/m2-pwa/commit/5082b8c8191cc3e0b4627678bf837af093513d57)]:
  - @graphcommerce/next-ui@4.1.0

## 4.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514) Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files, so that the packages link to back to the website and repository
- Updated dependencies [[`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514)]:
  - @graphcommerce/graphql@3.0.1
  - @graphcommerce/image@3.0.1
  - @graphcommerce/magento-graphql@3.0.1
  - @graphcommerce/magento-store@4.0.1
  - @graphcommerce/next-ui@4.0.1
  - @graphcommerce/react-hook-form@3.0.1

## 4.0.0

### Major Changes

- [#1258](https://github.com/ho-nl/m2-pwa/pull/1258) [`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05) Thanks [@paales](https://github.com/paales)! - Upgraded to Material UI 5

### Patch Changes

- Updated dependencies [[`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05)]:
  - @graphcommerce/graphql@3.0.0
  - @graphcommerce/image@3.0.0
  - @graphcommerce/magento-graphql@3.0.0
  - @graphcommerce/magento-store@4.0.0
  - @graphcommerce/next-ui@4.0.0
  - @graphcommerce/react-hook-form@3.0.0

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.6.17](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer@3.6.16...@graphcommerce/magento-customer@3.6.17) (2021-12-17)

### Bug Fixes

- added various translations ([66c089d](https://github.com/ho-nl/m2-pwa/commit/66c089dc458e2d7b9f0318b2e14d88cb0e6effc8))

# [3.6.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer@3.5.6...@graphcommerce/magento-customer@3.6.0) (2021-11-12)

### Bug Fixes

- even more translations ([1a1f988](https://github.com/ho-nl/m2-pwa/commit/1a1f98837c704b978f6b42b619d9c52f540b2d48))

### Features

- added tons of translations ([9bb0ac7](https://github.com/ho-nl/m2-pwa/commit/9bb0ac709b58df6ea6141e92e4923a5ca9ae2963))

## [3.5.5](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer@3.5.4...@graphcommerce/magento-customer@3.5.5) (2021-11-12)

### Bug Fixes

- design ([a095309](https://github.com/ho-nl/m2-pwa/commit/a095309bb3d77228985e08e30f626cd26e878f57))
- login error message should wrap ([6b8e61f](https://github.com/ho-nl/m2-pwa/commit/6b8e61fa6523391e5faa3dfd37b9fcd648d831bb))
- snackbar styling and consistant grammar ([3f6a4f9](https://github.com/ho-nl/m2-pwa/commit/3f6a4f9a1c8b2d5220268d59d0c8e5a11c9ce6a8))

## [3.5.4](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer@3.5.3...@graphcommerce/magento-customer@3.5.4) (2021-11-12)

### Bug Fixes

- **checkout-email-form:** spacing too large ([f54e217](https://github.com/ho-nl/m2-pwa/commit/f54e2170b5c47c1c33e74db45e3bcae3d3523c4e))
- **use-form-is-email-available:** invalid email resets sign in/up state ([87b3965](https://github.com/ho-nl/m2-pwa/commit/87b39656760372f2be69eca045e3db8120006137))

# [3.5.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer@3.4.15...@graphcommerce/magento-customer@3.5.0) (2021-11-09)

### Features

- added translations to all pages ([8cf4ecd](https://github.com/ho-nl/m2-pwa/commit/8cf4ecd5db5edfec04ab205aa49f5de433d26579))

## [3.4.10](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer@3.4.9...@graphcommerce/magento-customer@3.4.10) (2021-11-05)

### Bug Fixes

- **sign-up-form:** prevent throwing sign up errors ([3c5d059](https://github.com/ho-nl/m2-pwa/commit/3c5d059b6a3e6cedb4b6eb967235f4d27075fcd4))
- **signup-form:** fix helper text ([09025a4](https://github.com/ho-nl/m2-pwa/commit/09025a4ee6257d0be40b3b97455aebb4359ed4a7))

# [3.4.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer@3.3.5...@graphcommerce/magento-customer@3.4.0) (2021-11-02)

### Bug Fixes

- move checkmark icons on select fields ([95ce54d](https://github.com/ho-nl/m2-pwa/commit/95ce54d7fd41d11120847f2fdf6b9097a2c93871))
- remove text='bold', make contained button text stronger by default ([cd277c9](https://github.com/ho-nl/m2-pwa/commit/cd277c9f434a4a765eac372467e5a05c822d5512))
- remove unused imports ([b832188](https://github.com/ho-nl/m2-pwa/commit/b8321887f10a4a026adc5ca39166eeef90e60669))

### Features

- darkTheme ([3ed6647](https://github.com/ho-nl/m2-pwa/commit/3ed664714670315bc9f20542549724f66cb5052d))

## [3.3.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer@3.3.0...@graphcommerce/magento-customer@3.3.1) (2021-10-28)

### Bug Fixes

- External SVG's can't have alt tags ([1b1414a](https://github.com/ho-nl/m2-pwa/commit/1b1414a782d55d3acf7b0e6bcaa50f2ad5f18f39))

# [3.3.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer@3.2.2...@graphcommerce/magento-customer@3.3.0) (2021-10-28)

### Bug Fixes

- remove double icons ([1654e34](https://github.com/ho-nl/m2-pwa/commit/1654e3441911f3c7c1600357f8f8e3032f5ee729))
- update SvgImage to SvgImageSimple ([f116543](https://github.com/ho-nl/m2-pwa/commit/f116543730853fa9782abff0ccacee7032e85789))

### Features

- dynamic icons, update SvgImage uses to SvgImageSimple ([3d3cc0e](https://github.com/ho-nl/m2-pwa/commit/3d3cc0e0336fcde1cce6ba19705f82c1edf9bfc6))

# [3.2.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer@3.1.9...@graphcommerce/magento-customer@3.2.0) (2021-10-27)

### Features

- **nextjs:** upgraded to nextjs 12 ([9331bc8](https://github.com/ho-nl/m2-pwa/commit/9331bc801f6419522115cc47d291d49d608d5a90))

## [3.1.4](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer@3.1.3...@graphcommerce/magento-customer@3.1.4) (2021-10-19)

### Bug Fixes

- build didn't succeed because of an unknown prop on MessageSnackbar ([4def2d1](https://github.com/ho-nl/m2-pwa/commit/4def2d16ad722e9dc9ae0fc63785107df2d83eab))

# [3.1.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer@3.0.25...@graphcommerce/magento-customer@3.1.0) (2021-10-15)

### Features

- **CustomerFab:** allow custom styling ([da38425](https://github.com/ho-nl/m2-pwa/commit/da384252b5e6e1025e0e90d683f7c60691366fb5))
- **CustomerFab:** allow full customization instead of just styling ([b9f4248](https://github.com/ho-nl/m2-pwa/commit/b9f42483c157b56f7406bf51b74557278c64a597))

## [3.0.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer@3.0.8...@graphcommerce/magento-customer@3.0.9) (2021-09-30)

### Bug Fixes

- dependency cycle issues causes release version issues ([f9d82e3](https://github.com/ho-nl/m2-pwa/commit/f9d82e3bf152acaf90f9d5328bc3d020ca1c53d8))

## [3.0.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer@3.0.0...@graphcommerce/magento-customer@3.0.1) (2021-09-27)

**Note:** Version bump only for package @graphcommerce/magento-customer

# 3.0.0 (2021-09-27)

### Bug Fixes

- 400 bad request when authenticating ([004cf8d](https://github.com/ho-nl/m2-pwa/commit/004cf8de85a8813b6f0e674ecd7b2c82b2a65748))
- account flow (wip) ([0e75aeb](https://github.com/ho-nl/m2-pwa/commit/0e75aebcab3043f9dcd7fd095f9c46cb25d40d57))
- account tweaks ([26ca295](https://github.com/ho-nl/m2-pwa/commit/26ca2955fe7a3ed509aaa7df98cbb4854d636179))
- **account-addresses:** single address not shown ([798bb9c](https://github.com/ho-nl/m2-pwa/commit/798bb9ce2ae7347f161d1a7285e21a3aad0f835f))
- address fragments ([96e68c3](https://github.com/ho-nl/m2-pwa/commit/96e68c3f96e40dded50ec5859909a7326b47e37b))
- address multi line props bug ([2cb3071](https://github.com/ho-nl/m2-pwa/commit/2cb3071a05b75297b3a44915c31b77d4c46ff9cb))
- animate checkout login flow ([0fa32f6](https://github.com/ho-nl/m2-pwa/commit/0fa32f634b94a1f827cf2e4e44e2399a10efb7a1))
- **apollo customer error full page:** only show buttons when customer is unauthorized ([53df7b7](https://github.com/ho-nl/m2-pwa/commit/53df7b75680305e44a79855311e54632cc9e5e68))
- border bottom error ([4aeb1af](https://github.com/ho-nl/m2-pwa/commit/4aeb1af43eafb52774942370596709488346473f))
- cannot execute query error in checkout when signed in ([0004841](https://github.com/ho-nl/m2-pwa/commit/00048418afcf6199bf3714a7b472b6f70dcd99f0))
- cart item styling ([1def7f4](https://github.com/ho-nl/m2-pwa/commit/1def7f49ad4dd621aff6cfd058acc489e522650f))
- checkout login flow ([c6aace8](https://github.com/ho-nl/m2-pwa/commit/c6aace8cbf5319325fb2b2c0c9b778c080095d4c))
- **checkout:** ShippingAddressForm can’t correctly submit when region is not visible ([a459d09](https://github.com/ho-nl/m2-pwa/commit/a459d0929810080b5378ed54dda829416235b5e3))
- correct icon tracking link and order invoice ([fa8948b](https://github.com/ho-nl/m2-pwa/commit/fa8948b0ad58f215d5f26da32d74209efb4088c5))
- delete confirmation ([32233f6](https://github.com/ho-nl/m2-pwa/commit/32233f673fa7bba6ae148d234db7732aa2db012f))
- display empty country in country selector ([8b2a6a7](https://github.com/ho-nl/m2-pwa/commit/8b2a6a7af4ec1dec745dd96687712bc5a17b28d4))
- dynamic order state labels ([6169291](https://github.com/ho-nl/m2-pwa/commit/616929189dffb9ecbfda6de8be9e0cb0f3d2a54b))
- dynamic order tracking ID ([2116123](https://github.com/ho-nl/m2-pwa/commit/2116123edf0658ec1f1b51628b3be6b9e72ec216))
- header fab icons size ([772a721](https://github.com/ho-nl/m2-pwa/commit/772a7213a7ee8274ed006fcd6b6fb5123630a771))
- helper list styles ([2cb825d](https://github.com/ho-nl/m2-pwa/commit/2cb825d24edf8772b191c50ded521590c70966df))
- icon alignments & sizes ([3b349c9](https://github.com/ho-nl/m2-pwa/commit/3b349c96f08f25cad892cf224ee76e937fb338b8))
- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))
- **image:** fix build ([b730cb6](https://github.com/ho-nl/m2-pwa/commit/b730cb6ae4e50dcf2f60e2046d6acf3047caacb3))
- **image:** make sure unoptimized images are preloaded correctly and remove preloads from lots of images ([fb2b4fc](https://github.com/ho-nl/m2-pwa/commit/fb2b4fcb5336ff880a9b32775847d7b6738ba1ea))
- implement next-ui barrel imports ([75bea70](https://github.com/ho-nl/m2-pwa/commit/75bea703dba898f18a2a1dfa3243ebd0a4e6f0e1))
- inline signup form styles ([4199462](https://github.com/ho-nl/m2-pwa/commit/4199462fc6b39b0f67f7b3e37e26ac61c5d5126d))
- input checkmarks ([279c1c1](https://github.com/ho-nl/m2-pwa/commit/279c1c112ada46fdea102024298e8293d1a23293))
- list item icon ([4a4cec5](https://github.com/ho-nl/m2-pwa/commit/4a4cec581b3304a33315242029a7ed274ac7877c))
- **magento-store:** move useCountry/useRegion to magento-store and rename to useFindCountry/useFindRegion ([3fed1c5](https://github.com/ho-nl/m2-pwa/commit/3fed1c53f975977e2681a9b80bb283332d9ad5ec))
- make separate queries folder, create injectable for account and inject reviews ([5d82a5d](https://github.com/ho-nl/m2-pwa/commit/5d82a5d9162f687c2678cce215b77eedbaf1669e))
- make sure an empty cart gets initialized properly ([12df845](https://github.com/ho-nl/m2-pwa/commit/12df8456117393cc7c387ba6e072190a831b7a58))
- make sure ComposedForm actually submits correctly ([c6499d9](https://github.com/ho-nl/m2-pwa/commit/c6499d9d36f874cd65b310cbf7f63f5a88fa86cd))
- make sure the checkout address fields are working as expected ([e88aae9](https://github.com/ho-nl/m2-pwa/commit/e88aae9afa3c60457b8e8c87ba52e8ae2dec4a3e))
- make sure the session token gets deactivated when trying to merge carts when it cant ([2a9416b](https://github.com/ho-nl/m2-pwa/commit/2a9416b5c9efcd28a27f4183922ab419f62ea767))
- make sure to use barrel files ([b73aaf1](https://github.com/ho-nl/m2-pwa/commit/b73aaf1b47db1c807e6b8665e33c7fd5633c49b4))
- make sure we are loading the correct icons ([9862a80](https://github.com/ho-nl/m2-pwa/commit/9862a801088d395838fc5ece5a9c15f7c6c7d422))
- make sure we do not set the new mode to early ([400107f](https://github.com/ho-nl/m2-pwa/commit/400107fe60bc6390129258089a4280e416e4c3c6))
- merge session expired page with sign in page ([8135c55](https://github.com/ho-nl/m2-pwa/commit/8135c553959eab7574f06b13e390a779f01bf5bd))
- message when product not found ([a10f2d8](https://github.com/ho-nl/m2-pwa/commit/a10f2d8ec4dc387659b6c993b65b4aad9d71989c))
- missing NoOrdersFound export ([81e1177](https://github.com/ho-nl/m2-pwa/commit/81e1177dfa6347b310ec5cf4a7085edec7c86497))
- move trackinglink to order package ([1ddf923](https://github.com/ho-nl/m2-pwa/commit/1ddf9235a9ee0e5cda8f657de2ebb559836278ec))
- mui register email field ([f6270ca](https://github.com/ho-nl/m2-pwa/commit/f6270cabc014e9258d94d1190c1a496d53482d14))
- my account mobile view ([1fc48e0](https://github.com/ho-nl/m2-pwa/commit/1fc48e0ff7470f5904492619d96315db19dcc42b))
- my account view styles ([294a22c](https://github.com/ho-nl/m2-pwa/commit/294a22ce0415410fa3b8509578e5b297ad76e66a))
- order card date ([5b932a7](https://github.com/ho-nl/m2-pwa/commit/5b932a72c7ae3d263895d04f13b3aecf1269fc92))
- order details payment information ([cd54eec](https://github.com/ho-nl/m2-pwa/commit/cd54eec957d34a99c6e58bab4876fb511882e823))
- order item product page link ([3a606cc](https://github.com/ho-nl/m2-pwa/commit/3a606ccf408694e055f660deedbd1dff5ab19987))
- order_date does not exist on ‘OrderCardFragment’ ([687e0b9](https://github.com/ho-nl/m2-pwa/commit/687e0b95f93cc0f3400b2cd23352e9ed7902b035))
- orders missing key prop ([73f9fdf](https://github.com/ho-nl/m2-pwa/commit/73f9fdf21f60660bacee8cc16f649e409d813019))
- page as query parameter ([fee47ce](https://github.com/ho-nl/m2-pwa/commit/fee47ce5e0d3295a417bffc100a1d51b095b51ad))
- password never equal to passwordConfirm ([90d0d7f](https://github.com/ho-nl/m2-pwa/commit/90d0d7f7e0e97c537e2f7bbc52cc39b419955a16))
- prevent re-render newsletter form ([aa180d2](https://github.com/ho-nl/m2-pwa/commit/aa180d27371e64f08d2965e27381d160fe3b3f81))
- ratings default value ([7525fc3](https://github.com/ho-nl/m2-pwa/commit/7525fc3db44b99b6d6c5521b5acbd0e48ca9aa97))
- **react-hook-form:** assertFormGqlOperation ([ce09fa5](https://github.com/ho-nl/m2-pwa/commit/ce09fa50f73f6d06b2caa15b1223ba7470a7ea96))
- remove border bottom from last menu item ([23708ab](https://github.com/ho-nl/m2-pwa/commit/23708abd19f4e692b3a231962a92f931370ba157))
- remove conflicting files ([0c17ae4](https://github.com/ho-nl/m2-pwa/commit/0c17ae46be62b775ac83b35f11c532ce2d9401a3))
- remove continueshoppingbutton ([9087748](https://github.com/ho-nl/m2-pwa/commit/908774813dfa1d7a052aed5ece879c4b31f4ad4e))
- remove switch margin right ([5aaa609](https://github.com/ho-nl/m2-pwa/commit/5aaa609d28a679d7b5f0a746dc8f34b5f6591e39))
- removed unnecessary magento-product dependency from magento-customer ([d82802f](https://github.com/ho-nl/m2-pwa/commit/d82802f97a4d57dfcfced4dfa84cc3e7d2b866f1))
- rename NextButton to Button, change imports ([976adb0](https://github.com/ho-nl/m2-pwa/commit/976adb0bf906310d1efce888dcc9be1e28ce0f1b))
- rename product prop to name ([9b7ed5a](https://github.com/ho-nl/m2-pwa/commit/9b7ed5a03747211c3f93d2628110ab6bfac4d552))
- retrieve regions correctly ([f939116](https://github.com/ho-nl/m2-pwa/commit/f93911649aaeec2d8989a7ea27aaa9b18b9109e1))
- review text area height ([b04da99](https://github.com/ho-nl/m2-pwa/commit/b04da99d5a53c6cbcb3b421d24f4f64a65d19d37))
- show form checkmarks when field is valid ([7df8cad](https://github.com/ho-nl/m2-pwa/commit/7df8cadd5292c7d8a1d1e4c981d51adf7b5b8119))
- sign in form inline breakpoint fix ([7e2cfe5](https://github.com/ho-nl/m2-pwa/commit/7e2cfe553b4b5c57da36a462af167719bb48777f))
- sign up form inline animations ([83b5ba8](https://github.com/ho-nl/m2-pwa/commit/83b5ba85cd421cfc748f7af339012a34e07b48f1))
- sign up form typo ([645cad9](https://github.com/ho-nl/m2-pwa/commit/645cad9cf1ffb2bc4017ce8645915fee1c286195))
- signin form flow ([6b3d318](https://github.com/ho-nl/m2-pwa/commit/6b3d318d4816ecb2f34247026b3b6e5969fddea5))
- since all links are of next/link we need to add passHref for custom components ([16fb931](https://github.com/ho-nl/m2-pwa/commit/16fb93100d367203ea79bb4f93357221253f2ecd))
- snackbar sticky to bottom of page ([face0a9](https://github.com/ho-nl/m2-pwa/commit/face0a998680913fe50812970b5a1ad943c22816))
- sometimes continue sign in button does nothing ([849de64](https://github.com/ho-nl/m2-pwa/commit/849de64156210ee6848e5a7817188526c8b65287))
- spelling errors, wrong imports ([01cb889](https://github.com/ho-nl/m2-pwa/commit/01cb889513d69ce0555ac7aaa1a37702d75b0a0d))
- svg icon loading in account menu item ([2658b31](https://github.com/ho-nl/m2-pwa/commit/2658b31d44774c5aa9880036463293a9f103fc06))
- too bold order state label ([7cc8880](https://github.com/ho-nl/m2-pwa/commit/7cc8880eb8b31e440e1f0529671baea871fdbb53))
- tsc lint errors ([ee1d389](https://github.com/ho-nl/m2-pwa/commit/ee1d389612211402df6b3f1f8dd569be365d8035))
- type errors related to CustomerAddress ([7f3d502](https://github.com/ho-nl/m2-pwa/commit/7f3d502f443b3b98bb1819fd4f9ce714b6a5581c))
- update customer address typings ([efe46d0](https://github.com/ho-nl/m2-pwa/commit/efe46d0d5e3112be2b88184974e18b7f2905d482))
- use order card item ([276acd0](https://github.com/ho-nl/m2-pwa/commit/276acd09f264a31c7187f211cdd0d26048c3548e))
- use SvgImageSimple for multiple areas ([bf851a6](https://github.com/ho-nl/m2-pwa/commit/bf851a6740e1956a78f457c2d90904ee2f65da2f))
- useformautosubmit initial submit ([a06cb60](https://github.com/ho-nl/m2-pwa/commit/a06cb60996f83788a95bcd3995407539b2acfd46))
- useFormAutoSubmit modes ([9180bf2](https://github.com/ho-nl/m2-pwa/commit/9180bf21a140f5741078007c42972ded433c277c))
- yarn workspace packages hot reload ([d03fc9f](https://github.com/ho-nl/m2-pwa/commit/d03fc9fdda3486476761786f2b56a934cc92befc))

### Features

- account dashboard skeleton when loading ([bc1778c](https://github.com/ho-nl/m2-pwa/commit/bc1778cb7b59a9c69752463ad56fe705b54a2035))
- account reviews page ([72d8012](https://github.com/ho-nl/m2-pwa/commit/72d8012a81e34af48bcb8d6ddf6c1bd29bbd5da4))
- add barrel file for magento-customer ([02fb7f0](https://github.com/ho-nl/m2-pwa/commit/02fb7f004de968ee968b00e364b2b370f4f7d4f1))
- Add customer service icon and define MuiIconButton size ([eefcc52](https://github.com/ho-nl/m2-pwa/commit/eefcc52eeffa03b364464709e1860135127cc4b5))
- add default snackbar ([2ccdb26](https://github.com/ho-nl/m2-pwa/commit/2ccdb2661b7bfb6353ed23defcc626e652495514))
- add new customer address ([df7cbe9](https://github.com/ho-nl/m2-pwa/commit/df7cbe92f64ffa1ff0cdfde7fa9a5d74fb05f969))
- add product review (wip) ([8cbdb21](https://github.com/ho-nl/m2-pwa/commit/8cbdb2106eaebd4fcc603236383371b1a689de14))
- added PaymentModule API and persistent selection of form fields ([b67f735](https://github.com/ho-nl/m2-pwa/commit/b67f7358f62edd56a8232d625ecee56af350bfb8))
- address formatter wip ([6ab18be](https://github.com/ho-nl/m2-pwa/commit/6ab18be560b0432d6dc7772d46ff69a1f9139a20))
- addresses page ([ab01ae0](https://github.com/ho-nl/m2-pwa/commit/ab01ae095ae53e1e96e63a729a71739d05498a0c))
- apollo error full page component ([fc1e695](https://github.com/ho-nl/m2-pwa/commit/fc1e695251a8792abaec5b9382e8301d3794cb6d))
- barrel files for magento-product pages ([c8fdcf2](https://github.com/ho-nl/m2-pwa/commit/c8fdcf2f5b98821dffe2c47f5ea4e1847bd3bb1e))
- better sign in form handling ([6ac339f](https://github.com/ho-nl/m2-pwa/commit/6ac339fdfa1ece959cc8548e5bfadfca7c1f5cf6))
- **cart:** merge customer and guest carts when logging in ([25ebc0f](https://github.com/ho-nl/m2-pwa/commit/25ebc0f4e825f8512e2c3f1e01bf23a2d019b0d3))
- change billing and shipping address ([060a145](https://github.com/ho-nl/m2-pwa/commit/060a14503fe62c75a49ba832d58d65ef588e5726))
- change name in my account ([00f6f89](https://github.com/ho-nl/m2-pwa/commit/00f6f89d9087d911a2654a6c1c1c76ec38b56533))
- checkout email added ([452a953](https://github.com/ho-nl/m2-pwa/commit/452a95377e116bfa8b757d3ccc45cf2e4ac7cc51))
- created stable layout for category filters ([08d9351](https://github.com/ho-nl/m2-pwa/commit/08d9351dac5c9ede864ff336a60d758875d8efe4))
- created stacked-pages package ([d86008e](https://github.com/ho-nl/m2-pwa/commit/d86008ee659ccb25b194a41d624b394a1ddbd088))
- customizable account menu ([ce1902e](https://github.com/ho-nl/m2-pwa/commit/ce1902e1817e5185b4c3ba551b907da4420bed80))
- delete customer address ([a4cb781](https://github.com/ho-nl/m2-pwa/commit/a4cb7819c398bd71476bc88fe10a9e4c35e6e3cd))
- edit billing address on checkout payment step ([96a5719](https://github.com/ho-nl/m2-pwa/commit/96a5719437616006efb2588c3516d3f2608c1fb8))
- edit customer address ([365fd2e](https://github.com/ho-nl/m2-pwa/commit/365fd2e0a4d06328b5c9a864757084c95f01d5da))
- form styling consistency ([87cba85](https://github.com/ho-nl/m2-pwa/commit/87cba85e828fa42a02dfe74ac841aa2b39a60f4e))
- friendly messages when no content available ([39eaab2](https://github.com/ho-nl/m2-pwa/commit/39eaab2e4455109f67bfead9577175cd6d97d275))
- full page ui back and menu button position swap ([93b3419](https://github.com/ho-nl/m2-pwa/commit/93b34197947d133f4d1480c4ce68a0302201b858))
- full page ui desktop variant ([a70f301](https://github.com/ho-nl/m2-pwa/commit/a70f3013da36fa131f82fb44457b107fb7705df6))
- **graphql:** introduced new graphql package that holds all generated files ([a3e7aa0](https://github.com/ho-nl/m2-pwa/commit/a3e7aa05540540533b5ced9a95f1f802ecbe499f))
- **graphql:** introducing local schema migrations ([e77ef8a](https://github.com/ho-nl/m2-pwa/commit/e77ef8ad4cd5723e2352dec937b45ee976929b24))
- **image:** introduced completely rewritten Image component ([e3413b3](https://github.com/ho-nl/m2-pwa/commit/e3413b3a57392d6571ea64cb8d9c8dca05ea31df))
- implement sticky snackbar in needed places ([0426e73](https://github.com/ho-nl/m2-pwa/commit/0426e73ff7bb24cae656a082e15f36d5012c6653))
- implemented checkmo payment method ([18525b2](https://github.com/ho-nl/m2-pwa/commit/18525b2f4efe9bd0eea12a7a992d284f341e0c68))
- inline sign up form in checkout ([d7c1066](https://github.com/ho-nl/m2-pwa/commit/d7c106632a6d754f7826f03c16b77f4b1e735377))
- **inline-account:** re-added the component ([c508d34](https://github.com/ho-nl/m2-pwa/commit/c508d341ca34daa26a6db13ead72f7f4bdc72160))
- introduces framer-next-pages and framer-sheet to next-ui and soxbase package ([e04ad8a](https://github.com/ho-nl/m2-pwa/commit/e04ad8a94cd1fd5a7c5575c9db7916b6e8a88f16))
- introducing useAutoSubmit for useForm to handle shipping address step ([d375a12](https://github.com/ho-nl/m2-pwa/commit/d375a123d5ba88285703fc1706a43c21c5a248d5))
- login flow ([8132b1a](https://github.com/ho-nl/m2-pwa/commit/8132b1a9be7040c3e2f70f1c1d04e6a9d7840a91))
- made AccountMenuItem support onClick handler ([2dea5c1](https://github.com/ho-nl/m2-pwa/commit/2dea5c1cdcfb07ee36c1b345d53a5aa2aaea536b))
- **magento-customer:** introduced ApolloCustomerErrorAlert ([e5406d9](https://github.com/ho-nl/m2-pwa/commit/e5406d91f914de290c5f097955e312312e567972))
- **magento-graphql:** added core magentoTypePolicies ([bdf15d0](https://github.com/ho-nl/m2-pwa/commit/bdf15d0d3c04e88339a8385d76f3b1ab9589fde3))
- make continueshoppingbutton configurable ([54e5476](https://github.com/ho-nl/m2-pwa/commit/54e54767e0697e311057bfd3464282e0172db32c))
- moved delete address button to address ([df2f792](https://github.com/ho-nl/m2-pwa/commit/df2f792ae737fffe4ec3a667d20ae36f3bb4e526))
- my account authentication page ([26bdf33](https://github.com/ho-nl/m2-pwa/commit/26bdf3339465083027d938435eec02a534692c6e))
- new my account overview ([6de0761](https://github.com/ho-nl/m2-pwa/commit/6de0761c452e1ba5364345a168b400d90418b44e))
- **next-ui:** SectionContainer/SectionHeader now accepts variantLeft/variantRight as prop ([a58f8f2](https://github.com/ho-nl/m2-pwa/commit/a58f8f2962e74c9aaa41142524d42d9c8f662b8d))
- next.js 11 ([7d61407](https://github.com/ho-nl/m2-pwa/commit/7d614075a778f488045034f74be4f75b93f63c43))
- no account yet component ([d8d7372](https://github.com/ho-nl/m2-pwa/commit/d8d737209dc8545411cab7c48c0c59037dd43e80))
- order detail page setup ([4b8c95a](https://github.com/ho-nl/m2-pwa/commit/4b8c95ae2286e83226c1c99aa39c0bda703f9876))
- pagination on orders page in my account ([2fec1e2](https://github.com/ho-nl/m2-pwa/commit/2fec1e29f93d34d726c792e90397fded5ff0b2cb))
- **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))
- renamed all packages to use [@graphcommerce](https://github.com/graphcommerce) instead of [@reachdigital](https://github.com/reachdigital) ([491e4ce](https://github.com/ho-nl/m2-pwa/commit/491e4cec9a2686472dac36b79f999257c0811ffe))
- reset password functionality ([ff3d1a5](https://github.com/ho-nl/m2-pwa/commit/ff3d1a5fce2f62421403f29d90cfecb98506ec4c))
- signed in highlight in menu ([c263e20](https://github.com/ho-nl/m2-pwa/commit/c263e2092d344fd2bc0c12142d9fb972caf213ff))
- support for custom SignOutForm button ([c442727](https://github.com/ho-nl/m2-pwa/commit/c442727b87d557bd10921ae3cd98ebb11d60d255))
- svgimage component ([f369605](https://github.com/ho-nl/m2-pwa/commit/f3696051e381a24c543fd24e199da5b17f9e124f))
- toggle subscribe customer to newsletter ([85688e4](https://github.com/ho-nl/m2-pwa/commit/85688e47b0571c28a2f967310915336b397fc120))
- tweak app performance ([cde0a9b](https://github.com/ho-nl/m2-pwa/commit/cde0a9bda1560b354e9adde3c022e3fddb71ea69))
- update email form in my account ([e5b6832](https://github.com/ho-nl/m2-pwa/commit/e5b6832ca1b55083b80516ecc59b5f1d8a93763b))
- upgrade to node 14 ([d079a75](https://github.com/ho-nl/m2-pwa/commit/d079a751e9bfd8dc7f5009d2c9f31c336a0c96ab))
- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))
- useFormMutationCart and simpler imports ([012f090](https://github.com/ho-nl/m2-pwa/commit/012f090e8f54d09f35d393c61ad1e2319f5a90ff))
- useFormPersist, useFormAutoSubmit, useFormGqlMutation everywhere ([e591285](https://github.com/ho-nl/m2-pwa/commit/e5912854babee87c8efc5b7c00455d61b301aad3))
- working on shipping-method step ([d89a072](https://github.com/ho-nl/m2-pwa/commit/d89a072298baa20bfa0ac7a2a885c40728a23edb))
- working on useMergeCarts ([e39360c](https://github.com/ho-nl/m2-pwa/commit/e39360cf33dbca351d57b0186117248fa102f6c8))

### Reverts

- Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

## 2.0.8 (2020-10-28)

### Bug Fixes

- exclusively use Magento endpoint for magento codegen packages ([deafc42](https://github.com/ho-nl/m2-pwa/commit/deafc423ca0831853ac070e947b900ece565fa65))
- make sure themes extensions are found ([5aa18db](https://github.com/ho-nl/m2-pwa/commit/5aa18db514fd2e2f50681367e39523f8e742ece0))

### Features

- added generated graphql.ts files ([3e44415](https://github.com/ho-nl/m2-pwa/commit/3e44415b018e74b502e9e98479aa5e84041f337d))
- split into packages ([2ee7fd6](https://github.com/ho-nl/m2-pwa/commit/2ee7fd6c0056f467d114f04d92c6c0ddf622d151))

### BREAKING CHANGES

- huge folder structure refactor, please read README to reinstall

# Change Log

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.105.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer@2.104.18...@graphcommerce/magento-customer@2.105.0) (2021-09-24)

### Bug Fixes

- **account-addresses:** single address not shown ([798bb9c](https://github.com/ho-nl/m2-pwa/commit/798bb9ce2ae7347f161d1a7285e21a3aad0f835f))

### Features

- edit billing address on checkout payment step ([96a5719](https://github.com/ho-nl/m2-pwa/commit/96a5719437616006efb2588c3516d3f2608c1fb8))
- **inline-account:** re-added the component ([c508d34](https://github.com/ho-nl/m2-pwa/commit/c508d341ca34daa26a6db13ead72f7f4bdc72160))

## [2.104.7](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer@2.104.6...@graphcommerce/magento-customer@2.104.7) (2021-08-18)

## [2.104.7](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer@2.104.6...@graphcommerce/magento-customer@2.104.7) (2021-08-18)

### Bug Fixes

- make sure the session token gets deactivated when trying to merge carts when it cant ([2a9416b](https://github.com/ho-nl/m2-pwa/commit/2a9416b5c9efcd28a27f4183922ab419f62ea767))

# [2.104.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer@2.103.0...@graphcommerce/magento-customer@2.104.0) (2021-08-12)

### Bug Fixes

- account tweaks ([26ca295](https://github.com/ho-nl/m2-pwa/commit/26ca2955fe7a3ed509aaa7df98cbb4854d636179))
- prevent re-render newsletter form ([aa180d2](https://github.com/ho-nl/m2-pwa/commit/aa180d27371e64f08d2965e27381d160fe3b3f81))
- remove switch margin right ([5aaa609](https://github.com/ho-nl/m2-pwa/commit/5aaa609d28a679d7b5f0a746dc8f34b5f6591e39))

### Features

- toggle subscribe customer to newsletter ([85688e4](https://github.com/ho-nl/m2-pwa/commit/85688e47b0571c28a2f967310915336b397fc120))

# [2.103.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer@2.102.10...@graphcommerce/magento-customer@2.103.0) (2021-08-12)

### Features

- upgraded to nextjs 11 ([0053beb](https://github.com/ho-nl/m2-pwa/commit/0053beb7ef597c190add7264256a0eaec35868da))

## [2.102.9](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer@2.102.8...@graphcommerce/magento-customer@2.102.9) (2021-08-09)

### Bug Fixes

- use SvgImageSimple for multiple areas ([bf851a6](https://github.com/ho-nl/m2-pwa/commit/bf851a6740e1956a78f457c2d90904ee2f65da2f))

### Reverts

- Revert "chore: upgrade @apollo/client" ([55ff24e](https://github.com/ho-nl/m2-pwa/commit/55ff24ede0e56c85b8095edadadd1ec5e0b1b8d2))

# [2.102.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer@2.101.8...@graphcommerce/magento-customer@2.102.0) (2021-07-26)

### Features

- **playwright:** added new playwright package to enable browser testing ([6f49ec7](https://github.com/ho-nl/m2-pwa/commit/6f49ec7595563775b96ebf21c27e39da1282e8d9))

## [2.101.6](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer@2.101.5...@graphcommerce/magento-customer@2.101.6) (2021-07-23)

### Bug Fixes

- make separate queries folder, create injectable for account and inject reviews ([5d82a5d](https://github.com/ho-nl/m2-pwa/commit/5d82a5d9162f687c2678cce215b77eedbaf1669e))
- missing NoOrdersFound export ([81e1177](https://github.com/ho-nl/m2-pwa/commit/81e1177dfa6347b310ec5cf4a7085edec7c86497))
- move trackinglink to order package ([1ddf923](https://github.com/ho-nl/m2-pwa/commit/1ddf9235a9ee0e5cda8f657de2ebb559836278ec))

# [2.101.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/magento-customer@2.100.10...@graphcommerce/magento-customer@2.101.0) (2021-07-20)

### Bug Fixes

- ignore md files from triggering version updates ([4f98392](https://github.com/ho-nl/m2-pwa/commit/4f9839250b3a32d3070da5290e5efcc5e2243fba))

### Features

- full page ui back and menu button position swap ([93b3419](https://github.com/ho-nl/m2-pwa/commit/93b34197947d133f4d1480c4ce68a0302201b858))
- full page ui desktop variant ([a70f301](https://github.com/ho-nl/m2-pwa/commit/a70f3013da36fa131f82fb44457b107fb7705df6))
