---
menu: GraphCMS
---

<div data-nosnippet>

> **Developer preview**  
> This is a developer preview of GraphCommerce. The documentation will be
> updated as GraphCommerce introduces
> [new features and refines existing functionality](https://github.com/graphcommerce-org/graphcommerce/releases).

</div>

# GraphCMS

GraphCMS is integrated as a Content Management System. It is used to store all
static content and provides a user-friendly interface for managing it.

The [magento-graphcms example](./../getting-started/readme.md) offers a number
of components to render this content in different ways, for example in the form
of a page-wide hero banner, a list of USPs or grid of text columns.

This guide covers how to configure GraphCMS and how to build rich content pages
by adding GraphCMS content to pages.

## Configuration

To connect your GraphCommerce app to your GraphCMS project, you'll need a
GraphCMS project with the required schema.
[Clone the demo GraphCMS project ↗](https://app.graphcms.com/clone/caddaa93cfa9436a9e76ae9c0F34d257)
as your starting point. Update the variable in the /.env file:

`GRAPHCMS_URL=""`  
GraphCMS API URL. Once logged in, copy it from Project Settings > Api Access >
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

![Page entry in GraphCMS](https://user-images.githubusercontent.com/1251986/157831167-706b54e8-ab25-4e67-882d-dd9595e87d5a.png)

</figure>

Is used to add a`RowProduct (variant:Grid)` and a
`RowProduct (variant:Backstory` component to: http://localhost:3000/men

<figure>

![Content of the RowProduct component](https://user-images.githubusercontent.com/1251986/157831230-1fe5967f-7f7e-44e4-a908-8a52c8836f95.png)

  <figcaption>Content of the RowProduct (variant:Backstory component)</figcaption>
</figure>

<figure>

![Front-end render of the component](https://user-images.githubusercontent.com/1251986/157831382-51ebc3e2-85f7-4041-9d9f-c4982c73a825.png)

</figure>

## Next steps

- Learn how to
  [build a custom GraphCMS component](../getting-started/graphcms-component.md)
