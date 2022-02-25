> **Developer preview**  
> This is a developer preview of GraphCommerce. The documentation will be
> updated as GraphCommerce introduces
> [new features and refines existing functionality](https://github.com/ho-nl/m2-pwa/releases).

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
    <img src="https://cdn-std.droplr.net/files/acc_857465/e62La4"/>
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
  Public site url Environment Variables:

  ```bash
  NEXT_PUBLIC_GRAPHQL_ENDPOINT="https://graphcommerce-example.vercel.app/api/graphql"
  NEXT_PUBLIC_SITE_URL="https://graphcommerce-example.vercel.app/"
  ```

  <figure>
  <img src="https://cdn-std.droplr.net/files/acc_857465/gkuuby"/>
  </figure>

- Hit the "Deploy" button
- A custom domain can be configured in the Vercel Project Settings. Update the
  `NEXT_PUBLIC_GRAPHQL_ENDPOINT` and `NEXT_PUBLIC_SITE_URL` variables
  afterwards.

## Next steps

- Learn about [Static Generation (SSG)](../framework/static-generation.md) in
  GraphCommerce
