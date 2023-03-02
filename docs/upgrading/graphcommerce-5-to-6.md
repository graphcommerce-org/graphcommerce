# Upgrading from GraphCommerce 5 to 6

Upgrading from GraphCommerce 5 to 6 is a major upgrade. Please follow the
regular [upgrade steps first](./readme.md).

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

### Product routing changes

The route for the product has changed from `/product/[url]`,
`/product/configurable/[url]`, etc. to `/p/[url]` by default. This is a
singlular product page for all product types.

You can opt in to use the
[legacyProductRoute](../framework/config.md#legacyproductroute-boolean) to keep
the old behavior. This legacy routing will be removed in a future version.

You can also change the product route from `/p/[url]` to something else by
configuring [productRoute](../framework/config.md#productroute-string)

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
