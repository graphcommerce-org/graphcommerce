# Package responsibilities

The GraphCommerce repo is split into multiple packages to achieve upgradability,
customization and theming.

### `examples/soxbase`:

Deze gehele folder vormt de basis voor élke nieuwe GraphCommerce gebaseerde
website.

Deze folder wordt gekopieerd naar het project en gemodificeerd om het wenselijke
thema voor elkaar te krijgen.

Gezien dit een kopie is verliezen we de mogelijkheid om deze bestanden
automatisch te upgraden als wij een nieuwe release van GraphCommerce maken.

Dit betekent dat we altijd bij de release notes ‘thema upgrade’ instructies
zullen moeten meesturen.

Dit is uiteraard niet wenselijk, dus we willen zo min mogelijk code de
`examples/soxbase` folder hebben vanuit dat perspectief.

Wat gaat dan wel in de soxbase folder?

- Alles wat niet in één van de `packages/*` past (zie omschrijvingen van
  packages.) zal uiteindelijk hier terecht moeten komen.

- Alles wat project specifiek is:
  - Denk bijvoorbeeld aan het ophalen van custom attributen.
  - Data uithalen uit GraphCMS, het gehele schema van GraphCMS is
    project-specifiek, er bestaat behalve een paar Model geen vaste structuur in
    GraphCMS.

Let op: Beslissen om een bestand aan te maken in soxbase/components betekent dat
de maintenance van dat component vermenigvuldigd wordt met het aantal
installaties dat er zijn. Bijvoorbeeld:
`100 installaties * 4 uur om te upgraden = 400 uur`

Todo:

- Uitzoeken welke components we allemaal willen abstraheren (zoals ook bij
  `packages/ecommerce-ui` moet gebeuren).
- Uitzoeken of de `pages/**/*.ts` folder geen styles bevat.
- Uitzoeken of de `pages/**/*.ts` folder geen hooks bevat, behalve useQuery,
  geen useForm hooks

### `packages/magento-*`

Default Magento compatible code.

Default Magento: Niet alle backends hebben dezelfde GraphQL API. Bijvoorbeeld na
het installeren van een module komt er een extra API bij. Deze Magento packages
_moeten_ op alle Magento installaties werken.

### `packages/ecommerce-ui`

Deze package bestaat nog niet, maar het toekomstige doel van deze package is om
eCommerce specifieke UI components te realiseren (bijv. `AddToCartButton`)

Deze kunnen we dan gebruiken bij meerdere backends, maar welke niet passen in de
non-eCommerce package `packages/next-ui`

Deze components welke hier in horen bestaan nu allemaal in de
`packages/magento-*` folders. Deze components zijn nu allemaal Magento
specifiek, maar in de toekomst willen we dus meerdere eCommerce platforms
ondersteunen.

Om dit voro elkaar te krijgen maken we bijvoorbeeld van
`magento-cart/AddToCartButton`, het volgende

- `packages/ecommerce-ui/AddToCartButton`:
  - useStyles
  - div's
  - css grids
  - etc.
  - Generic props
- `packages/magento-cart/AddToCartButton`
  - GraphQL Fragments
  - useQuery / useMutation
  - `packages/ecommerce-ui/AddToCartButton`

### `packages/magento-payment-*`

Default Magento + paymentModule compatible code.

### `packages/graphcms-ui`

GraphCMS specifieke code

### `packages/next-ui`

- Dependency `@material-ui/core`
- Dependency `next`
- Dependency `framer`
- etc.

UI generieke components, maar geen eCommerce specifieke components (bijv.
`AddToCartButton`)

### `packages/framer-next-pages`

- NO Dependency `@material-ui/core`
- Dependency `framer`
- Dependency `next`

### `packages/framer-sheet`

- NO Dependency `@material-ui/core`
- NO Dependency `next`
- Dependency `framer`

### `packages/react-hook-form`

- NO dependency `next`
- NO dependency `@material-ui/core`
- Dependency `react-hook-form`
- Dependency `graphql`

## Components

Writing extendable components

### Component theming and layouts

For the users of components it’s vital that they are able to customize the theme
and layout of a component.

A lot can be accomplished by modifying the CSS of a component, to make this
possible we expose the `classes` property of a component. We’re following the
Material UI guidelines in this ragard:
https://material-ui.com/styles/advanced/#makestyles

Below is a full typescript example:

```tsx
import { Button, makeStyles, Theme, Typography } from '@material-ui/core'
import { UseStyles } from '@reachdigital/next-ui/Styles'

const useStyles = makeStyles((theme: Theme) => ({
  myComponentRoot: {
    //..your styles
  },
}))

export type MyComponentProps = UseStyles<typeof useStyles> & {
  children?: React.ReactNode
}
function MyComponent(props: MyComponentProps) {
  const classes = useStyles(props)
  return <div className={classes.myComponentRoot}>{children}</div>
}
```

### Composing multiple components

If a component is composed of multiple other components we need to pass through
all the available `classes` from the parent to the child.

Example that exposes the classes of `MyComponent`

```tsx
const useStyles = makeStyles((theme: Theme) => ({
  myWrappingComponentRoot: {
    //..your styles
  },
}))

type MyWrappingComponentProps = UseStyles<typeof useStyles> & {
  children?: React.ReactNode
} & Pick<MyComponentProps, 'classes'>

function MyWrappingComponent(props: MyWrappingComponentProps) {
  const classes = useStyles(props)
  return (
    <div className={classes.myWrappingComponentRoot}>
      <MyComponent classes={classes}>{children}</MyComponent>
    </div>
  )
}
```

There however is an exception:

### Global Styles: Styling deeply nested Button/TextField/Link/Badge/List/etc. components.

To style these components, we use Material-UI’s global theming functionality:
https://material-ui.com/customization/globals/#global-css

As a component implementor, you therefor do not need to expose all button
classes, for example:

If the previous component uses the following renderer instead, we do not need to
expose all button classes.

```tsx
function MyComponent() {
  //...other stuff
  return (
    <div className={classes.myWrappingComponentRoot}>
      <MyComponent classes={classes}>
        <Button>{children}</Button>
      </MyComponent>
    </div>
  )
}
```

We of course are allowed to expose props of `<Button/>` like `variant` etc.

```tsx
// of course, also add all the UseStyles, etc, see above examples.
type MyOtherComponentProps = Pick<ButtonProps, 'variant'>

function MyOtherComponent({ variant }: MyOtherComponentProps) {
  //...other stuff
  return (
    <div className={classes.myWrappingComponentRoot}>
      <MyComponent classes={classes}>
        <Button variant={variant}>{children}</Button>
      </MyComponent>
    </div>
  )
}
```

- Dit houd in dat na de release van GraphCommerce élke change in deze folder een
  upgrade-instructie vereist in de nieuwe release notes.

-

- Bevat de pagina assemblage.

- Als we custom components of styles
-

##

This complete folder forms the basis for each new GraphCommerce based website.

This folder will be copied to the project and modified to achieve the desired
theme/layout/etc.

Since this folder is a copy, we loose the possibility to automatically upgrade
these files when the team makes a new GraphCommerce release.
