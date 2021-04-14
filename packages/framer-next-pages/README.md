# Framer Next Pages

Goals:

- Ability to create pages that are overlays over other pages.
- Ability to create multiple levels of overlays over other pages.
- Ability to create entry and exit animations.

Non-goals:

- Provide components that actually stack

## Usage

### Installing

Create a `pages/_app.ts` file:

```tsx
import { FramerNextPages } from '@reachdigital/framer-next-pages'
import { AppPropsType } from 'next/dist/next-server/lib/utils'

export default function App({ router, Component, pageProps }: AppPropsType) {
  return (
    <FramerNextPages
      router={router}
      Component={Component}
      pageProps={pageProps}
    />
  )
}
```

### Create a page that works as an overlay:

Define pageOptions on a page. This can be any static or dynamic page:

Example routes:

- `pages/overlay.tsx`
- `pages/overlay/[overlayId].tsx`

```tsx
import { PageOptions } from '@reachdigital/framer-next-pages'

export default function Overlay() {
  // you must implement MyOverlay yourself or use any existing overlays
  return <MyOverlay>blabla</MyOverlay>
}

Overlay.pageOptions = {
  overlay: 'left',
} as PageOptions
```

### Create an overlay that doesnt the layout in a dynamic routes:

Define `key` as router.asPath in pageOptions.

Example route:

- `pages/overlay/[overlayId]`

```tsx
import { PageOptions } from '@reachdigital/framer-next-pages'

Overlay.pageOptions = {
  overlay: 'left',
  key: (router) => router.asPath, // will return pages/overlay/123
} as PageOptions
```

### Create an overlay that shares the layout between different dynamic routs:

Define `key` as a static value in pageOptions in your routes.

Example routes:

- `pages/account.tsx`
- `pages/account/orders.tsx`
- `pages/account/orders/[orderId].tsx`

```tsx
import { PageOptions } from '@reachdigital/framer-next-pages'

Overlay.pageOptions = {
  overlay: 'left',
  key: () => 'account',
} as PageOptions
```

### Defining a fallback

When an overlay is accessed by URL, it will render but it won't render as a
normal page. You can provide a fallback to render something in this case.

### Create a fallback when routes aren't provided

..._todo_...

### Workins

Creates a `pageList` containing all the pages that should be rendered on top of
each other.

Each time a new page is provided to `<FramerNextPages />` it will add them to
the pageList. This pageList is remembered when navigating between pages.

If an overlay is rendered, we find the closest 'regular' page (that isn't an
overlay) and render from that page until the current active page.

Uses Framer's
[AnimatePresence](https://www.framer.com/api/motion/animate-presence/) to
animate pages in and out of existence.
