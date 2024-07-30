# Magento GraphQL Rest

Integrates Magento's REST API as a Mesh Service API.

## Todo

Currently the only spec that is implemented is the `GET:/customers/me` endpoint.
Future extensions and usecases are welcome.

## Modifications and customization

In `./scripts/generate-spec.mts` you can find the filter-script that cleans up
the spec. Modifications could be made there.

## Maybe?

```graphql
type Customer {
  rest: M2RestCustomerDataCustomerInterface
    @resolveTo(
      sourceName: "m2rest"
      sourceTypeName: "Query"
      sourceFieldName: "m2rest_GetV1CustomersMe"
    )
}
```
