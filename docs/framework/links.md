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
import Link from '@mui/material/Link'
import Fab from '@mui/material/Fab'
import Button from '@mui/material/Button'

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
import { NextLink } from '@graphcommerce/next-ui'
import Link from '@mui/material/Link'

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
import { NextLink } from '@graphcommerce/next-ui'
import Chip from '@mui/material/Chip'

function MyComponent() {
  return <Chip component={NextLink} href={`/${url}`} label={'my label'} />
}
```

## Further reading

-
