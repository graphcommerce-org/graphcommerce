---
menu: 2. Customize a storefront
metaTitle: Customize a storefront
---

# Start building a GraphCommerce custom storefront

Previously, you [created a new GraphCommerce app](../getting-started/create.md).
You're now ready to start working on your GraphCommerce custom storefront.

In this tutorial, you'll complete a series of tasks to add some specific
functionality to your GraphCommerce app. Your final modification will be simple,
but you’ll learn where to find resources to build more complex features on your
own.

### What you'll learn

After you've finished this tutorial, you'll have accomplished the following:

- Customized text and component styles
- Fetched data from server components
- Made changes to GraphQL queries

### Requirements

You're using the most recent version of GraphCommerce. We recommend using the
latest release to get the benefits of performance, new components, and other
best practices.

You've completed the
[Create a GraphCommerce app tutorial](../getting-started/create.md).

## Step 1: Make customizations

### Add text

- Make sure your development environment is running at http://localhost:3000
- In /pages/page/[url].tsx, add:

```tsx
<Typography variant='h1' gutterBottom sx={{ textAlign: 'center' }}>
  Hello
</Typography>
```

- Add `import Typography from '@mui/material/Typography'` to the list of imports
  at the top of the file
- Save the file to see your changes updated in real-time

<figure>

https://user-images.githubusercontent.com/1251986/154980151-2039c027-c31f-4b99-86f2-8c2420053da8.mp4

<video width="100%" controls autoPlay loop muted playsInline>
<source src="https://user-images.githubusercontent.com/1251986/154980151-2039c027-c31f-4b99-86f2-8c2420053da8.mp4" type="video/mp4"/>
</video>

</figure>

### Change a component's style

- After you've finished step 1, in /pages/page/[url].tsx find the following
  code:

```tsx
<Typography variant='h1' gutterBottom sx={{ textAlign: 'center' }}>
  Hello
</Typography>
```

- Make the background color red for the Hello text:

```tsx
<Typography
  variant='h1'
  gutterBottom
  sx={{ textAlign: 'center', backgroundColor: 'red' }}
>
  Hello
</Typography>
```

<figure>

https://user-images.githubusercontent.com/1251986/154980686-3d2bf587-16d7-412b-b05f-8b0f7b40cbfd.mp4

<video width="100%" controls autoPlay loop muted playsInline>

<source src="https://user-images.githubusercontent.com/1251986/154980686-3d2bf587-16d7-412b-b05f-8b0f7b40cbfd.mp4" type="video/mp4"/>
</video>

   <figcaption>Change a component's style in your GraphCommerce app</figcaption>
</figure>

## Step 2: Make GraphQL changes

You might want to make changes to a GraphQL query to fetch data from Magento for
a specific need. For example, if you want to display a certain category
property, you need to modify a query.

- In /graphql/CategoryPage.graphql, `...CategoryQueryFragment` is included as a
  fragment
- Open the fragment's file
  /node_modules/@graphcommerce/magento-category/queries/CategoryQueryFragment.graphql,
  and copy it's contents
- In /graphql/CategoryPage.graphql, paste the contents of
  `...CategoryQueryFragment` and add `children_count` property:

```graphql
query CategoryPage($url: String!, $rootCategory: String!) {
  ...MenuQueryFragment
  ...FooterQueryFragment
  ...PageContentQueryFragment
  ...CategoryQueryFragment

  categories(filters: { url_path: { eq: $url } }) {
    items {
      uid
      children_count
      ...CategoryBreadcrumb
      ...CategoryDescription
      ...CategoryChildren
      ...CategoryMeta
      ...CategoryHeroNav
    }
  }
}
```

- Save the file. /graphql/CategoryPage.gql.ts should be regenerated, and contain
  the following addition:

```json
{ "kind": "Field", "name": { "kind": "Name", "value": "children_count" } }
```

- In /pages/[...url].tsx, show the children_count next to category title (3
  occurrences):

```tsx
{category?.name} - ({category?.children_count})
```

## Step 3: Interactive GraphQL interface

You can explore the Storefront API and run test queries in your GraphCommerce
app. When you're running the GraphCommerce local development environment, you
can visit the following URL to load the GraphQL Explorer:

http://localhost:3000/api/graphql

## Next steps

- Learn how to [build a custom header](../getting-started/header.md) in
  GraphCommerce
