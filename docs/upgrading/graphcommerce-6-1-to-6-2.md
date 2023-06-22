# Upgrading from GraphCommerce 6.1 to 6.2

Upgrading from GraphCommerce 6.1 to 6.2 is minor update. Please follow the
regular [upgrade steps first](./readme.md).

1. [Add `fetchPolicy: cache-first` to LayoutDocument](#add-cache-first-fetchpolicy-to-layoutdocument)
2. [Translation file updates](#translation-file-updates)

## Add `fetchPolicy: cache-first` to LayoutDocument queries

🟢 Only required if you've added custom pages.

All occurences of LayoutDocument should get a `fetchPolicy: 'cache-first'`
option.

```tsx
// Find all occurences of
staticClient.query({ query: LayoutDocument })

// Replace with
staticClient.query({ query: LayoutDocument, fetchPolicy: 'cache-first' })
```

## Use thew new `hygraphPageContent` function instead of DefaultPageQuery

🟢 Only required if you've added custom pages.

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

🟢 Only required if you've added custom translations.

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
