---
menu: 5. Build a GraphCMS component
metaTitle: Build a GraphCMS component
---

> **Developer preview**  
> This is a developer preview of GraphCommerce. The documentation will be
> updated as GraphCommerce introduces
> [new features and refines existing functionality](https://github.com/ho-nl/m2-pwa/releases).

# Build a GraphCMS component

Previously, you created a GraphCommerce app and started building a custom
header. You're now ready to build a GraphCMS component.

GraphCMS is the integrated Content Management System that is part of the
[magento-graphcms example](../getting-started/readme.md).

In this tutorial, you'll accomplish a series of tasks to add some specific
functionality to your app. The final result will be relatively simple, but
you'll learn where to find resources to build more complex features on your own.

### After you've finished this tutorial, you'll have accomplished the following:

- Create a Model in GraphCMS, called Banner
- Configure the Model's copy and image field
- Define the relationship between the Banner Model and Page Content field
- Write a GraphQL query fragment and add it to the page query
- Add the component to the page renderers

### Requirements

You've familiarized yourself with
[React ↗](https://reactjs.org/docs/getting-started.html),
[Next.js ↗](https://nextjs.org/docs/getting-started), and
[Mui ↗](https://mui.com/getting-started/installation/). GraphCommerce is a
frontend React framework that uses Next.js for server-side rendering.

---

### Create the GraphCMS model

- Login to GraphCMS, navigate to the Schema and add a new Model called "Banner"
- Add a Single line text field called "Identity" and configure the following:

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/6UGrfK" />
  <figcaption>Adding a Single line text field called "Identity"</figcaption>
</figure>

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/TvNPoT" />
   <figcaption>Configuring of the "Identity" field</figcaption>
</figure>

- Add an Asset field called "Image" and configure the following:

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/OdkckP" />
   <figcaption>Adding an Asset field called "Image"</figcaption>
</figure>

- Add a Rich text field called "Copy" and configure the following:

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/C8nzzB" />
   <figcaption>Adding a Rich text field called "Copy"</figcaption>
</figure>

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/j9kydr" />
   <figcaption>Configuring of the "Copy" field</figcaption>
</figure>

### Define relationship with Content field

To be able to use the newly created model to add banners to pages, define the
relationship between the Banner model and the Content field of the Page model.

- Navigate to the Page Schema. Edit the field called "Content"
- Click "Define relationship" (collapsed by default). Add the Banner model to
  "Models to reference"

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/Dc4axA" />
   <figcaption>Adding the newly created Banner Model to "Models to reference"</figcaption>
</figure>

- Navigate to Content, edit the Homepage entry and add a new banner instance to
  the homepage:

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/lpa4x4" />
   <figcaption>Adding a new banner to the Homepage content entry</figcaption>
</figure>

### Validate GraphQL Schema

- To validate the addition of the Banner model and the relation with the Page
  model Content field, try out the following GraphQL query in your local GraphQL
  endpoint (running at http://localhost:3000/api/graphql):

```graphql
query {
  pages(where: { url: "page/home" }) {
    title
    content {
      __typename
    }
  }
}
```

Should output the following. Make note that 'Banner' is listed as a typename.

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/G51mOD" />
   <figcaption>Validation of the addition of "Banner" to the GraphQL Schema</figcaption>
</figure>

### Create the component query fragment

- Add a new file, /components/GraphCMS/Banner/Banner.graphql:

```graphql
fragment Banner on Banner {
  image {
    ...Asset
  }
  copy {
    raw
  }
}
```

- After saving the file, a new file Banner.gql.ts should be
  [created automatically](../getting-started/readme.md#query-fragments). Take a
  look at the file's contents. It should export a type `BannerFragment`.

### Add the query fragment to the page query fragments

- In /components/GraphCMS/RowRenderer.graphql, add the fragment:

```graphql
fragment RowRenderer on Page {
  content {
    __typename
    ... on Node {
      id
    }
    ...RowColumnOne
    ...RowColumnTwo
    ...RowColumnThree
    ...RowBlogContent
    ...RowHeroBanner
    ...RowSpecialBanner
    ...RowQuote
    ...RowButtonLinkList
    ...RowServiceOptions
    ...RowContentLinks
    ...RowProduct
    ...Banner
  }
}
```

### Create the React component

- Add a new file, /components/GraphCMS/Banner/index.tsx:

```tsx
import { RichText } from '@graphcommerce/graphcms-ui'
import { BannerFragment } from './Banner.gql'

export function Banner(props: BannerFragment) {
  const { copy, image } = props

  return (
    <div>
      {image?.url}
      <RichText
        {...copy}
        sxRenderer={{
          paragraph: {
            textAlign: 'center' as const,
          },
          'heading-one': (theme) => ({
            color: theme.palette.primary.main,
          }),
        }}
      />
    </div>
  )
}
```

### Add the component to page components

- In /components/GraphCMS/RowRenderer.tsx, add to the imports:

```tsx
import { Banner } from './Banner'
```

- In the same file, add banner:

```tsx
const defaultRenderer: Partial<ContentTypeRenderer> = {
  RowColumnOne,
  RowColumnTwo,
  RowColumnThree,
  RowHeroBanner,
  RowSpecialBanner,
  RowQuote,
  RowBlogContent,
  RowButtonLinkList,
  RowServiceOptions,
  RowContentLinks,
  RowProduct,
  Banner,
}
```

- If a Model entry had been added to the homepage content field, it should
  render. Note that the order in which content of the content field is sorted,
  matters:

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/ONwNJD" />
   <figcaption>An instance of the banner component rendering with content from GraphCMS</figcaption>
</figure>

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/bMsi6A" />
   <figcaption>Sort order matters</figcaption>
</figure>

## Next steps

- Explore the [GraphCommerce framework](../framework/readme.md)
