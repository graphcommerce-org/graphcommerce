Ander thema

Hoe kunnen we meerder brands met één GraphCommerce instance bedienen.

Eén build

Eén codebase meerdere builds

In de file waarin je dingen wilt aanpassen kun je een if statement maken.

Op het moment dat we een configuratie maken in GraphCommerceConfig.

Tree shakable: GraphCommerceConfig

Niet tree shakable: GraphCommerceStorefrontConfig

# Gradaties van modularisatie/thematisatie

## Niveau 1: Eén codebase, één build. Verschilen doen we in GraphCommerceStorefrontConfig

- Voordeel: Eenvoudig, alles is makkelijk te configureren in de config.
- Voordeel: Eénmaal upgraden
- Nadeel: Niet treeshakable (hele grote verschillen tussen brands kunnen
  problematisch worden)

Dit vereist discipline van de developer dat we het 'Single responsibility'
principe voor components behouden. Components die eigenlijk twee volledig aparte
functionaliteiten bedienen afhankelijk van het brand zijn niet wenselijk. Dit
lijkt een beetje bij Vaessen te zijn gebeurd.

```tsx
// in _app.tsx
const { domain } = useStorefrontConfig()
const theme = useMemo(() => {
  if (domain === 'dark') {
    const brand1Palette = ...
    return createThemeWithPalette(brand1Palette)
  }
}, [domain])
```

## Niveau 2: Eén codebase, meerdere builds. Verschillen doen we in GraphCommerceConfig

- Voordeel: Tree shakable
- Voordeel: Snellere deploys
- Voordeel: Eénmaal upgraden
- Nadeel: Deployment per server

```tsx
let theme: Theme
if (import.meta.graphCommerce.theme === 'BRAND_1') {
  const brand1Palette = ...
  theme = createThemeWithPalette(brand1Palette)
} else if (import.meta.graphCommerce.compareVariant === 'BRAND_2') {
  const brand2Palette = ...
  theme = createThemeWithPalette(brand2Palette)
}
theme.components = createOverrides(theme) as Components

export { lightTheme }
```

## Niveau 3: Monorepo met één graphcommerce instance, maar een aparte generieke package per brand.

https://github.com/vercel/commerce/blob/65c9d39ae61cdccfbc871605a276a89687e88e32/site/commerce-config.js

- Al onze imports in de exmaple directory aanpassen naar één
  '@graphcommerce/magento'.
- In de tsconfig wordt het path van
  `'@graphcommerce/magento-product': ['../brands/daxtrio/magento-product']`
  getset.

Dit werkt niet, want uitieindelijk moeten we @graphcommerce/magneot-product
resolven.

- File based routing (pages folder) blijft as is. Per pagina kun je wel een 404
  terug geven bijvoorbeeld. We zouden a.h.v. het brand wat je bekijk ook in de
  pages directory pageX.daxtrio.tsx kunnen maken en dan a.d,v,
  https://nextjs.org/docs/pages/api-reference/next-config-js/pageExtensions#including-non-page-files-in-the-pages-directory
  de pagina's kunnen includen.

- Symlinken?

## Niveau 4: Monorepo met meerdere graphcommerce instances, één codebase, meerdere builds.

- Nadeel: Vereist een 'copy-paste' van de 'magento-hygraph' folder.
- Nadeel: Upgrades zijn dubbel
- Nadeel: Na de initiele copy-paste gaan de projecten direct divergeren en
  kunnen eignelijk nog meer in sync gehouden worden.

## Vraag: Hoe gaan we om met custom componenten per project?

```tsx
function ActualComponent(props) {
  <div>ActualComponent</div>
}

function MyComponent(props) {
  if (import.meta.graphCommerce.theme !== 'BRAND_1') return null
  return <ActualComponent {...}/>
}
```

## Stel we doen dit op 50 plekken en we willen later een nieuw brand toevoegen?
