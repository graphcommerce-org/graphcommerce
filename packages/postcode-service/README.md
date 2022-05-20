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
sources:
  - name: postcodeService
    handler:
      jsonSchema:
        baseUrl: https://api.postcodeservice.com
        operations:
          - type: Query
            field: postcodeServiceNL
            headers:
              Accept: 'application/json'
              Content-type: 'application/json'
              X-Client_Id: '1177'
              X-Secure_Code: '9SRLYBCALURPE2B'
            path: /nl/v3/json/getAddress/index.php?postcode={args.postcode}&huisnummer={args.housenumber}&client_id={env.POSTCODESERVICE_CLIENT_ID}&secure_code={env.POSTCODESERVICE_SECURE_CODE}
            method: GET
            responseSample: '{"success":true,"straatnaam":"Hertshoornvaren","woonplaats":"Bergschenhoek"}'
additionalResolvers:
  - '@graphcommerce/postcode-service/mesh/postcodeResolver.ts'
```

Also make sure your `.env` file is updated with the correct api credentials.
Below are the test credentials supplied by the service, these are rate limited
and can't be used in production.

```
# Postcodeservice api
POSTCODESERVICE_CLIENT_ID="1177"

POSTCODESERVICE_SECURE_CODE="9SRLYBCALURPE2B"
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
