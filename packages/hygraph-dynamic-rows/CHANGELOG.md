# @graphcommerce/hygraph-dynamic-rows

## 9.0.4-canary.3

### Patch Changes

- [#2477](https://github.com/graphcommerce-org/graphcommerce/pull/2477) [`8015eab`](https://github.com/graphcommerce-org/graphcommerce/commit/8015eabc130dacf1f2703980cd5f0ad2c550aa4d) - Upgraded to @apollo/client 3.12.3 without impacting typescript compilation performance. ([@paales](https://github.com/paales))

## 9.0.4-canary.2

## 9.0.4-canary.1

## 9.0.4-canary.0

## 9.0.0

### Major Changes

### Patch Changes

- [#2318](https://github.com/graphcommerce-org/graphcommerce/pull/2318) [`886837f`](https://github.com/graphcommerce-org/graphcommerce/commit/886837ff44d95404512716dbb9b2272c38b9ad27) - Remove `row` field on DynamicRows` model ([@JoshuaS98](https://github.com/JoshuaS98))

- [#2268](https://github.com/graphcommerce-org/graphcommerce/pull/2268) [`8ffe2d5`](https://github.com/graphcommerce-org/graphcommerce/commit/8ffe2d5d1b040797ee4987d7740de5fdeadd4f72) - Solve issue where an Apollo object couldn't be modified as it is read only when Dynamic rows are added to the project. ([@JoshuaS98](https://github.com/JoshuaS98))

- [#2331](https://github.com/graphcommerce-org/graphcommerce/pull/2331) [`702bfc9`](https://github.com/graphcommerce-org/graphcommerce/commit/702bfc93566c9745546988e57988431d5d4d8cb0) - Moved plugins to new format ([@paales](https://github.com/paales))

## 8.0.5

### Patch Changes

- [#2238](https://github.com/graphcommerce-org/graphcommerce/pull/2238) [`db86432`](https://github.com/graphcommerce-org/graphcommerce/commit/db864324277fd5fb680c66eaa87d211cd7be4905) - Changed query limit to 100 from a 1000 on HygraphAllPages and AllDynamicRows query and added pagination. ([@Jessevdpoel](https://github.com/Jessevdpoel))

## 8.0.0

### Patch Changes

- [`df385d9`](https://github.com/graphcommerce-org/graphcommerce/commit/df385d9a2e724715e0f08cc13b1bef6748b38b82) - Allow muiltiple rows for each Dynamic Row entry in Hygraph ([@JoshuaS98](https://github.com/JoshuaS98))

- [#2182](https://github.com/graphcommerce-org/graphcommerce/pull/2182) [`a93c312`](https://github.com/graphcommerce-org/graphcommerce/commit/a93c312b9d6e0d6cc102b49cc3ad02953200a1f6) - Dynamic rows would break page rendering if there was a dynamic row but no page returned ([@paales](https://github.com/paales))

## 7.0.0

### Major Changes

- [#1912](https://github.com/graphcommerce-org/graphcommerce/pull/1912) [`a43d389e9`](https://github.com/graphcommerce-org/graphcommerce/commit/a43d389e956fe69b73238b12c98c781b7044e4bb) - Added dynamic rows feature ([@JoshuaS98](https://github.com/JoshuaS98))
