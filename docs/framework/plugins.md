# Plugins

GraphCommerce plugin systeem stelt het in staat om GraphCommerce uit te breiden
op een plug-and-play manier. Installeer een nieuwe package en de code wordt op
de juiste plekken toegevoegd.

- Plug-and-play: Het moet mogelijk zijn om packages te installeeren waarna deze
  direct volledig werken.
- Geen runtime overhead: Het plugin systeem is volledig geimplementeerd in
  webpack en heeft daarmee geen runtime overhead en 0kB bundlesize increase.

## Welk probleem lossen we op?

Zonder plugins is de enige manier om nieuwe functionaliteit toe te voegen door
de code van je project op verschillende plekken aan te passen. Veelal geven we
props op van components om deze aan te passen om passen components in z'n geheel
aan, maar plaatsen soms ook hooks op verschillende plekken.

Bijvoorbeeld voor het toevoegen van een nieuwe betaalmethode was het nodig om de
props aan te passen van
`<PaymentMethodContextProvider methods={[...braintree]}>`

Dit zorgt voor problemen:

- Upgrades: Past GraphCommerce op ergens in de code iets aan, waar je als
  gebruiker de code al hebt aangepast, dan krijg je een upgrade conflict welke
  je handmatig moet oplossen. Door plugins te gebruiken
- Nieuwe packages: Installeer je een complexe nieuwe package, dan kan het
  voorkomen dat je op veel locaties code moet aanpassen.

## Wat is een Plugin?

Met een plugin moet het mogelijk worden om _React Components_ aan te kunnen
passen door deze te 'wrappen', maar zonder dat de code in de
`examples/magento-graphcms` of `your-project` aangepast hoeft te worden.

Voor de M2 mensen: Denk aan around plugins, maar dan zonder configuratie files
en geen performance penalty.

In de [PR](https://github.com/graphcommerce-org/graphcommerce/pull/1718) heb ik
als eerste kandidaat de
[`<PaymentMethodContextProvider />`](https://github.com/graphcommerce-org/graphcommerce/pull/1718/files#diff-d5b4da6c34d4b40dc8ac5d1c5967bc6f5aaa70d0d5ac79552f3a980b17a88ea9R115)
via plugins laten werken.

De daadwerkelijke plugins zijn:

- [AddBraintreeMethods](https://github.com/graphcommerce-org/graphcommerce/pull/1718/files#diff-14391e8c8f598e720b3e99ece1248987d68eb6133d354a3a55ef82331905be5b)
- [AddIncludedMethods](https://github.com/graphcommerce-org/graphcommerce/pull/1718/files#diff-c3d57b802463ed40925b558049a56992202be975f3c86982e6a753e2830bdb9f)
- [AddPaypalMethods](https://github.com/graphcommerce-org/graphcommerce/pull/1718/files#diff-934d7a9d597b01b6da875f61ca1cdfd57e0e0817e7126ce6216fd82dc4b6f899)
- [AddMollieMethods](https://github.com/graphcommerce-org/graphcommerce/pull/1718/files#diff-76e6fc63dee67f55cbad4f13dc7b1b764da6235b88ed8d987c7044b7ef7fc942)

Het resultaat hiervan is dat:

- De betaalmethoden worden toegevoegd aan de `<PaymentMethodContextProvider />`
  via plugins.
- Deze plugins alleen worden toegepast als de relevante package is
  geinstalleerd.

### Hoe maak ik een plugin?

Een GraphCommerce plugin moet het volgende bevatten om het werkend te krijgen:

```tsx
import {
  ComponentToExtend,
  ComponentToExtendProps,
} from '@graphcommerce/core-package/ComponentToExtend'

// Component to extend, required
export const component = 'ComponentToExtend'

// Exported location of the component that you are extending, required
export const exported = '@graphcommerce/core-package/ComponentToExtend'

// The actual plugin
export const plugin: Plugin<ComponentToExtendProps> = ({ Component }) =>
  function MyPlugin(props) {
    // Do stuff here like, wrapping, modifying props, etc.
    return <Component {...props} />
  }
```

Alle drie de exports zijn op dit moment verplicht (!), anders werkt de plugin
niet. `component` en `exported` zijn op dit moment verplicht.

### Hoe werkt het?

1. Genereer een lijst met alle packages met `graphcommerce` in de package `name`
   (bijvoorbeeld `@graphcommerce/core-package` of
   `@my-company/graphcommerce-plugin-name`.).
2. Zoek naar plugins in de packages `plugins/**/*.tsx`.
3. Analyseer de plugins, check of de `component` en `exported` exports bestaan
   en genereer de plugin configuratie.
4. Genereer `ComponentToExtend.interceptor.tsx` en plaats deze naast het het
   component.

De genereerde interceptor ziet er als volgt uit:

```tsx
import { plugin as MyPlugin } from '@my-company/graphcommerce-plugin-name/plugins/MyPlugin'
import { ComponentToExtend as ComponentToExtendBase } from './ComponentToExtend'

export * from './ComponentToExtend'

export const ComponentToExtend = [MyPlugin].reduce(
  (Component, plugin) => plugin({ Component }),
  ComponentToExtendBase,
)
```

### Mogelijkheden

In de PR heb ik de payment gateways als voorbeeld gebruikt om werkend te
krijgen, maar het moet ook gaan werken voor ander zaken zoals:

- Googletagmanager
- Googleanalytics
- Google recaptcha
- Andere payment gateways zoals we nu gebruikt hebben bij de klanten.
- Compare functionaliteit?
- Wishlist functionaliteit?
- Abstractie tussen GraphCommerce en Backends (Magento, BigCommerce,
  CommerceTools, etc.)

### Limitaties

- Het is niet mogelijk om in de root van een project een plugin te schrijven.
  Dit houd in dat deze functionaliteit (voor nu) alleen voor GraphCommerce
  packages werkt.
- Het is op dit moment álleen mogelijk om React Components uit te breiden. In
  theorie zouden andere typen plugins ook mogelijk moeten kunnen zijn.

### Persoonlijke ervaringen:

- Ik heb een Webpack plugin geschreven, wat een grote uitdaging was. Holy moly
  wat is er veel informatie over Webpack plugins te vinden, maar bijna niets
  over hoe je een Webpack plugin schrijft.
- Ik heb een AST (Abstract Syntax Tree) parser op basis van `@swc/core`
  geschreven. Dit bleek eigenlijk best goed te doen te zijn. De AST lijkt
  behoorlijk op de GraphQL AST welke ik in het verleden heb verwerkt. In de
  toekomst wil ik `component` en `exported` niet meer nodig maken, door volledig
  de AST en alle relevante informatie uit de plugin te halen.
