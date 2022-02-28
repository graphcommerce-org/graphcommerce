---
menu: 4. Build a GraphCMS component
---

> **Developer preview**  
> This is a developer preview of GraphCommerce. The documentation will be
> updated as GraphCommerce introduces
> [new features and refines existing functionality](https://github.com/ho-nl/m2-pwa/releases).

# Build a custom GraphCMS component

Previously, you created a GraphCommerce app and started building a custom
header. You're now ready to build a GraphCMS component.

GraphCMS is the integrated Content Management System that is part of the
[magento-graphcms example](../getting-started/readme.md).

In this tutorial, you'll accomplish a series of tasks to add some specific
functionality to your app. The final result will be simple, but you'll learn
where to find resources to build more complex features on your own.

### After you've finished this tutorial, you'll have accomplished the following:

- Configure the required fields in GraphCMS
- Build a new component
- Write the GraphQL query fragments needed
- Add the component to a page

## Create the GraphCMS model

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

### Define relationship

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

### Validate

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

Should output:

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/G51mOD" />
   <figcaption>Validation of the GraphQL Schema</figcaption>
</figure>

## Build the component

## Next steps

- Explorer the [GraphCommerce framework](../framework/readme.md)
