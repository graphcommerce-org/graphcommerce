---
'@graphcommerce/next-ui': major
'@graphcommerce/ecommerce-ui': major
'@graphcommerce/framer-scroller': major
'@graphcommerce/magento-cart': major
'@graphcommerce/magento-cart-coupon': major
'@graphcommerce/magento-cart-items': major
'@graphcommerce/magento-customer': major
'@graphcommerce/magento-customer-order': major
'@graphcommerce/magento-product': major
'@graphcommerce/magento-product-configurable': major
'@graphcommerce/magento-review': major
'@graphcommerce/magento-search': major
'@graphcommerce/magento-wishlist': major
---

## Material UI v5 → v7 Migration

This release upgrades Material UI from v5 to v7 with full CSS variables support.

### Breaking Changes

#### CSS Variables Theme

The theme now uses MUI's CSS variables mode. Update your theme configuration:

```tsx
// Before
const theme = createTheme({
  palette: { mode: 'light', ... }
})

// After
const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'class', cssVarPrefix: '' },
  colorSchemes: {
    light: { palette: { ... } },
    dark: { palette: { ... } },
  },
})
```

#### Theme Provider Changes

Replace `DarkLightModeThemeProvider` with MUI's `ThemeProvider`:

```tsx
// Before
import { DarkLightModeThemeProvider } from '@graphcommerce/next-ui'
<DarkLightModeThemeProvider light={lightTheme} dark={darkTheme}>

// After
import { ThemeProvider } from '@mui/material'
<ThemeProvider theme={theme}>
```

Add `InitColorSchemeScript` to `_document.tsx`:

```tsx
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'

// In <body>:

;<InitColorSchemeScript attribute='class' />
```

#### Color Manipulation Utilities

MUI's `alpha()`, `lighten()`, `darken()` don't work with CSS variables. Use the new utilities:

```tsx
// Before
import { alpha, darken, lighten } from '@mui/material' // before

backgroundColor: alpha(theme.palette.primary.main, 0.5)
```

```tsx
// After
import { darkenColor, lightenColor, varAlpha } from '@graphcommerce/next-ui'

backgroundColor: varAlpha(theme.vars.palette.primary.main, 0.5)
```

#### Theme Palette Access

Use `theme.vars.palette` instead of `theme.palette` for CSS variable support:

```tsx
// Before
color: theme.palette.primary.main

// After
color: theme.vars.palette.primary.main
```

#### Dark/Light Mode Styling

Use `theme.applyStyles()` instead of `theme.palette.mode` checks:

```tsx
// Before
backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000'

// After
sx={(theme) => ({
  backgroundColor: '#000',
  ...theme.applyStyles('light', {
    backgroundColor: '#fff',
  }),
})}
```

### Component Changes

- **LoadingButton**: Moved from `@mui/lab` to `@mui/material`. Import `Button` with `loading` prop instead
- **Hidden**: Removed. Use `Box` with responsive `sx` prop: `sx={{ display: { xs: 'none', md: 'block' } }}`
- **ListItem**: The `button` prop is removed. Use `ListItemButton` component instead
- **Grid2**: Renamed to `Grid` (the old `Grid` is deprecated)

### Type Changes

- `Variant` type renamed to `TypographyVariant`
- Module augmentation paths changed from `@mui/material/styles/components` to `@mui/material/styles`
- Import `Shadows` from `@mui/material/styles` instead of `@mui/material/styles/shadows`

### New Utilities

#### `sxx()` - Simplified sx prop handling

```tsx
import { sxx } from '@graphcommerce/next-ui'

// Combines multiple sx values, handles arrays and falsy values
sx={sxx(
  { padding: 2 },
  isActive && { backgroundColor: 'primary.main' },
  props.sx
)}
```

#### CSS Variable Color Utilities

```tsx
import { varAlpha, lightenColor, darkenColor, lighten, darken } from '@graphcommerce/next-ui'

// Alpha/opacity
varAlpha(theme.vars.palette.primary.main, 0.5)

// Inline color values
boxShadow: `0 0 0 4px ${lightenColor(theme.vars.palette.primary.main, 0.5)}`

// Property with @supports fallback
sx={{ ...lighten('backgroundColor', theme.vars.palette.background.default, 0.1) }}
```
