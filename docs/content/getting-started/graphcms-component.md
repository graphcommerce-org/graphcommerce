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

GraphCMS is the integrated Content Management System system that is part of the
[magento-graphcms example](../getting-started/readme.md).

In this tutorial, you'll accomplish a series of tasks to add some specific
functionality to your app. The final result will be simple, but you'll learn
where to find resources to build more complex features on your own.

### After you've finished this tutorial, you'll have accomplished the following:

- Configure the required fields in GraphCMS
- Build a new component
- Write the GraphQL query fragments needed
- Add the component to a page

### Create the GraphCMS model

- Login to GraphCMS, navigate to the Schema and add a new Model called "Banner"
- Add a Single line text field called "Identity" and configure the following:

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/6UGrfK" />
  <figcaption>Add a Single line text field called "Identity"</figcaption>
</figure>

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/TvNPoT" />
   <figcaption>Configuration of the "Identity" field</figcaption>
</figure>

- Add an Asset field called "Image" and configure the following:

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/OdkckP" />
   <figcaption>Add an Asset field called "Image"</figcaption>
</figure>

- Add a Rich text field called "Copy" and configure the following:

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/C8nzzB" />
   <figcaption>Add a Rich text field called "Copy"</figcaption>
</figure>

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/j9kydr" />
   <figcaption>Configuration of the "Copy" field</figcaption>
</figure>

## Next steps

- Explorer the [GraphCommerce framework](../framework/readme.md)
