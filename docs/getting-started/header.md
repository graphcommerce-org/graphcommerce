---
menu: 3. Build a custom header
metaTitle: Build a custom header
---

# Build a custom header in GraphCommerce

Previously, you created a GraphCommerce app and started building your custom
storefront with GraphCommerce. You're now ready to build a custom header for
your app.

In this tutorial, you'll accomplish a series of tasks to add some specific
functionality to your app. Your final app will be simple, but you'll learn where
to find resources to build more complex features on your own.

### After you've finished this tutorial, you'll have accomplished the following:

- Edited the layout component to remove components
- Add a simplified search Icon button
- Make a local copy of the MenuFab component and update its imports

### Requirements

You've familiarized yourself with
[React ↗](https://reactjs.org/docs/getting-started.html),
[Next.js ↗](https://nextjs.org/docs/getting-started), and
[Mui ↗](https://mui.com/getting-started/installation/). GraphCommerce is a
frontend React framework that uses Next.js for server-side rendering.

---

### Move and justify the logo

- In /components/Layout/LayoutNavigation.tsx, move `<Logo />` after
  `<DesktopNavBar>...</DesktopNavBar>`
- Wrap the `<Logo />` component in a `<Box>` component:

```tsx
<Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
    pointerEvents: 'none',
  }}
>
  <Logo />
</Box>
```

- Add the import of 'Box' to the list of the `'@mui/material'` imports at the
  top of the file
- Save the file to see your changes updated in real-time

<figure>

![Reorder components](https://user-images.githubusercontent.com/1251986/157832587-f222dce8-b1e9-486d-8758-22d692811b26.png)

 <figcaption>Reorder components</figcaption>
</figure>

### Remove DesktopNavBar

- In /components/Layout/LayoutNavigation.tsx, remove the
  `<DesktopNavBar>...</DesktopNavBar>` component.

<figure>

![Remove navigation](https://user-images.githubusercontent.com/1251986/157832638-b0197914-a8c9-4f01-a4f3-c40a6eae39e9.png)

 <figcaption>Remove navigation</figcaption>
</figure>

### Replace Search input with Search Fab

- In /components/Layout/LayoutNavigation.tsx, replace
  `<SearchLink href='/search' />` with:

```tsx
<PageLink href='/search' passHref>
  <Fab aria-label={t`Search`} size='large' color='inherit'>
    <IconSvg src={iconSearch} size='large' />
  </Fab>
</PageLink>
```

- Add `iconSearch` to the existing imports from `'@graphcommerce/next-ui'` at
  the top of the file

### Remove Customer Service Fab

- In /components/Layout/LayoutNavigation.tsx, remove the Customer Service
  floating action button by removing it completely:

```tsx
<PageLink href='/service' passHref>
  <Fab aria-label={t`Account`} size='large' color='inherit'>
    <IconSvg src={iconCustomerService} size='large' />
  </Fab>
</PageLink>
```

<figure>

![Replace search input](https://user-images.githubusercontent.com/1251986/157832688-f16e3097-77a6-4c03-899a-1cebc0bc2db8.png)

 <figcaption>Replace search input with Search Fab, remove Customer Service Fab</figcaption>
</figure>

### Make a local copy of the MenuFab component

- In /components/Layout/LayoutNavigation.tsx, remove `MenuFab` from the
  `'@graphcommerce/next-ui'` import
- Add `import { MenuFab } from './MenuFab'` to the list of imports at the top of
  the file

- Make a copy of /node_modules/@graphcommerce/next-ui/LayoutParts/MenuFab.tsx
  and move it to the directory /components/Layout/MenuFab.tsx
- Remove the `style={{...}}` prop from both the `<MotionDiv>` components to
  remove the Fab scroll animation
- Remove `const { opacity, scale, shadowOpacity } = useFabAnimation()`

- Update all imports:

```tsx
import {
  extendableComponent,
  responsiveVal,
  iconClose,
  iconMenu,
  IconSvg,
} from '@graphcommerce/next-ui'
import { styled, Box, Fab, Menu, ListItem, Divider, alpha } from '@mui/material'
import { useRouter } from 'next/compat/router'
import React, { useEffect } from 'react'
```

<figure>

![Local copy of the MenuFab component](https://user-images.githubusercontent.com/1251986/157832754-3766f92c-ffd7-48ed-8cb8-09e1cccfc044.png)

 <figcaption>Local copy of the MenuFab component with Fab scroll animation removed</figcaption>
</figure>

## Next steps

- Learn how to [build pages](../getting-started/pages.md) in GraphCommerce
- Learn more about creating
  [styled components with the styled() utility](../framework/theming.md)
