<div data-nosnippet>
> **Developer preview**  
> This is a developer preview of GraphCommerce. The documentation will be
> updated as GraphCommerce introduces
> [new features and refines existing functionality](https://github.com/graphcommerce-org/graphcommerce/releases).
</div>

# Environment Variables

This guide describes how to store environment variables in your GraphCommerce
project.

## How environment variables work

You can store environment variables in the .env file in your GraphCommerce root
directory. Any variable from .env files that aren't prefixed with `NEXT_PUBLIC`
is treated as a server runtime variable. These variables are not exposed to the
browser.

Environment variables will be loaded into `process.env`, allowing you to use
them in Next.js data fetching methods and API routes:

```ts
// /lib/graphql/GraphQLProvider.tsx

// ...
new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  credentials: 'same-origin',
})
// ...
```

## Public variables

Expose environment variables to the browser by prefixing with `NEXT_PUBLIC`.
These variables can be accessed in any component:

```bash
# Google TagManager ID
NEXT_PUBLIC_GTM_ID="GTM-000000"
```

```tsx
// /node_modules/@graphcommerce/googleanalytics/components/GoogleAnalyticsScript.tsx

export default function GoogleAnalyticsScript() {
  const id = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS

  ...
}
```

## Deployment Environment Variables

When [deploying your GraphCommerce storefront](./deployment.md) to Vercel,
Environment Variables can be configured in the Project Settings.

## Next steps

- Learn how to [deploy your GraphCommerce storefront](./deployment.md) to Vercel
- Read more about
  [Environment Variables in Next.js ↗](https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables)
