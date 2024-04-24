# Multiple themes/brands with multiple websites

When deciding how to develop multiple themes/brands, there are several
gradations of customizability.

Deciding on how to approach this is a trade-off between the amount of
customizability and the amount of code duplication.

## Gradations of modularization/thematization

### Level 1: One codebase, one build. Differences are configured in GraphCommerceStorefrontConfig

- Advantage: Simple, everything is easy to configure in the config.
- Advantage: Upgrade once
- Disadvantage: Not tree shakable (very large differences between brands can
  become problematic)

This requires discipline from the developer that we maintain the 'Single
responsibility' principle for components. Components that actually serve two
completely separate functionalities depending on the brand are not desirable.

Create a Config.graphqls in your graphql directory with the following contents:

```graphql
enum ThemeName {
  BRAND_1
  BRAND_2
}

extend input GraphCommerceStorefrontConfig {
  themeName: ThemeName!
}
```

Applying a different theme based on the store configuration:

```tsx
// in _app.tsx
const { themeName } = useStorefrontConfig()
const theme = useMemo(() => {
  if (themeName === 'BRAND_1') {
    const brand1Palette = ...
    return createThemeWithPalette(brand1Palette)
  }
}, [domain])
```

Applying a different component based on the store configuration:

```tsx
export function MyComponent() {
  const { themeName } = useStorefrontConfig()

  if (themeName === 'BRAND_1') return <Brand1Component>
  return <Brand2Component {...}/>
}
```

### Level 2: One codebase, multiple builds. Differences are configured in GraphCommerceConfig

- Advantage: Tree shakable
- Advantage: Upgrade once
- Disadvantage: Multiple builds
- Disadvantage: Multiple deployments

Create a Config.graphqls in your graphql directory with the following contents:

```graphql
enum ThemeName {
  BRAND_1
  BRAND_2
}

extend input GraphCommerceConfig {
  themeName: ThemeName!
}
```

During deploy you'd have to set the theme that is being build:
`GC_THEME_NAME=BRAND_1`.

Create a separate theme for each brand:

```tsx
let theme: Theme
if (import.meta.graphCommerce.theme === 'BRAND_1') {
  const brand1Palette = ...
  theme = createThemeWithPalette(brand1Palette)
} else if (import.meta.graphCommerce.theme === 'BRAND_2') {
  const brand2Palette = ...
  theme = createThemeWithPalette(brand2Palette)
}
theme.components = createOverrides(theme) as Components

export { theme }
```

Replace/Plugin a component based on the theme:

```tsx
// plugins/BRAND_1/magento-product/Replace.tsx
export const config: PluginConfig<'themeName'> = {
  type: 'replace',
  module: '@graphcommerce/magento-product',
  ifConfig: ['themeName', 'BRAND_1'],
}

export function ProductListItem(props: ProductListItemProps) {
  //...
}
```

Now when a new brand is added you can copy-paste the BRAND_1 directory and you
should be able to modify the components to your liking.

<!--
### Level 3: Monorepo with one graphcommerce instance, but a separate generic package per brand.

- Advantage: Tree shakable
- Advantage: Full flexibility
- Disadvantage: Files are copied per brand.
- Disadvantage: Upgrades are duplicated
- Disadvantage: Projects diverge quickly and become hard to maintain.

This requires you to modify all imports of the examples directory, thus making
upgrades more difficult. GraphCommerce does not offer a flexible solution for
this.

To achieve this we could: Offer a way to also handle `export * from 'my-brand'`
in plugins. -->
