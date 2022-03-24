<div data-nosnippet>

> **Developer preview**  
> This is a developer preview of GraphCommerce. The documentation will be
> updated as GraphCommerce introduces
> [new features and refines existing functionality](https://github.com/graphcommerce-org/graphcommerce/releases).

</div>

# Deploy a Graphcommerce app with Vercel

Congratulations, you are ready to deploy your GraphCommerce storefront to
production. The fastest way to deploy your GraphCommerce app is with
[Vercel ↗](https://vercel.com/).

Vercel allows for automatic deployments on every branch push and merges onto the
Production Branch of your GitHub project:

- Login to Vercel, click the "New Project" button
- Import your Git Repository. Use the search to type your project's name. If
  it's not showing up, click the 'Configure Github App' to grant Vercel
  repository access

<figure>

![Configure Github App](https://user-images.githubusercontent.com/1251986/157830779-6d97d971-f3f3-4695-87d7-f8ab6277872f.jpg)

</figure>

- Set the Environment Variables from your .env file:

  ```bash
  GRAPHCMS_URL=""
  MAGENTO_ENDPOINT=""
  IMAGE_DOMAINS=""
  NEXT_PUBLIC_LOCALE_STORES=""
  NEXT_PUBLIC_DISPLAY_INCL_TAX=""
  ```

- Vercel will auto assign a domain to your project. In this example, the Github
  project repository name is `graphcommerce-example`, so the domain will be
  `https://graphcommerce-example.vercel.app`. Add this domain as the GraphQL and
  Public site URL Environment Variables:

  ```bash
  NEXT_PUBLIC_GRAPHQL_ENDPOINT="https://graphcommerce-example.vercel.app/api/graphql"
  NEXT_PUBLIC_SITE_URL="https://graphcommerce-example.vercel.app/"
  ```

<figure>

![Add Environment Variables](https://user-images.githubusercontent.com/1251986/157830852-8fbdbe31-1fe7-42ff-9109-13f435435b9e.jpg)

</figure>

- Hit the "Deploy" button
- A custom domain can be configured in the Vercel Project Settings. Update the
  `NEXT_PUBLIC_GRAPHQL_ENDPOINT` and `NEXT_PUBLIC_SITE_URL` variables
  afterwards.

## Next steps

- Learn about [Static Generation (SSG)](../framework/static-generation.md) in
  GraphCommerce
