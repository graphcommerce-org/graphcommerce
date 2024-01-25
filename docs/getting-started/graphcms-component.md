---
menu: 5. Build a Hygraph component
metaTitle: Build a Hygraph component
---

# Build a Hygraph component

Previously, you created a GraphCommerce app and started building a custom
header. You're now ready to build a Hygraph component.

Hygraph is the integrated Content Management System that is part of the
[magento-graphcms example](../getting-started/readme.md).

In this tutorial, you'll accomplish a series of tasks to add some specific
functionality to your app. The final result will be relatively simple, but
you'll learn where to find resources to build more complex features on your own.

### After you've finished this tutorial, you'll have accomplished the following:

- Create a Model in Hygraph, called Banner
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

### Create the Hygraph model

- Login to Hygraph, navigate to the Schema and add a new Model called "Banner"
- Add a single line text field called "Identity" and configure the following:

<figure>

![Adding a Single line text field](https://user-images.githubusercontent.com/1251986/159904004-cf774bd1-da01-4478-ac6e-b1567f9bafc7.png)

  <figcaption>Adding a Single line text field called "Identity"</figcaption>
</figure>

<figure>

![Configuring of the 'Identity' field](https://user-images.githubusercontent.com/1251986/157831852-c96c03e7-f1f0-4746-a853-35807a6b9385.png)

   <figcaption>Configuring of the "Identity" field</figcaption>
</figure>

- Add an Asset field called "Image" and configure the following:

<figure>

![Adding an Asset field called 'Image'](https://user-images.githubusercontent.com/1251986/157831896-43556722-d9eb-41b9-80da-0a4e7b7fd067.png)

   <figcaption>Adding an Asset field called "Image"</figcaption>
</figure>

- Add a Rich text field called "Copy" and configure the following:

<figure>

![Adding a Rich text field called 'copy'](https://user-images.githubusercontent.com/1251986/157831937-1c2293d4-a23b-477b-9185-a2a7556f5808.png)

   <figcaption>Adding a Rich text field called "Copy"</figcaption>
</figure>

<figure>

![Configuring of the field](https://user-images.githubusercontent.com/1251986/157831989-f3dcdfd1-376d-4e77-b0da-fc7a055e9f90.png)

   <figcaption>Configuring of the "Copy" field</figcaption>
</figure>

### Define relationship with Content field

To be able to use the newly created model to add banners to pages, define the
relationship between the Banner model and the Content field of the Page model.

- Navigate to the Page Schema. Edit the field called "Content"
- Click "Define relationship" (collapsed by default). Add the Banner model to
  "Models to reference"

<figure>

![Models to reference](https://user-images.githubusercontent.com/1251986/157832067-1d164761-677e-4553-88af-c969c99b7055.png)

   <figcaption>Adding the newly created Banner Model to "Models to reference"</figcaption>
</figure>

- Navigate to Content, edit the Homepage entry and add a new banner instance to
  the homepage:

<figure>

![Adding a new banner to the Homepage content entry](https://user-images.githubusercontent.com/1251986/157832145-0594e382-bf59-47c3-9520-17ea9916b654.png)

   <figcaption>Adding a new banner to the Homepage content entry</figcaption>
</figure>

### Validate GraphQL Schema

- Go to your local environment and run `yarn codegen`, this ensures the changes
  you just made are added to your local environment.
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

![Validation of the addition to the GraphQL Schema](https://user-images.githubusercontent.com/1251986/157832194-178f9d47-b1b4-4d74-8dae-13ae44841769.png)

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
  look at the file's contents. It should export the type `BannerFragment`.

### Add the query fragment to the page query fragments

- In /components/GraphCMS/RowRenderer.graphql, add the fragment:

```graphql
fragment RowRenderer on Page @inject(into: ["HygraphPage"]) {
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
    ...RowLinks
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

![An instance of the banner component rendering with content from Hygraph](https://user-images.githubusercontent.com/1251986/157832263-ee06b20e-acac-4f68-89f2-4377199b7fa4.png)

   <figcaption>An instance of the banner component rendering with content from Hygraph</figcaption>
</figure>

<figure>

![Sort order matters](https://user-images.githubusercontent.com/1251986/157832323-8a61dcea-c198-45d1-9c81-55ebd0cc03be.jpg)

   <figcaption>Sort order matters</figcaption>
</figure>

## Next steps

- Explore the [GraphCommerce framework](../framework/readme.md)
