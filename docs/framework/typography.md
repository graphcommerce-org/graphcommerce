# Typography

This guide provides information about using the Typography component and
customizing your GraphCommerce storefront's typography. If your looking to learn
about the `<Trans>` macro, head over to
[translations](../framework/translations.md).

## Using the typography component

The `<Typography>` component is used to render text on pages and in components:

```tsx
<Typography variant='h1' component='h4'>
  <Trans>This is the homepage</Trans>
</Typography>
```

Will output:

```tsx
<h4 class='MuiTypography-root MuiTypography-h1'>This is the homepage</h4>
```

It's important to realize that the style of a typography component is
independent from the semantic underlying element. In the example above, the
variant prop is used to render a `<h4>` semantic element with h1 styling.

## Changing font styles and font sizes

Font styles are part of the global styles in /components/index.ts. Changes to
font-size and few other properties can be made here:

```tsx
  h1: {
    ...fontSize(28, 64),
    fontWeight: 700,
    fontVariationSettings: "'wght' 660",
    lineHeight: 1.22,
  },
  h2: {
    ...fontSize(25, 40),
    fontWeight: 700,
    fontVariationSettings: "'wght' 630",
    lineHeight: 1.35,
  },
  h3: {
    ...fontSize(22, 30),
    fontWeight: 700,
    fontVariationSettings: "'wght' 680",
    lineHeight: 1.55,
  },
  ...
```

In most other cases, styling within the context of a page or component is the
better solution. The sx prop is used to overwrite the styling of a Typography
component:

```tsx
<Typography
  variant='h3'
  component='div'
  gutterBottom
  sx={{
    h3: (theme) => ({
      color: theme.palette.primary.main,
    }),
  }}
>
  {product.name}
</Typography>
```

## Responsive font sizes

The fontSize 'property' accepts an object with a font size for each breakpoint:

```tsx
fontSize: {
  lg: 50,
  md: 40,
  sm: 25,
  xs: 15
}
```

The GraphCommerce helper function `breakpointVal` does the same, but simplifies
the syntax by calculating the intermediate values (`fontSize` is a
simplification of `breakpointVal`):

```tsx
// Example from /components/theme.ts

h1: {
  ...fontSize(28, 64),
  fontWeight: 700,
  fontVariationSettings: "'wght' 660",
  lineHeight: 1.22,
},
```

To use breakpointVal in a component:

```tsx
sx={{
  ...breakpointVal('fontSize', 36, 82, theme.breakpoints.values),
}}
```

## Adding a custom font

- In /pages/\_document.tsx, add your Google font `<link>` element as a child of
  the `<Head>` component:

```tsx
<Head>
  ...
  <link rel='preconnect' href='https://fonts.googleapis.com' />
  <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
  <link
    href='https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;1,400;1,600&display=swap'
    rel='stylesheet'
  />
</Head>
```

- In /components/theme.ts, add the font to the global fontFamily, or to specific
  font class like h1:

```tsx
typography: {
  fontFamily:
    'Open Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
  // @see docs typography.md
  h1: {
    fontFamily: 'Open Sans',
```

## Next steps

- Learn more about the
  [Typography component ↗](https://mui.com/components/typography/) in the MUI
  documentation
