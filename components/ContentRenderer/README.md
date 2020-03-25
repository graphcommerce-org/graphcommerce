# Content Renderer

Allow for rendering of content models retrieved by GraphQL.

## Creating a new Component for a Model

1. Create a GraphQL fragment ([example](../HeroBanner/HeroBanner.graphql)) that
   defines the data required for your component.
2. Create a component where the Props are defined by the Fragment just created
   (eg GQLHeroBannerFragment)
3. Create a renderer which renders the component.

## Registering a default Component

1. Edit the [defaultRenderer](./defaultRenderer.tsx) and add renderer
2. Add the just created fragment to
   [ContentRenderer.graphql](./ContentRenderer.graphql);

## Overriding Components per template

1. `import { renderers } from '.'`
2. `renderers.HeroBanner = dynamic<GQLHeroBannerFragment>(() => import('../HeroBanner'))`

Note: Since the Model doesn't change, the data requirements don't change either,
so no need to change the data loading method.

## Todo

- [ ] Should probably make more generic.
