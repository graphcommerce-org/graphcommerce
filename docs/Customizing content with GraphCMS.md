# Customizing the website with GraphCMS

Assumes knowledge about [GraphCMS](https://graphcms.com/)

Topics:

- Page content creation pipeline
- Replacing components per page
- Add your own union fields to models
- Cross API data fetching

## Page content creation pipeline

To add content from GraphCMS we've got a generic content management pipeline.

1. Create GraphCMS Model
2. Add to relation field in GraphCMS
3. Add content
4. Create a data fragment
5. Create a component
6. Add the renderer
7. Add to a query

### 1. Create an entity (model) in GraphCMS

Most commonly you'd want to create a new Row component, so we're using
`RowColumnThree` as an example here.

- A Row models must have an `identity` at least. This field is only used
  internally, but if you don't have _any_ text field in model, it becomes very
  hard to recognize a row as they will all have it's gibrish ID as name (in
  GraphCMS).
- Add fields you'd like to be used.

### 2. Add the newly created entity to a relation field in GraphCMS

Add the newly created model to the reference on another model where we want to
do be able to use it. Add it to 'Models to Reference':

![Add union](./union.png)

### 3. Add content so something can be displayed

Now everything should be hooked up and you are able to add content in GraphCMS.

### 4. Create data retrieval structure (graphql fragment) in codebase

In the GraphQL explorer (http://localhost:3001/api/graphql) create a fragment
for your data `ComponentName.graphql`. e.g.:
[`RowColumnThree.graphql`](../examples/magento-graphcms/components/Row/RowColumnThree/RowColumnThree.graphql)

If the development environment is up and running it will create a
`ComponentName.gql.ts` with a `ComponentNameFragment` type. e.g.:
[`RowColumnThree.gql.ts`](../examples/magento-graphcms/components/Row/RowColumnThree/RowColumnThree.gql.ts)

### 5. Create a component which renders the retrieved data

```tsx
import { ComponentNameFragment } from './ComponentName.gql'
function ComponentName(props: ComponentNameFragment) {
  const { field, field2 } = props
  return (
    <div>
      {field} {field2}
    </div>
  )
}
```

Example:
[`RowColumnThree`](../examples/magento-graphcms/components/Row/RowColumnThree/index.tsx)

Restart your dev environment

### 6. Add the Component to the renderer for a field.

Different types are rendered with the
[`<RenderType />`](../packages/next-ui/RenderType/index.tsx) component.

For example, to add a new renderer to the Page model, add it to the `renderer`
object in the
[`<Page/>` component](../examples/magento-graphcms/components/Page/index.tsx).

If you've followed the previous steps, the `renderer` entity should already have
an error that it is missing a renderer for your new Model:
`Property 'RowMyThing' is missing in type`

### 7. Add your fragment to the Query

To actually fetch data, add your created fragment to a query.

For example, to add a new renderer to the Page model, add your fragment here:
[`Page.graphql`](../examples/magento-graphcms/components/Page/Page.graphql).

## Replacing components per page

todo: expand topic

Provide renderer to
[`<Page/>`](../examples/magento-graphcms/components/Page/index.tsx)

## Add your own union fields to models

todo: expand topic

1. Create an entity with a relation field which is a union.
2. Create a component that uses TypeRenderer to render each available entity

## Cross API data fetching

_Danger: Creating data fetching waterfalls will cause major performance issues,
this should be used sparingly._

We're using GraphQL Mesh's possibility to add additional resolves to the mesh.

https://graphql-mesh.com/docs/getting-started/multiple-apis#stitching-schemas-using-declarative-api-without-javascript-code-file

Example implementation can be found here, look for `additionalTypeDefs` and
`additionalResolvers`
[.meshrc.json](../examples/magento-graphcms-api/.meshrc.json)
