# Upgrading from GraphCommerce 6.1 to 6.2

Upgrading from GraphCommerce 6.1 to 6.2 is minor update. Depending on the
amounts of customisations you've made, there are some manual steps. Please
follow the regular [upgrade steps first](./readme.md).

1. [Add `fetchPolicy: cache-first` to LayoutDocument](#add-cache-first-fetchpolicy-to-layoutdocument)
2. [Translation file updates](#translation-file-updates)

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

## Use thew new `hygraphPageContent` function instead of DefaultPageQuery

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

## Translation file updates

🟠 Only required if you've added custom translations

All locales files now require a `msgid` comment. All translations need to have a
`#. js-lingui-explicit-id` comment added. This could be done with a
find-and-replace:

Find (including the empty line)

```

msgid
```

Replace with (including the empty line)

```

#. js-lingui-explicit-id
msgid
```

To validate your translations run `yarn lingui` to extract everything.

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

In version 6.2 and onwards it is possible to upgrade your Hygraph schema using
the Graphcommerce Hygraph CLI. This is a tool that automatically modifes your
Hygraph schema without the need of adding models/components/enumarations
manually. The following steps are needed to utilize this tool:

1. Install the @graphcommerce/hygraph-cli package

2. Create a Hygraph migration token

   1. Open your Hygraph project. Go to: Project settings > Permanent auth tokens

   2. Click 'Add token' and give it a name, something like 'GraphCommerce Write
      Access Token' and keep stage on 'Published'.

   3. Under 'Management API', click 'Yes, Initialize defaults'

   4. Click 'Edit Permissions' and enable: 'Update' and 'Delete' permissions for
      'models', 'enumerations', 'fields', 'components' and 'sources':

      - Update existing models

      - Delete existing models

      - Update existing fields

      - Delete existing fields

      - Update existing enumerations

      - Delete existing enumerations

      - Update existing components

      - Delete existing components

      - Update remote sources

      - Delete remote sources

      - Read existing environments

      - Read public content views

      - Create public content views

      - Update public content views

      - Delete public content views

      - Can see schema view

   5. Add this new token to your env file like this:
      `GC_HYGRAPH_WRITE_ACCESS_ENDPOINT=””`

3. Add the Content API key to your env file like this:
   `GC_HYGRAPH_WRITE_ACCESS_ENDPOINT="https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/.../master"`
4. Add your projectID to your env file like this: `GC_HYGRAPH_PROJECT_ID=””`
5. Run `yarn graphcommerce hygraph-migrate`
6. Select the migration you want to run and press enter.
7. The migrations should now be upgraded, check your Hygraph Schema if changes
   are made.
