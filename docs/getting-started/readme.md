---
menu: Quick start
order: create,start-building,header,pages,graphcms-component
metaTitle:
  Start your Reactjs Ecommerce project with the GraphCommerce React Magento 2
  Template
metaDescription:
  'Overview of the magento-graphcms example, the GraphCommerce reactjs ecommerce
  template for Magento storefronts'
metaUrl: getting-started/getting-started-with-magento-react-ecommerce
---

# Quick start

This page will give you an introduction to the 80% of the concepts that you will
most likely use. We recommended you familiarize yourself with the primary
technologies used in GraphCommerce: React and Next.js.

## Project file structure

(Almost) Every file in your project directory is meant for customization. It's
standard to modify these files for every project.

- `📄 /graphcommerce.config.js` GraphCommerce configuration
- `📁 /components` A set of components you most likely want to modify to your
  needs
- `📁 /components/Layout `The main layout components, like header, navigation,
  and footer
- `📁 /pages` A set of boilerplate pages, which handle URL routing
- `📄 /components/theme.ts` Global styles
- `📁 /locales` Interface translation files that are auto generated
- `📁 /plugins` Directory for custom plugins
- `📄 /next.config.js` Next.js configuration

## Hygraph

GraphCommerce relies on Hygraph, the default integrated CMS. Hygraph is used for
all static content (video, pages, images), allowing for high-quality components
beyond Magento's CMS capabilities.

- To start building,
  [clone ↗](https://app.hygraph.com/clone/caddaa93cfa9436a9e76ae9c0f34d257?name=GraphCommerce%20Demo)
  the Hygraph schema.
- You can safely delete all content
- Hygraph content is multilingual
- A page's `content` field holds the components to display
- If the page url matches a Magento category page url, it's `content` adds to
  the category page

<figure>

https://user-images.githubusercontent.com/1251986/227236765-503ccaac-6499-48df-bb20-e3b341cd7899.mp4

<video width="100%" controls autoPlay loop muted playsInline>
<source src="https://user-images.githubusercontent.com/1251986/227236765-503ccaac-6499-48df-bb20-e3b341cd7899.mp4" type="video/mp4"/>
</video>

  <figcaption>The homepage's `content` field holds the components to display</figcaption>
</figure>

## Page routing

GraphCommerce uses Next.js file-based
[page routing ↗](https://nextjs.org/docs/routing/introduction). The files
inside the `📁 /pages` directory handle routing. Modify these files to meet your
requirements or [build a custom page](./pages.md).

- Product pages: `📄 /p/[...url].tsx`
- Homepage: `📄 /index.tsx`
- Category pages: `📄 /[...url].tsx` (also used for category home page)
- Hygraph content pages: Modify `📄 /index.tsx`

<figure>

https://user-images.githubusercontent.com/1251986/227176018-4a6a83a6-c61b-4344-8238-6596cb41c12e.mp4

<video width="100%" controls autoPlay loop muted playsInline>
<source src="https://user-images.githubusercontent.com/1251986/227176018-4a6a83a6-c61b-4344-8238-6596cb41c12e.mp4" type="video/mp4"/>
</video>

  <figcaption>Modify the layoutProps in `📄 /newsletter/index.tsx` to change the newsletter page layout</figcaption>
</figure>

## Styling

GraphCommerce is build using [MUI core↗](https://mui.com/core/) components.

👉 To change your storefront's global colors, typography and styles, modify
`📄 /components/theme.ts`

To style a Graphcommerce component to your liking, add the sx prop:

```tsx
sx={{ color: 'red' }}
```

Target child elements with css selectors:

```tsx
sx={{ '& .MuiBox-root': { background: 'blue' }}}
```

Pass the theme object to use global values

```tsx
sx={(theme)=>({ margin: theme.spacings.lg, color: theme.palette.text.secondary })}
```

## Customization

There are several ways to customize your storefront to a greater extent. The
optimal method varies based on the desired modification.

👉 Local modifications - Every file in your project directory is meant for
customization. E.g., you can directly modify files in the `📁 /pages` and
`📁 /folder` directories, as wel as your `📄 /components/theme.ts` file.

👉 Plugin - Creating a [plugin](../framework/plugins-react.md) is
straightforward and surprisingly uncomplicated. Plugins are recommended for
retaining maximum upgradability.

👉 Patch - Directly edit a component in `📁 /node_modules` and generate a patch
using [patch-package](../framework/patch-package.md). Patches, stored in the
`📁 /patches` directory, auto-reapply during development or production
environment builds.

❗️ Local copy - Duplicate the component from `📁 /node_modules` to e.g.,
`📁 /components/`, update all references to it, and edit locally. Using local
copies marginally complicates upgrading.

## FAQ

<div>
<details>
<summary>What are the benefits of choosing GraphCommerce for a react ecommerce project?</summary>

### What are the benefits of choosing GraphCommerce for a reactjs ecommerce project?

React is a very suitable framework for magento reactjs ecommerce projects.
Magento 2 is a well established, widely used open source e-commerce solution.
GraphCommerce brings the best of both, and includes the structure, components,
and tooling you need to get started with react ecommerce. Using GraphCommerce
minimizes the development effort required to launch a full featured reactjs
e-commerce storefront with features like cart, search, layered navigation and
category, product, account, checkout pages.

</details>

<details>
<summary> Why use the GraphCommerce magento reactjs ecommerce template</summary>

### Why use the GraphCommerce magento-graphcms reactjs ecommerce template

The GraphCommerce magento-graphcms template contains all needed components like
cart, search, and layered navigation for a full-featured e-commerce storefront.
It's easy to customize and includes the structure, components, and tooling you
need to get started. With the extensive documentation, it is more efficient to
understand and customize the template for your next react Magento 2 project,
than to start from scratch.

</details>
</div>

## Next steps

- 🎉 By now, you know the basics to begin building your storefront.
- [Set up VS Code](../getting-started/vscode.md) and install usefull extensions
  for an optimal development experience.
- [Start customizing](../getting-started/start-building.md) to go from "Hello
  World" to a fully built GraphCommerce custom storefront.
