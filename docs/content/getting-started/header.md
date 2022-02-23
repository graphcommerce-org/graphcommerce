---
menu: Build a custom header
---

> **Developer preview**  
> This is a developer preview of GraphCommerce. The documentation will be
> updated as GraphCommerce introduces
> [new features and refines existing functionality](https://github.com/ho-nl/m2-pwa/releases).

# Build a custom header in GraphCommerce

Previously, you created a GraphCommerce app and started building your custom
storefront with GraphCommerce. You're now ready to build a custom header for
your app.

In this tutorial, you'll accomplish a series of tasks to add some specific
functionality to your app. Your final app will be simple, but you'll learn where
to find resources to build more complex features on your own.

## After you've finished this tutorial, you'll have accomplished the following:

- Edited the layout component to remove components
- Add a simplified search Icon button
- Make a local copy of the MenuFab component and update it's imports
- Change the Menu component's styling to a fullscreen overlay

<figure>

https://user-images.githubusercontent.com/1251986/154978614-8d2eaee1-d64b-4bae-a7d7-cfee2e9175d3.mp4

<video width="100%" controls autoPlay muted>
<source src="https://user-images.githubusercontent.com/1251986/154978614-8d2eaee1-d64b-4bae-a7d7-cfee2e9175d3.mp4" type="video/mp4"/>
</video>

  <figcaption>Before customization of the header</figcaption>
</figure>

<figure>

https://user-images.githubusercontent.com/1251986/154979091-89c72d68-c62f-451c-af49-6f36f3fa6609.mp4

<video width="100%" controls autoPlay muted>
<source src="https://user-images.githubusercontent.com/1251986/154979091-89c72d68-c62f-451c-af49-6f36f3fa6609.mp4" type="video/mp4"/>
</video>

  <figcaption>After customization of the header</figcaption>
</figure>

### Move and justify the logo

- In /components/Layout/LayoutFull.tsx, move `<Logo />` after
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
 <img src="https://cdn-std.droplr.net/files/acc_857465/v0jqud" />
 <figcaption>Reorder components</figcaption>
</figure>

### Remove DesktopNavBar

- In /components/Layout/LayoutFull.tsx, remove the
  `<DesktopNavBar>...</DesktopNavBar>` component.

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/S1BIyc" />
 <figcaption>Remove navigation</figcaption>
</figure>

### Replace Search input with Search Fab

- In /components/Layout/LayoutFull.tsx, replace
  `<SearchButton onClick={onSearchStart} label=' ' />` with:

```tsx
<PageLink href='/search' passHref>
  <Fab aria-label={t`Search`} size='large' color='inherit'>
    <SvgIcon src={iconSearch} size='large' />
  </Fab>
</PageLink>
```

- Add `iconSearch` to the excisting imports from `'@graphcommerce/next-ui'` at
  the top of the file

### Remove Customer Service Fab

- In /components/Layout/LayoutFull.tsx, remove the Customer Service floating
  action button by removing it completely:

```tsx
<PageLink href='/service' passHref>
  <Fab aria-label={t`Account`} size='large' color='inherit'>
    <SvgIcon src={iconCustomerService} size='large' />
  </Fab>
</PageLink>
```

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/7eadNI" />
 <figcaption>Replace search input with Search Fab, remove Customer Service Fab</figcaption>
</figure>

### Make a local copy of the MenuFab component

- In /components/Layout/LayoutFull.tsx, remove `MenuFab` from the
  `'@graphcommerce/next-ui'` import
- Add `import { MenuFab } from './MenuFab'` to the list of imports at the top of
  the file

- Make a copy of /node_modules/@graphcommerce/next-ui/LayoutParts/MenuFab.tsx
  and move it to the directory /components/Layout/MenuFab.tsx
- In /components/Layout/MenuFab.tsx, change
  `const MotionDiv = styled(m.div)({})` to:
  ```ts
  const MotionDiv = styled('div')({})
  ```
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
  SvgIcon,
} from '@graphcommerce/next-ui'
import { styled, Box, Fab, Menu, ListItem, Divider, alpha } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
```

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/O1iBQ4" />
 <figcaption>Local copy of the MenuFab component with Fab scroll animation removed</figcaption>
</figure>

### Change the Menu component's styling

- In /components/Layout/MenuFab.tsx, change the `<Menu>` component's PaperProps
  prop to:

```tsx
PaperProps={{
  sx: (theme) => ({
    width: '100vw',
    height: '100vh',
    maxWidth: '100vw',
    maxHeight: '100vh',
    backgroundColor: alpha(theme.palette.text.primary, 0.95),
    color: theme.palette.background.paper,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    '& svg': {
      color: theme.palette.background.paper,
    },
  }),
}}
```

- Remove the `<Menu>` component's prop 'disableScrollLock`
- Add a two props to the `<Menu>` component:

```tsx
marginThreshold={0}
TransitionComponent={Fade}
```

- Add the import of 'Fade' to the list of the `'@mui/material'` imports at the
  top of the file
- Remove the search component by removing:

```tsx
  search ? (
    <ListItem key='search' dense sx={{ mb: '6px', borderColor: 'red' }}>
      {search}
    </ListItem>
  ) : null,
```

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/RyXlBV" />
 <figcaption>Menu component with custom styling</figcaption>
</figure>

# Next steps

- Learn more about creating
  [styled components with the styled() utility](../framework/theming.md)
