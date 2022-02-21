# Deploy a Graphcommerce app with Vercel

Congratulations, you are ready to deploy your GraphCommerce app to production.
The fastest way to deploy your GraphCommerce app is with
[Vercel ↗](https://vercel.com/).

Vercel allows for automatic deployments on every branch push and merges onto the
Production Branch of your GitHub project:

- Login to Vercel, click the "New Project" button
- Import your Git Repository. Use the search to type your project's name. If
  it's not showing up, click the 'Configure Github App' to grant Vercel
  repository access

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/e62La4" style="min-width:100%; aspect-ratio: 16:9; box-shadow: 0 10px 60px 0 rgba(0,0,0,0.10); margin: 30px 0">
</figure>
- Set the Environment Variables from your .env file:

```
GRAPHCMS_URL
MAGENTO_ENDPOINT
IMAGE_DOMAINS
NEXT_PUBLIC_LOCALE_STORES
NEXT_PUBLIC_DISPLAY_INCL_TAX
```

- Vercel will auto assign a domain to your project. In this example, the Github
  project repository name is `graphcommerce-example`, so the domain will be
  `https://graphcommerce-example.vercel.app`. Add this domain as the GraphQL and
  Public site url Environment Variables:

```
NEXT_PUBLIC_GRAPHQL_ENDPOINT="https://graphcommerce-example.vercel.app/api/graphql"
NEXT_PUBLIC_SITE_URL="https://graphcommerce-example.vercel.app/"
```

<figure>
 <img src="https://cdn-std.droplr.net/files/acc_857465/gkuuby" style="min-width:100%; aspect-ratio: 16:9; box-shadow: 0 10px 60px 0 rgba(0,0,0,0.10); margin: 30px 0">
</figure>

- Hit the "Deploy" button
- A custom domain can be configured in the Vercel Project Settings. Update the
  `NEXT_PUBLIC_GRAPHQL_ENDPOINT` and `NEXT_PUBLIC_SITE_URL` variables
  afterwards.
