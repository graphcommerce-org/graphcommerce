---
menu: 2. Start customizing
metaTitle: Customize a storefront
---

# Start building a GraphCommerce custom storefront

Previously, you created a new GraphCommerce app on your local machine. In this
tutorial, you'll complete a series of tasks to add some specific functionality
to your GraphCommerce storefront. Your final modification will be simple, but
you’ll learn where to find resources to build more complex features on your own.

### Customization strategy

You can fully customize GraphCommerce according to your needs. For smooth future
updates, adhere to this sequence when making your adjustments:

1.  Modify local files: Every file in your project directory is meant for
    customization. E.g., you can directly modify files in the /pages and /folder
    directories, as wel as your components/theme.ts file.
2.  Plugins: To modify the behavior of core features (packages), implement the
    changes through a [plugin](../framework/plugins-react.md).
3.  Patches: If a plugin is not sufficient, create a
    [patch](../framework/patch-package.md) for your changes.

## Step 1: Make customizations

### Add text

- Make sure your development environment is running at http://localhost:3000
- In /pages/page/[url].tsx, add:

```tsx
<Typography variant='h1' gutterBottom sx={{ textAlign: 'center' }}>
  Hello
</Typography>
```

- Add `import { Typography } from '@mui/material'` to the list of imports at the
  top of the file
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
