# Content Renderer

Allow for rendering of content models retrieved by GraphQL.

## Create Model in GraphCMS

1. Create a new model

## Creating a new Component for a Model

1. Create a GraphQL fragment ([example](components/RowHero/RowHero.graphql))
   that defines the data required for your component.
2. Create a component where the Props are defined by the Fragment just created
   (eg GQLRowHeroFragment)

## Registering a default Component

1. Edit the [defaultRenderer](./defaultRenderer.tsx) and add renderer
2. Add the just created fragment to
   [ContentRenderer.graphql](./ContentRenderer.graphql);

## Fetching additional data

TODOOOOOO To load additional you can define a getStaticProps method on your
components add to `registerGetStaticProps` in
[defaultRenderer](./defaultRenderer.tsx).

!! Make sure you only do dynamic imports, else te bundle size will increase.

## Overriding Components per page

```
import RowHeroHome from 'components/RowHeroHome'

<ContentRenderer
   content={page.content}
   customRenderers={{
      RowHero: RowHeroHome,
   }}
/>
```
