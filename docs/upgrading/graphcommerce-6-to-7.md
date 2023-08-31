# Upgrading from GraphCommerce 6 to 7

Depending on the amounts of customisations you've made, there are some manual
steps. Please follow the regular [upgrade steps first](./readme.md).

1. [Add `fetchPolicy: cache-first` to LayoutDocument](#add-cache-first-fetchpolicy-to-layoutdocument)
2. [Use thew new `hygraphPageContent` function instead of DefaultPageQuery](#use-the-new-hygraphpagecontent-function-instead-of-defaultpagequery)
3. [All @graphql-mesh/\* should be set to latest](#all-graphql-mesh-should-be-set-to-latest)
4. [Upgrading your Hygraph schema](#upgrading-your-hygraph-schema)

## Add `fetchPolicy: cache-first` to LayoutDocument queries

🟠 Only required if you've added custom pages

All occurences of LayoutDocument should get a `fetchPolicy: 'cache-first'`
option.

```tsx
// Find all occurences of
staticClient.query({ query: LayoutDocument })

// Replace with
staticClient.query({ query: LayoutDocument, fetchPolicy: 'cache-first' })
```

## Use the new `hygraphPageContent` function instead of DefaultPageQuery

🟠 Only required if you've added custom pages

The `DefaultPageDocument` is removed in favor of the new `hygraphPageContent`
query. This function handles caching better and allows for (currently in beta)
DynamicRows feature.

```tsx
// DefaultPageDocument
const page = staticClient.query({
  query: DefaultPageDocument,
  variables: { url: `blog/${urlKey}` },
})

// Becomes hygraphPageContent
const page = hygraphPageContent(staticClient, `blog/${urlKey}`)
```

## All @graphql-mesh/\* should be set to latest.

🟠 Only required if you've added custom @graphql-mesh/\* packages

All @graphql-mesh packages are using a 0.x.x versioning schema. This means that
each minor change is considered a major change by yarn. This causes lots of
issues with version mismatches. Since `@graphql-mesh` isn't making any major
breaking before releasing 1.x this is the safest course of action for now. Once
1.x is released we'll switch to "^1.0.0" as a version constraint.

In your package.json

```json
// Replace
    "@graphql-mesh/json-schema": "^0.37.6",
    "@graphql-mesh/transform-filter-schema": "^0.15.8",

// With
    "@graphql-mesh/json-schema": "latest",
    "@graphql-mesh/transform-filter-schema": "latest",
```

## Upgrading your Hygraph schema

Upgrade your Hygraph schema with the [Hygraph migration cli](../hygraph/cli.md).
Select `graphcommerce6to7` as version.
