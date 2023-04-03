# Theming

The GraphCommerce [magento-graphcms](../getting-started/readme.md) example and
GraphCommerce components are built with [MUI ↗](https://mui.com/). MUI provides
a robust, customizable, and accessible library of foundational and advanced
components, enabling you to build your design system and develop React
applications faster.

This guide covers how to customize the global look and feel of your application,
as well as some common theming needs.

## Changing the color palette

The global styles or your GraphCommerce app are located in /components/theme.ts.
To customize the app with your preferred colors, change the primary, secondary
and text colors. Save the file to see your changes updated in real-time:

```json
  primary: {
    main: '#FF4A55',
    contrastText: '#FFFFFF',
    dark: '#F33642',
  },
  secondary: {
    main: '#006BFF',
    light: '#D1E4FF',
    contrastText: '#ffffff',
  },
  ...
  text: {
    primary: '#000000',
    secondary: '#00000050',
    disabled: '#00000030',
  },
```

You can search through your codebase to discover which components will be
affected by your changes. For example, search for occurrences of
`theme.palette.primary.main`.

### Best practices

- Limit the number of global style overwrites in /components/theme.ts. to a
  minimum if possible. In most cases, styling within the context of a component
  is the better solution.

## Styling component with props

Most components have props that define their look and feel. Most common are the
`color` and `variant` props:

```tsx
<Button
  ...
  color='primary'
  variant='pill'
  >
</Button>
```

- Learn about a component's features in the MUI documentation:
  [MUI Button documentation ↗](https://mui.com/components/buttons/)
- To learn which options are accepted by a prop, refer to the component's API:
  [MUI Button API ↗](https://mui.com/api/button/). You can also use your IDE's
  suggestions functionality. For [VS Code's](../framework/vscode.md)
  IntelliSense feature, type Ctrl+Space.
- It can be helpful to learn how a component is styled, for example, to explore
  how palette variables are used. Refer to the
  [MUI Button source code ↗](https://github.com/mui/material-ui/blob/main/packages/mui-material/src/Button/Button.js)

## Change a component's styling with the sx prop

A simple way to style a component is by using the
[sx prop ↗](https://mui.com/system/the-sx-prop/). To get started with the sx
prop in your GraphCommerce storefront, refer to
[start building a GraphCommerce custom storefront](../getting-started/start-building.md).

### Accessing the theme

To access the theme object, set an anonymous function as the value of the
property:

```tsx
sx={{
  borderRadius: 2,
  backgroundColor: (theme) => theme.palette.primary.main,
}}
```

To use the theme object for multiple property's:

```tsx
sx={(theme) => ({
  borderRadius: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.primary.main,
})}
```

## Creating styled components with the styled() utility

A more advanced way is to use the
[MUI styled() ↗](https://mui.com/system/styled/) utility for creating styled
components:

```tsx
import { styled } from '@mui/material'

const AnimatedButton = styled(Button, { name: 'animatedButton' })(
  ({ theme }) => ({
    '@keyframes pulse': {
      '0%': {
        boxShadow: `0 0 0 0 ${theme.palette.primary.main}`,
      },
      '100%': {
        boxShadow: `0 0 0 15px ${theme.palette.background.default}`,
      },
    },
    animation: 'pulse 1.5s infinite',
  }),
)
```

```tsx
<AnimatedButton color='primary' variant='contained'>
  <Trans>About Us</Trans>
</AnimatedButton>
```

<figure>

https://user-images.githubusercontent.com/1251986/155032870-ddecefe0-afb3-418c-af3d-91d8bc435dff.mp4

<video width="100%" controls autoPlay loop muted playsInline>
<source src="https://user-images.githubusercontent.com/1251986/155032870-ddecefe0-afb3-418c-af3d-91d8bc435dff.mp4" type="video/mp4"/>
</video>

 <figcaption>Example of a styled component</figcaption>
</figure>

## Overriding components state styling

To overwrite a component's hover state, add the sx prop:

```tsx
<Button
  color='primary'
  variant='contained'
  sx={{ '&:hover': { background: 'green' } }}
>
  <Trans>Contact Us</Trans>
</Button>
```

> Learn more about
> [overriding styles with class names ↗](https://mui.com/customization/how-to-customize/#overriding-styles-with-class-names)
> in the MUI documentation

## Adding a background image

- In /Layout/LayoutFull.tsx, add the sx prop to the `<LayoutDefault>` component:

```tsx
<LayoutDefault sx={{ backgroundImage: `url(/images/stripes.svg)` }} />
```

- Place your background image in the /public/images directory

## Customizing default border-radius

All components that render content with a border-radius, except for pill buttons
and circular buttons, are dependent on the value of `shape`. A simple way to
remove this effect is to set its value to 0:

```tsx
  shape: { borderRadius: 0 },
  typography: {
```

## Adding an external CSS style sheet

- In /pages/\_document.tsx, add your CSS `<link>` element as a child of the
  `<Head>` component:

```tsx
<Head>
  ...
  <link
    rel='stylesheet'
    type='text/css'
    media='all'
    href='https://www.graphcommerce.org/pagebuilder.min.css'
  />
</Head>
```

- The external CSS file will affect the styling of all your app's pages

## Styling a component with CSS from external style sheet

- Add the fetch query to the `getStaticProps` function of a page

```ts
const stylesheet = await(
  await fetch('https://www.graphcommerce.org/pagebuilder.min.css'),
).text()
```

- Pass the data as prop:

```ts
return { props: { ...stylesheet } }
```

- Specify its type:

```ts
function CategoryPage(props: Props & { stylesheet: string }) {

```

- Add it to the default function's props:

```ts

const { categories, products, ..., stylesheet } = props

```

- Use the sx prop to apply the styles

```tsx
<CategoryDescription
  description={category.description}
  sx={{ stylesheet, minWidth: '100vw' }}
/>
```

## Lineair scaling with responsiveVal

The helper function `responsiveVal` offers lineair scaling based on the viewport
width. For example: `responsiveVal(16, 22)` will render 16px at 320px window
width, 22px at 1280px window width.

`responsiveVal` can be used to linear scale almost all CSS properties, including
width, borderRadius and margin. Performance-wise, font-size and line-height
should not be scaled with responsiveVal. To learn more, look into
[responsive font sizes](../framework/typography.md).

## Next steps

- Learn about [icons](../framework/icons.md) in GraphCommerce
- Learn more about
  [customizing components ↗](https://mui.com/customization/how-to-customize/#overriding-styles-with-class-names)
  in the MUI documentation
- Take a look at MUI's
  [Default Theme object ↗](https://mui.com/customization/default-theme/)
- Learn more about a component's default styles by looking them up in the
  [MUI repository ↗](https://github.com/mui/material-ui/tree/main/packages/mui-material/src)
