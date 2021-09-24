# Package responsibilities

The GraphCommerce repo is split into multiple packages to achieve upgradability,
customization and theming.

To keep technical debt to a minimum we only allow certain dependencies to be
included for each package.

## `examples/magento-graphcms`:

This folder forms the basis for _each_ new GraphCommerce based website.

### Minimal code

This folder _will_ be copied to a project and modified by developers to create
the their website. Since this is a copy of the `examples/magento-graphcms`
folder it loses simple `git pull / yarn upgrade` automatic-upgrade possibilities
when a new release of GraphCommerce is made.

This means that when changes get made to the `examples/magento-graphcms` folder,
the release notes **must** contain upgrade instructions how to upgrade this
folder.

To minimize this, we want as little code as possible in this folder.

### Maximum customizability

The first instinct might be to move as much code to the packages as possible,
but when doing that the developer is unable to 'compose' or 'assemble' a
website.

### Disallowed methods

The methods are not allowed and should be integrated in components (see
[Writing extendable components](./writing-extendable-components.md)):

- [`makeStyles`](https://material-ui.com/styles/api/#returns-3): styling should
  go in components.
- `useStyles` hooks created by `makeStyles`
- [`useState` / etc](https://reactjs.org/docs/hooks-reference.html) should go in
  components
- `useMutation`
- `useForm` / `useFormGqlMutation` / etc.

### Allowed methods

- `useQuery(Document, { ssr: false })`
- `useRouter().push` / `usePageRouter()`
- custom hooks, depending on the hook

### Working with the `examples/magento-graphcms` folder

Wat gaat dan wel in de magento-graphcms folder?

- Alles wat niet in één van de `packages/*` past (zie omschrijvingen van
  packages.) zal uiteindelijk hier terecht moeten komen.

- Alles wat project specifiek is:
  - Denk bijvoorbeeld aan het ophalen van custom attributen.
  - Data uithalen uit GraphCMS, het gehele schema van GraphCMS is
    project-specifiek, er bestaat behalve een paar Model geen vaste structuur in
    GraphCMS.

Let op: Beslissen om een bestand aan te maken in magento-graphcms/components
betekent dat de maintenance van dat component vermenigvuldigd wordt met het
aantal installaties dat er zijn. Bijvoorbeeld:
`100 installaties * 4 uur om te upgraden = 400 uur`

- Pagina's moeten zo assembleerbaar mogelijk zijn. De 'blokken' welkje op de
  pagina ziet, zou je gemakkelijk moeten kunnen terug vinden in je pages-file.
- Maak geen 'Assemblage'-components welke zelf niks doen en alleen een simpele
  renderer heeft. Dat hoort in de `pages/*` van magento-graphcms.

### `packages/magento-*`

- **Must be** compatible with all Magento backends (for versions that we
  support)
- **Must not** include any code that isn't available on all platforms.

Not all Magento installations have the same GraphQL API. After installing a
module the GraphQL API can change. Pay extra close attention while developing to
not include any backend specific code.

### `packages/magento-product*`

- `packages/magento-product` contains only generic product code, like listings,
  etc.
- `pacakges/magneto-product-${type}`: implements product type specific stuff.

### `packages/magento-payment-*`

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

##

This complete folder forms the basis for each new GraphCommerce based website.

This folder will be copied to the project and modified to achieve the desired
theme/layout/etc.

Since this folder is a copy, we loose the possibility to automatically upgrade
these files when the team makes a new GraphCommerce release.
