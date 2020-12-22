# Introductie Reach Digital SSG eCommerce framework

Vandaag introduceren we een mogelijke nieuwe eCommerce frontend stack waar we
nieuwe frontends mee kunnen bouwen. De nieuwe stack zit vol fundamenten waarmee
we sneller, beter, schaalbaarder en sneller kunnen zijn.

## Design principes en doelstelling

Bij het onwikkelen van de nieuwe stack waren de allerbelangrijkste speerpunten:

- Snelheid: Altijd snel door gebruikt te maken van Headless.
- Efficient en duurzaam: Minimale server belasting bij hoog volume aan traffic
  door middel van Static Site Generation.
- DX (Developer eXperience): Ontwikkel leuk, efficient en snel door gebruik te
  maken van juiste bouwstenen en afbakeningen.
- UX (User eXperience): Fanatische klantervaring
- MX (Merchant eXperience): Schaalbaar, stabiel en uitbreidbaar.

## Technische stack

### Headless

Laad data uit backend API's zodat er een glasheldere splitsing ontstsaat tussen
backends en frontends.

### Multi Backend

Koppel elke soort backend, welke API-protocol het ook gebruikt (REST, GraphQL,
SOAP, MySQL, etc.)

### Oneindig schaalbaar; Hybride statisch, server en browser gerenderde pagina's

Onderdelen welke statisch gegenereerd kunnen worden kunnen gegenereerd worden op
het moment dat nodig is:

#### Static Site Generation:

Veel bezochte pagina's worden 'on build time' gegenereerd als HTML bestanden.
Deze pagina's worden op CDN niveau gecached, waardoor deze dus super snel
geserveerd kunnen worden. Gezien CDN's niet offline gaan (staan heel veel
servers over de hele wereld voor één CDN), gaan deze pagina's niet offline als
een backend offline gaat.

In de oplossing kan exact bepaald worden welke pagina's 'on build time'
gegenereerd worden.

[build output video]

#### On demand Static Site Generation

Is een pagina niet veel bezocht dan wordt deze op het eerste bezoek genereerd.
Een bezoeker ziet in dit geval een pagina skeleton waarna in de browser de
pagina wordt gerenderd en wordt de statische variant opgeslagen op de server.

[insert skeleton loading video]

SEO: Als een SEO crawler een pagina opvraagt, dan rendert de server de pagina en
ziet de bot perfecte indexeerbare HTML en wordt ook de statische variant
opgeslagen op de server.

#### Static Site Re-generation

Pagina's zijn niet voor eeuwig juist, is een pagina out-of-date, dan wordt deze
op de achtergrond naar de nieuwe versie bijgewerkt en ziet de gebruiker de
out-of-date versie.

Hiermee behouden we ten aller tijde onze snelheid, maar leveren we iets in op
correctheid. Dit is nu vaak ook al het geval, maar nu leveren we ook in op
performance.

Dit houd inderdaad in dat we geen Varnish nodig hebben, Fastly of andere
complexe reverse-proxies. [1]

[1]: Alle klant specifieke data wordt altijd op de client ingeladen, op een
geruisloze manier.

#### Client side rendering

Is een bezoeker eenmaal op de website, dan schakelen we over op een efficientere
client renderer. In plaats van hele pagina's op te halen halen we alleen de
_data_ op van pagina's (één JSON call) en renderen we de pagina zelf op de
client.

[video van snel switchen van pagina]

#### Dynamische data en lazy loading

Door de splitsing tussen statische data en dynamische data wordt alle
klantinformatie in de browser van de gebruiker gerenderd.

In plaats van complexe custom logica te gebruiken kan in het component
aangegeven worden 'niet op de server' en deze wordt volledig door de browser
gerenderd.

Complexe dynamische onderdelen worden pas ingeladen als deze gebruikt worden:
Pas als een gebruiker met z'n muis over de minicart heen gaat of het scherm van
zijn telefoon aan raakt wordt deze data ingeladen. Doordat zeer kleine
onderdelen van een pagina ingeladen kunnen worden zijn ook deze onderdelen snel.

[video van lazy loaden winkelwagen]

### Universele applicatie

Bovenstaande technologie word took een 'Universal app' genoemd, universeel voor
de server en browser. [2] Goed voor de gebruiker, de server en voor SEO, dus
goed voor de verkoper.

[2]: PWA Studio en andere oplossingen bieden hier niets voor.

### Alle backends, één GraphQL API.

Alle communicatie vanuit het framework gebeurd aan de hand door middel van
GraphQL, of dat nu op de server gebeurd voor het statisch genereren van pagina's
of in de browser voor het ophalen van een winkelwagen, alles is GraphQL.

#### GraphQL met GraphQL Mesh + Headless

Door middel van de Open Source tool GraphQL-Mesh kunnen we meerdere backends,
welke allemaal hun eigen taal spreken (REST, SOAP, GraphQL of iet sanders),
samenvoegen tot één 'graph'.

- GraphQL introcutie
- GraphQL Code Gen
- GraphQL Playground

Hiermee is het mogelijk om price-data op te halen uit Magento, informatie uit de
PIM (Akeneo, of iets) en content uit het CMS.

Het frontend framework verbind met de backend om vervolgs puur data van backends
op te halen.

[afbeelding van mesh]

### PWA en Preloading

Geen website is compleet zonder ook een volwaardige PWA te zijn. Doordat
pagina's van tevoren gegenereerd worden, worden deze na eerste page-load direct
naar de browser gestuurd en opgeslagen.

Als pagina's nog niet gegenereerd zijn, wordt bij het bladeren op een pagina
alle mogelijke links waar een bezoeker op kan klikken verzamelt en wordt de data
hiervan direct ingeladen.

Dit kan doordat de eerder genoemde statische generatie, deze pagina's en levert
geen extra server belasting op.

[afbeelding van PWA 100/100/100/100]

#### Langzame verbindingen

Detecteert een browser een slechte 4g of 3g internetverbinding op de telefoon
dan schakelt de applicatie over op lage kwaliteit afbeeldingen. Detecteert een
snelle verbinding, dan wordt er overgeschakeld op hoge kwaliteit afbeeldingen.

### Serverless

Voor de onderdelen welke niet statisch gegenereerd kunnen worden, wordt een
Serverless functie opgestart op een AWS Lambda / Google Cloud functions. Het
voordeel van Serverless is auto-scaling. Geen onderdeel van de frontend stack
gaat offline.

### Open Source

Door gebruik te maken van de meest populaire open source oplossingen kunnen we
flexibel en schaalbaar blijven. Alle oplossingen wordt voor duizenden andere
toepassingen gebruikt en gebouwd door de giganten (Facebook, Google, Amazon,
etc.)

We maken gebruik van deze tools:

- [Next.js](https://nextjs.org/) + [React](https://reactjs.org/)
- [GraphQL](https://graphql.org/) +
  [GraphQL Code Generator](https://graphql-code-generator.com/) +
  [Apollo](https://www.apollographql.com/docs/react/)
- [GraphQL Mesh](https://graphql-mesh.com/)
- [GraphCMS](https://graphcms.com/)
- [Material UI](https://material-ui.com/)
- [Framer motion](https://www.framer.com/motion/)
- [Vercel](https://vercel.co/reachdigital)
- [react-schemaorg](https://github.com/google/react-schemaorg) +
  [schema-dts](https://github.com/google/schema-dts)

[afbeeldingen van al deze tools]

### “Easy to customize, nothing to configure” vs “configure everything customize nothing”
