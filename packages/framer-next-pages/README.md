# Framer Next Pages

- Ability to create pages that are overlays over other pages.
- Ability to create multiple levels of overlays over other pages.
- Ability to create entry and exit animations.
- Ability to maintain a SharedComponent between multiple pages.
- Handles proper scroll position

This package does not provide any actual overlays, that is up to the
implementor.

## Installing

Create a `pages/_app.ts` file:

```tsx
import { FramerNextPages } from '@graphcommerce/framer-next-pages'
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

Enable Next's `scrollRestoration`:

```js
const config = {
  experimental: {
    scrollRestoration: true,
  },
}
```

## Creating overlays

### Create a page that works as an overlay:

Define pageOptions on a page. This can be any static or dynamic page:

Example routes:

- `pages/overlay.tsx`
- `pages/overlay/[overlayId].tsx`

```tsx
import { PageOptions } from '@graphcommerce/framer-next-pages'

export default function Overlay() {
  return <MyOverlay>blabla</MyOverlay>
}

Overlay.pageOptions = {
  overlayGroup: 'left',
  // sharedKey default is `(router) => router.asPath` resulting in `pages/overlay/[overlayId]`
} as PageOptions
```

### Create an overlay that doesn't share the layout in a dynamic routes:

Define `key` as router.asPath in pageOptions.

Example route:

- `pages/overlay/[overlayId]`

```tsx
import { PageOptions } from '@graphcommerce/framer-next-pages'

Overlay.pageOptions = {
  overlayGroup: 'left',
  sharedKey: (router) => router.asPath, // will return pages/overlay/123
} as PageOptions
```

### Create an overlay that shares the layout between different dynamic routs:

Define `key` as a static value in pageOptions in your routes.

Example routes:

- `pages/account.tsx`
- `pages/account/orders.tsx`
- `pages/account/orders/[orderNumber].tsx`

```tsx
import { PageOptions } from '@graphcommerce/framer-next-pages'

Overlay.pageOptions = {
  overlayGroup: 'left',
  sharedKey: () => 'account',
} as PageOptions
```

## SharedComponent

To create a stable layout between multiple routes we can define a
SharedComponent.

Example route:

- `pages/overlay/[overlayId]`

```ts
CmsPage.pageOptions = {
  SharedComponent: LayoutSheet,
} as PageOptions
```

### Passing props to a SharedComponent with sharedProps

```ts
CmsPage.pageOptions = {
  SharedComponent: LayoutSheet,
  sharedProps: { variant: 'bottom' },
} as PageOptions
```

### Passing props to a SharedComponent with getStaticProps

```ts
export function getStaticProps() {
  return {
    variantMd: 'bottom',
  }
}
```

### Create a SharedComponent between multiple routes

```ts
const pageOptions: PageOptions<LayoutSheetProps> = {
  SharedComponent: LayoutSheet,
  sharedKey: () => 'page',
}
```

```ts
const pageOptions: PageOptions<LayoutSheetProps> = {
  overlayGroup: 'account',
  SharedComponent: LayoutSheet,
  sharedKey: () => 'account',
}
```

## Hooks

We have multiple hooks available to animate based on certain states, etc.

```tsx
export default function MyComponent() {
  const { level, depth, direction } = usePageContext()
}
```

### usePageContext().level

If we have multiple pages layered on top of each other we get the level the page
has.

E.g.

- `/my-regular-page`: `level === 0`

After navigating to `overlay-one`

- `/my-regular-page`: `level === 0`
- `/overlay-one`: `level === 1`

After navigation to `overlay-two`

- `/my-regular-page`: `level === 0`
- `/overlay-one`: `level === 1`
- `/overlay-two`: `level === 2` /

### usePageContext().depth

If we have multiple pages layered on top of each other we get the depth the page
has.

E.g.

- `/my-regular-page`: `depth === 0`

After navigating to `overlay-one`

- `/my-regular-page`: `depth === -1`
- `/overlay-one`: `depth === 0`

After navigation to `overlay-two`

- `/my-regular-page`: `depth === -2`
- `/overlay-one`: `depth === -1`
- `/overlay-two`: `depth === 0`

### usePageContext().direction

- When navigating forward: `usePageContext().direction === 1`
- When navigating back: `usePageContext().direction === -1`

### usePageContext().backSteps

When navigating inside an overlay we need to be able to navigate back. We give a
count that shows us if we can go back

```tsx
function MyComponent {
  const { backSteps } = usePageContext();
  const router = useRouter();
  return <button onClick={backSteps > 0 && () => router.back()}>back</button>
}
```

### usePageContext().closeSteps

When tying to close an overlay we need to be able to navigate back x-times to
close the overlay. So we give the times it needs to go back.

```tsx
function MyComponent {
  const { closeSteps } = usePageContext();
  const go = useGo();
  return <button onClick={closeSteps > 0 && () => go(closeSteps * -1)}>close</button>
}
```

## Fallback routes

When an overlay is accessed by URL, it will render but it won't render as a
normal page. You can provide a fallback to render something in this case.

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
