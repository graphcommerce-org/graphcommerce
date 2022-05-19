# @graphcommerce/postcode-service

Note: Please make sure you have
[updated](https://www.graphcommerce.org/docs/upgrading) to the latest version
first before you start using this package.

This component can be used to intergrate
[Postcode Service](https://postcodeservice.com/) into GraphCommerce. At the
moment only the Dutch API is implemented. Please note that this is a paid
service.

## Instalation

```bash
yarn add @graphcommerce/postcode-service
```

Add the following to your .meshrc.yml:

```yml
additionalResolvers:
  - '@graphcommerce/postcode-service/mesh/postcodeResolver.ts'
```

## Intergration

You can use the by using the
[`usePostcodeService`](./components/PostcodeService.tsx) that needs a form that
contains a `postcode`, `houseNumber`, `street` and `city` as registered fields.

```tsx
const [postcodeServiceResult, postcodeLoading] = usePostcodeService(form)
const readonlyStreetCity = Boolean(
  postcodeServiceResult?.success || postcodeLoading || readOnly,
)
```

It is advised to use the `readonlyStreetCity` variable to set the `street` and
`city` fields to read-only, this will prevent users from making errors in those
fields and is the default behavior on most Postcode Service implementations.

If you are using a external controlled component (like MUI's `TextField`) it is
advised to wrap the `TextField` element in a `Controller` element to make sure
the state of the element is matching the state of the form.

```tsx
<Controller // wrap in a controller to prevent state mismatch
  {...controllerAttributes}
  render={({ field }) => (
    <TextField
      {...fieldAttributes}
      InputProps={{
        ...fieldInputProps,
        readOnly: readonlyStreetCity, // make the field read-only based on postcodeService result and state
      }}
    />
  )}
/>
```

You can show a error if the Postcode Service can't find a result by checking the
`success` and `straatnaam` value. Please note that Postcode Service sometimes
uses the `straatnaam` value to show errors (they do that for rate limiting with
their test credentials for example).

```tsx
{
  postcodeServiceResult?.success === false &&
    !postcodeServiceResult?.straatnaam &&
    'Uw postcode/huisnummer combinatie is niet gevonden. Vul s.v.p. handmatig uw straatnaam en woonplaats in.'
}
```
