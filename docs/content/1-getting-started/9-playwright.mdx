# End to end testing with playwright

For testing we're using the excellent
[@playwright/test](https://playwright.dev/) library.

> Playwright enables reliable end-to-end testing for modern web apps.
>
> - Run tests across all browsers.
> - Execute tests in parallel.
> - Enjoy context isolation out of the box.
> - Capture videos, screenshots and other artifacts on failure.
> - Integrate your POMs as extensible fixtures.

## Features

- Playwright! To learn about what playwright is, there are excellent resources
  available on [playwright.dev](https://playwright.dev/) and
  [youtube](https://www.youtube.com/watch?v=_Jla6DyuEu4)
- [Automatically runs the tests on a pull_request](../../.github/workflows/playwright.yml)

## Installation:

```
npx playwright install
```

## Running tests

```
# Run on android
npx playwright test --headed --project=android

# Run with debugger enabled
PWDEBUG=1 npx playwright test --project=android

# Run tests byt searched
npx playwright test --headed --project=android --grep mything
```

## Writing tests

Read this page to get some idea how to write and run tests:
https://playwright.dev/docs/intro#first-test and
[generate code](https://playwright.dev/docs/cli#generate-code)

Take a look at some examples to get an idea how it is used in this codebase.

- [addConfigurableProductToCart.spec.ts](../../packages/magento-product-configurable/_playwright/addConfigurableProductToCart.spec.ts)
- [braintree_local_payments.spec.ts](../../packages/magento-payment-braintree/_playwright/braintree_local_payments.spec.ts)

## Structure:

- Playwright [tests](https://playwright.dev/docs/intro#first-test) can be found
  in `'**/_playwright/**.spec.ts'`
- Playwright [Test fixtures](https://playwright.dev/docs/test-fixtures) can be
  found in `**/_playwright/**.fixture.ts`
- Playwright test partials are just files in `**/_playwright/**.ts`

### Test fixtures

- [apolloClient](../../packages/graphql/_playwright/apolloClient.fixture.ts)
- [productURL](../../packages/magento-product/_playwright/productURL.fixture.ts)

### Test partials

By splitting up tests in to more reusable partials it becomes easier to compose
tests to test more complex scenario's. Therefor we have partials available in
the `_playwright` folders of all the packages.

For example we have a few:

- [`addConfigurableProductToCart`](../../packages/magento-product-configurable/_playwright/addConfigurableProductToCart.ts)
- [`fillShippingAddressForm`](../../packages/magento-cart-shipping-address/_playwright/fillShippingAddressForm.ts)

Q: Why not use fixtures for this?  
A: Fixtures in playwright are meant to
[set up the environment](https://playwright.dev/docs/test-fixtures#introduction-to-fixtures),
we're interpreting this that the test partials aren't about setting up the
environment, but actually executing the test.
