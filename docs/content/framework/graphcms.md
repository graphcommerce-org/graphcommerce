# GraphCMS

GraphCMS is integrated as a Content Management System. It is used to store all
static content and provides a user-friendly interface for managing it.

The [magento-graphcms example](./../getting-started/overview.md) offers a number
of components to render this content in different ways, for example in the form
of a page-wide hero banner, a list of USPs or grid of text columns.

This guide covers how to configure GraphCMS and how to build rich content pages
by adding GraphCMS content to pages.

## Configuration

To connect your GraphCommerce app to your GraphCMS project, you'll need a
GraphCMS project with the required schema.
[Clone the demo GraphCMS project](https://app.graphcms.com/clone/caddaa93cfa9436a9e76ae9c0F34d257)
as your starting point. Update the variable in the /.env file:

`GRAPHCMS_URL=""`  
GraphCMS API url. Once logged in, copy it from Project Settings > Api Access >
Content API

## Adding content to pages

GraphCommerce uses Next.js
[file-based routing ↗](https://nextjs.org/docs/routing/introduction), built on
the concept of pages. When a file is added to the /pages directory, it's
automatically available as a route. Magento category routes are handled by the
`/pages/[...url].tsx` page.

To add GraphCMS content to, for example, a category page, create a Page entry in
GraphCMS and match the value of the URL field with the route of the page you
wish to add content to.

For example, the content of the 'men' Page entry in GraphCMS:

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/qv7IAn"/>
</figure>

Is used to add a`RowProduct (variant:Grid)` and a
`RowProduct (variant:Backstory` component to: http://localhost:3000/men

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/1aSErQ" />
  <figcaption>Content of the RowProduct (variant:Backstory component)</figcaption>
</figure>

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/5Pkv37" />
</figure>

## Next steps

- Learn how to
  [build a custom GraphCMS component](../getting-started/graphcms-component.md)
