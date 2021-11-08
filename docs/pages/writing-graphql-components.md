# Writing GraphQL Components

We're going to create thumbnail images for subcategories on a product listing
page. http://localhost:3000/women/business

## What you'll learn

- Creating a new component that renders GraphQL data
- Finding out how a page queries the GraphQL API
- Find out how GraphCommerce queries the GraphQL API and use that for ourselves
- Use the GraphQL Playground to be able to load your own data
- Create GraphQL Fragments and use it in a GraphQL Query
- Generate TypeScript declarations from our Fragment
- Using TypeScript Fragment declarations as props in our component

## Prerequisites

Before continuing to build your own components, a few concepts need to make
sense.

- Make sure you understand the
  [basics of Next.js](https://nextjs.org/learn/basics/create-nextjs-app). We're
  going to use `getStaticProps` in this example to fetch our data, if you don't
  know what that is yet and how it works, do the course first.
- We're using GraphQL to communicate. If concepts in this example are not clear,
  like how `Fragments`, `Queries` and `Mutations` work, consider following the
  [GraphQL Fundamentals course](https://www.howtographql.com/basics/0-introduction/).

## Writing your first GraphQL Component

1. Find the page that we want to customize.

   If you don't know to customize a something, it is always a good idea to go
   back to the `pages` directoy and find the page there and click through to the
   place you want to modify.

   In this case it's `pages/[...url].tsx` as there is no spe

2. Create a new bare component in `components/Category/ChildrenImages.tsx`.

```tsx
export function ChildrenImages() {
  return <div>Hello World</div>
}
```

3. Add to component to the page, I've added it below `<CategoryDescription`, it
   should look something like:

```tsx
          <CategoryDescription description={category.description} />
          <ChildrenImages />
```

After a few seconds (when typescript has caught up) you will see an error in
your code. The component isn't imported yet. To import ChildrenImages press the
lightbulb in front of the row and import.

If you now load the page, you should see 'Hello World' on the page.

4. Loading information on the page.

For our components, we want to load the child categories of the current category
and each child category's image+name.

### Understanding Codegen

Information for components is fetched in the getStaticProps function. If you
look at the getStaticProps function you'll see it querying for
`CategoryPageDocument`. This contains the actual query to the backend.

If you open `CategoryPageDocument` you'll see three things in that file:

- `CategoryPageDocument`: This is a GraphQL file parsed to JSON
- `CategoryPageQueryVariables` This is TypeScript declaration of the Variables
  that the Query requires, this allows for autocompletion while executing a
  query.
- `CategoryPageQuery`: This is a TypeScript declaration of the Query, this
  allowes for autocompletion in our components.

If you lookup the file in the sidebar, you'll see besides our currently opened
`CategoryPage.gql.ts` a `CategoryPage.graphql` file as well. The `gql.ts` file
is generated from the `.graphql` file.

The CategoryPage.graphql file isn't very interesting in it's self as it is just
composed of other Fragments. We can extend and modify our query to fetch
additional data.

### Modifying and extending an existing query.

Since we want to add additional information to an existing query, we first need
to find how the data is fetched. In this case the `CategoryQueryFragment`
contains the actual query that is done.

You can find that file to search for `CategoryQueryFragment ` in
`node_modules/@graphcommerce` to find
`node_modules/@graphcommerce/magento-category/queries/CategoryQueryFragment.graphql`.

In this file you'll find something like:

```graphql
fragment CategoryQueryFragment on Query {
  categories(filters: { url_path: { eq: $url } }) {
    ...fields
  }
}
```

Now open up your [local playground](http://localhost:3000/api/graphql), we're
going to query the GraphQL API and find our fields. We use the contents of the
`CategoryQueryFragment`:

```graphql
query MyQuery($url: String!) {
  # We're using a query variable here, if your unfamiliar, take the GraphQL Fundamentals course.
  categories(filters: { url_path: { eq: $url } }) {
    # find fiels, CTRL+Space should bring up the autocomplete dialog in the playground
    total_count
  }
}
```

In the bottom left supply the QUERY VARIABLES: `{"url": "women/business"}` and
Run the query.

You can play around to see what fields to query, but we probably need something
like the:

```graphql
query MyQuery($url: String!) {
  # We're using a query variable here, if your unfamiliar, take the GraphQL Fundamentals course.
  categories(filters: { url_path: { eq: $url } }) {
    items {
      children {
        name
        image
        url_path
      }
    }
  }
}
```

Copy the contents of this query to the project's `CategoryPage.graphql` (this
file is intended to be modified). It should look something like

```graphql
query CategoryPage($url: String!, $rootCategory: String!) {
  ...MenuQueryFragment
  ...FooterQueryFragment
  ...PageContentQueryFragment

  ...CategoryQueryFragment

  categories(filters: { url_path: { eq: $url } }) {
    items {
      children {
        name
        image
        url_path
      }
    }
  }
}
```

In your CLI you see something happening with `[codegen]`. If everything went
right you see `Generate outputs [completed]` in your output. If you made a
mistake, like a wrong syntax or selecting a non-existent field you see
`Generate outputs [failed]`.

Note: Make sure the generation succeeds, if it fails you can not continue to the
next step

### Using the results

If you add console.log right before your return statement you should see the
newly fetched data. Make sure to refresh the page this time, as all the
information needs to be refeched.

```tsx
function CategoryPage(props: Props) {
  ///...other stuff

  console.log(category)
  return (
    ///..stuff
  )
}
```

It should be in `children[0].image` for example.

In our component we want to use the results. We can pass the information to the
component like so:

```tsx
<ChildrenImages children={category.children} />
```

However, TypeScript will throw an error
(`Property 'children' does not exist on type 'IntrinsicAttributes'.`), because
we haven't specified what props are allowed in the component.

## Creating a Fragment for our fields

We could create the types manually, but we're not going to do that. We're going
to let GraphQL Codegen generate them for us.

If we create a Fragment and use that in our query, GraphQL Codegen will
automatically create TypeScript declarations for our fragments that we can use
in our component.

First we're going to create a fragment
`components/Category/ChildrenImages.graphql` that has the fields that we've
queried above.

```graphql
fragment ChildrenImages on CategoryTree {
  children {
    name
    image
    url_path
  }
}
```

Note: Codegen should now run and create a `gql.ts` file for us besides the
`.graphql` file.

Note to create a fragment we need to specifiy for what the fragment is created
`on CategoryTree`. To find the type you can look at the platground's docs or
query the `__typename`

```graphql
query MyQuery($url: String!) {
  categories(filters: { url_path: { eq: $url } }) {
    items {
      __typename
    }
  }
}
```

You'll find that it returns `CategoryTree`, that is what we can use in our
Fragment.

We can now replace the fields in our `CategoryPage.graphql` with the fragment,
like so:

```graphql
query CategoryPage($url: String!, $rootCategory: String!) {
  ...MenuQueryFragment
  ...FooterQueryFragment
  ...PageContentQueryFragment

  ...CategoryQueryFragment

  categories(filters: { url_path: { eq: $url } }) {
    items {
      ...ChildrenImages
    }
  }
}
```

And second, we can define the props of our component to use our newly created
Fragment:

```tsx
import { ChildrenImagesFragment } from './ChildrenImages.graphql'

export function ChildrenImages(props: ChildrenImagesFragment) {
  return (
    <div>
      {props.children?.map((child) => (
        <div key={child?.url_path}>{child?.image}</div>
      ))}
    </div>
  )
}
```

You'll see that the error our earlier
`<ChildrenImages children={category.children} />` is gone.

Open up your browser and you will see a list of names.

### More complete example:

```tsx
import { Image } from '@graphcommerce/image'
import { Box, Container } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'
import { ChildrenImagesFragment } from './ChildrenImages.graphql'

export function ChildrenImages(props: ChildrenImagesFragment) {
  return (
    <Container maxWidth='md'>
      <Box
        display='grid'
        gridAutoFlow='column'
        gridAutoColumns='50px'
        justifyContent='center'
      >
        {props.children?.map((child) => {
          if (!child?.name || !child?.image) return null
          return (
            <Link href={`/${child.url_path}`} key={child.image}>
              <a>
                <Image
                  alt={child.name}
                  src={child.image}
                  width={1}
                  height={1}
                  sizes={'50px'}
                />
              </a>
            </Link>
          )
        })}
      </Box>
    </Container>
  )
}
```

- Every GraphQL fragment has a component (Money.gql + Money.tsx)
- Fragments are as tiny as the fragment you write, they prevent you from making
  up new props. Encouraging us to reuse code.
- Queries never have a component
- Preferably fetch as much as you can in a single query, because of caching
