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

- Add `import { Typography } from '@mui/material'` to the list of imports
- Save the file to see your changes updated in real-time

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/btnqBi" width="480" style="min-width:100%; aspect-ratio: 9:6">
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
 <img src="https://cdn-std.droplr.net/files/acc_857465/F8EuHl" width="480" style="min-width:100%; aspect-ratio: 9:6">
 <figcaption>Change a component's style in your GraphCommerce app</figcaption>
</figure>

# Next steps

- Learn how to [build a custom header]() in GraphCommerce
