# Start building a GraphCommerce custom storefront

Previously, you [created a new GraphCommerce app](). You're now ready to start
building your GraphCommerce custom storefront.

In this tutorial, you'll complete a series of tasks to add some specific
functionality to your GraphCommerce app. Your final modification will be simple,
but you’ll learn where to find resources to build more complex features on your
own.

## What you'll learn

After you've finished this tutorial, you'll have accomplished the following:

- Customized text and component styles
- Fetched data from server components
- Made changes to GraphQL queries

## Requirements

You're using the most recent version of GraphCommerce. We recommend using the
latest release to get the benefits of performance, new components, and other
best practices.

You've completed the [Create a GraphCommerce app tutorial]().

# Step 1: Make customizations

### Add text

- Make sure your development environment is running at http://localhost:3000
- In /pages/page/[url].tsx, add:

```
  <Typography variant='h1' gutterBottom sx={{ textAlign: 'center' }}>
    Hello
  </Typography>
```

- Add `import { Typography } from '@mui/material'` to the list of imports at the
  top of the file
- Save the file to see your changes updated in real-time

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/btnqBi" style="min-width:100%; aspect-ratio: 16:9; box-shadow: 0 10px 60px 0 rgba(0,0,0,0.10); margin: 30px 0">
 <figcaption>Adding text to your GraphCommerce app</figcaption>
</figure>

### Change a component's style

- After you've finished step 1, in /pages/page/[url].tsx find the following
  code:

```
  <Typography variant='h1' gutterBottom sx={{ textAlign: 'center' }}>
    Hello
  </Typography>
```

- Make the background color red for the Hello text:

```
  <Typography variant='h1' gutterBottom sx={{ textAlign: 'center', backgroundColor: 'red' }}>
    Hello
  </Typography>
```

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/F8EuHl" style="min-width:100%; aspect-ratio: 16:9; box-shadow: 0 10px 60px 0 rgba(0,0,0,0.10); margin: 30px 0">
 <figcaption>Change a component's style in your GraphCommerce app</figcaption>
</figure>

# Step 2: Make GraphQL changes

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

```
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

```
{"kind":"Field","name":{"kind":"Name","value":"children_count"}}
```

- In /pages/[...url].tsx, show the children_count next to category title (3
  occurrences):

```
{category?.name} - ({category?.children_count})
```

## Interactive GraphQL interface

You can explore the Storefront API and run test queries in your GraphCommerce
app. When you're running the GraphCommerce local development environment, you
can visit the following URL to load the GraphQL Explorer:

http://localhost:3000/api/graphql

# Next steps

- Learn how to [build a custom header]() in GraphCommerce
