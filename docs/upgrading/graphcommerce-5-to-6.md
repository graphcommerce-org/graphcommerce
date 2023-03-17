# Upgrading from GraphCommerce 5 to 6

Upgrading from GraphCommerce 5 to 6 is a major upgrade. Please follow the
regular [upgrade steps first](./readme.md).

1. [Migrating to graphcommerce.config.js](#migrating-to-graphcommerceconfigjs)
2. [Product routing changes](#product-routing-changes)
3. [Hygraph schema changes](#hygraph-schema-changes)
4. [Replace next/link with GraphCommerce's new Link behavior](#replace-nextlink-with-graphcommerces-new-link-behavior)

## Migrating to graphcommerce.config.js

GraphCommerce 6 uses a new [configuration file](../framework/config.md) called
`graphcommerce.config.js` this replaces the current configuration. When staring
a dev server, GraphCommerce will notify you how to migrate your env variables to
graphcommerce.config.js.

## Product routing changes

The route for the product has changed from `/product/[url]`,
`/product/configurable/[url]`, etc. to `/p/[url]` by default. This is a
singlular product page for all product types.

You can keep using the old behavior by setting
[legacyProductRoute](../framework/config.md#legacyproductroute-boolean) to true.
This legacy routing will be removed in a future version.

You can also change the product route from `/p/[url]` to something else by
configuring [productRoute](../framework/config.md#productroute-string)

## Hygraph schema changes

Create an enumeration in Hygraph `RowLinksVariants`:

<img width="712" alt="Scherm­afbeelding 2023-03-16 om 13 15 24" src="https://user-images.githubusercontent.com/1244416/225615372-1226a6a8-11c8-4939-9ea5-bb66f16c3bb3.png" />

Create a RowLinks model:

Display name: `Row Links`

API ID: `RowLinks`

Plural API ID: `RowLinksMultiple`

<img width="748" alt="Scherm­afbeelding 2023-03-16 om 13 15 34" src="https://user-images.githubusercontent.com/1244416/225615400-fc64c203-dce4-4971-8d21-c8777d085abe.png" />

Add RowLinks to be included in the `content` of the `Page` Model:

<img width="805" alt="Scherm­afbeelding 2023-03-16 om 13 21 13" src="https://user-images.githubusercontent.com/1244416/225615681-81035be8-a994-416e-bd7a-814493c132d7.png" />

After this step you should be able to run `yarn codegen`.

## Replace next/link with GraphCommerce's new Link behavior

Before GraphCommerce 6 (before Next.js 13), the next/link component needed to
wrap a Material-UI Link component; With GraphCommerce 6 we've integrated Next.js
13's new Link behavior, see [links documentation](../framework/links.md).

```tsx
import PageLink from 'next/link'
import { Link } from '@mui/material'

function MyComponent() {
  return (
    <PageLink href='/about' passHref>
      <Link>About</Link>
    </PageLink>
  )
}
```

To upgrade this component to Next.js 13, you can remove the PageLink component.

```tsx
import { Link } from '@mui/material'

function MyComponent() {
  return <Link href='/about'>About</Link>
}
```

### Upgrading a Link that uses next/link props

```tsx
import PageLink from 'next/link'
import { Link } from '@mui/material'

function MyComponent() {
  return (
    <PageLink href='/about' passHref prefetch={false}>
      <Link>Link without prefetch</Link>
    </PageLink>
  )
}
```

```tsx
import { NextLink } from '@graphcommerce/next-ui'
import { Link } from '@mui/material'

function MyComponent() {
  return (
    <Link href='/about' component={NextLink} prefetch={false}>
      Link without prefetch
    </Link>
  )
}
```

### Upgrading a Button that uses component='a'

```tsx
import PageLink from 'next/link'
import { Link } from '@mui/material'

function MyComponent() {
  return (
    <PageLink href='/about' passHref>
      <Button component='a'>Link with component='a'</Link>
    </PageLink>
  )
}
```

```tsx
import { Link } from '@mui/material'

function MyComponent() {
  return (
    <Button href='/about' prefetch={false}>
      component='a' isn't needed
    </Button>
  )
}
```

Note: If there is a case where this is required, make sure you use
`component={NextLink}` instead of `component='a'`. A global search through the
codebase will show you where this is used.

```tsx
import { NextLink } from '@graphcommerce/next-ui'
import { Link } from '@mui/material'

function MyComponent() {
  return (
    <Button href='/about' component={NextLink} prefetch={false}>
      component='a' isn't needed
    </Button>
  )
}
```

## Upgrading a non button components like Chip, Box, etc.

```tsx
import PageLink from 'next/link'
import { Link } from '@mui/material'

function MyComponent() {
  return (
    <PageLink href='/about' passHref>
      <Chip>Chip</Link>
    </PageLink>
  )
}
```

```tsx
import { NextLink } from '@graphcommerce/next-ui'
import { Link } from '@mui/material'

function MyComponent() {
  return (
    <Chip href="/about" component={NextLink}>Chip</Link>
  )
}
```

## Further reading

- [Upgrading](./readme.md)
