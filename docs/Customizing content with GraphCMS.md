# Customizing the website with GraphCMS

Assumes knowledge about [GraphCMS](https://graphcms.com/)

Topics:

- Page content creation pipeline
- Replacing components per page
- Add your own union fields to models
- Cross API data fetching

## Page content creation pipeline

1. Create an entity (model) in GraphCMS
2. Create data retrieval structure (graphql fragment) in codebase
3. Create a component which renders the retrieved data
4. Add the newly created entity to a relation field in GraphCMS
5. Add the Component to the renderer for a field.
6. Add content so something can be displayed

### 1. Create an entity (model) in GraphCMS

Most commonly you'd want to create a new Row component, so we're using
`RowColumnThree` as an example here.

- A Row models must have an `identity` at least. This field is only used
  internally, but if you don't have _any_ text field in model, it becomes very
  hard to recognize a row as they will all have it's gibrish ID as name (in
  GraphCMS).
- Add fields you'd like to be used.

### 2. Create data retrieval structure (graphql fragment) in codebase

In the GraphQL explorer (http://localhost:3001/api/graphql) create a fragment
for your data `ComponentName.graphql`. e.g.:
[`RowColumnThree.graphql`](../examples/soxbase/components/RowColumnThree/RowColumnThree.graphql)

If the development environment is up and running it will create a
`ComponentName.gql.ts` with a `ComponentNameFragment` type. e.g.:
[`RowColumnThree.gql.ts`](../examples/soxbase/components/RowColumnThree/RowColumnThree.gql.ts)

### 3. Create a component which renders the retrieved data

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
[`RowColumnThree`](../examples/soxbase/components/RowColumnThree/index.tsx)

### 4. Add the newly created entity to a relation field in GraphCMS

Add the newly created model to the reference on another model where we want to
do be able to use it. Add it to 'Models to Reference':

![Add union](./union.png)

Restart your dev environment

### 5. Add the Component to the renderer for a field.

Different types are rendered with the
[`<RenderType />`](../packages/next-ui/RenderType/index.tsx) component.

For example, to add a new renderer to the Page model, add it to the `renderer`
object in the
[`<Page/>` component](../examples/soxbase/components/Page/index.tsx).

If you've followed the previous steps, the `renderer` entity should already have
an error that it is missing a renderer for your new Model:
`Property 'RowMyThing' is missing in type`

### 6. Add content so something can be displayed

Now everything should be hooked up and you are able to add content in GraphCMS.
If everything went well, it should render your component with the GraphCSM data.

## Replacing components per page

todo: expand topic

Provide renderer to [`<Page/>`](../examples/soxbase/components/Page/index.tsx)

## Add your own union fields to models

todo: expand topic

1. Create an entity with a relation field which is a union.
2. Create a component that uses TypeRenderer to render each available entity

## Cross API data fetching

todo: should probably be handled by the mesh, but not fleshed out yet
