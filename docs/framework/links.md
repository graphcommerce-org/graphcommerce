# Handling links in GraphCommerce

GraphCommerce integrates the next/link functionality with @mui/material's Link
and ButtonBase (and all it's derivatives) components with NextLink. There is no
need to wrap a Link component with next/link anymore.

NextLink automatically adds `target="_blank"` when the href is external.

NextLink makes all relative href absolute. `<Link href="my-page"/>` will be
rendered as `<Link href="/my-page"/>`.

## Usage

Using NextLink is as simple as using the Link/Button component from
@mui/material.

### Basic usage

```tsx
import { Link, Fab, Button } from '@mui/material'

function MyComponent() {
  return (
    <>
      <Link href='/about'>About</Link>
      <Button href='/bla'>Styled as a button</Button>
      <Link href='https://www.graphcommerce.org/'>GraphCommerce©</Link>
    </>
  )
}
```

### Using next/link's props or relative URL's

If you want to use props of next/link and satisfy typescript you need to provide
`component={NextLink}`.

```tsx
import { Link } from '@mui/material'
import { NextLink } from '@graphcommerce/next-ui'

function MyComponent() {
  return (
    <Link href='subpage' relative component={NextLink} prefetch={false}>
      About
    </Link>
  )
}
```

### Using next/link with a custom component

```tsx
import { Chip } from '@mui/material'
import { NextLink } from '@graphcommerce/next-ui'

function MyComponent() {
  return <Chip component={NextLink} href={`/${url}`} label={'my label'} />
}
```

## Upgrading from Next.js 12

Before Next.js 13, the next/link component needed to wrap a Material-UI Link
component;

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
import { Link } from '@mui/material'
import { NextLink } from '@graphcommerce/next-ui'

function MyComponent() {
  return (
    <>
      <Link href='/about' component={NextLink} prefetch={false}>
        Link without prefetch
      </Link>
    </>
  )
}
```

## Further reading

-
