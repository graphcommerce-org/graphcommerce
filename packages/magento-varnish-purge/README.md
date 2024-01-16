# Magento Varnish Purge

This package contains the neccesary logic for limited support for handling the
PURGE requests that Magento sends when using varnish as the full page cache
backend. We use these requests to invalidate statically generated content for
product and category pages (see
https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration#using-on-demand-revalidation)

While this doesn't work entirely similar to Magento, where cache tags are used
for fine-grained flushing of cache entries, it does allow us to handle some
common tag patterns for product and category pages, where we can parse the IDs
from the tags, and map them to the product/category URLs, and revalidate those.

Because Magento allows us to configure multiple cache hosts, this allows both
the Varnish backend as well as the graphcommerce backend to be included as
targets for sending PURGE requests. As Magento allows only a host + port number,
we employ a middleware file to rewrite the PURGE request to the
api/varnish-purge route.

Currently two situations are handled:

- Full cache purge (where Magento sends the `.*` tag pattern): results in the
  deletion of all statically generated content for every storefront.
- Specific product cache purge (where Magento sends the `cat_p_12345` tag
  pattern): here we invalidate the product page, and any category pages the
  product is in.

## Enabling handling of PURGE requests in your GraphCommerce project

Implement api route that invokes handlePurgeRequest:

`pages/api/varnish-purge.ts`:

```typescript
import { handlePurgeRequest } from '@graphcommerce/magento-varnish-purge'
import type { NextApiRequest, NextApiResponse } from 'next'
import { graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await handlePurgeRequest(req, res, graphqlSsrClient)
}
```

Add (or integrate into existing) middleware for rewriting PURGE requests to api
route:

`middleware.ts`:

```typescript
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  if (
    request.method !== 'PURGE' ||
    !request.headers.get('X-Magento-Tags-Pattern')
  ) {
    return undefined
  }

  return NextResponse.rewrite(new URL('/api/varnish-purge', request.url))
}

export const config = { matcher: '/' }
```

The middleware is needed as nextjs does not allow rewriting the PURGE request
from the root `/` through `next.config.js`

## Configuring Magento to send PURGE request to your GraphCommerce application

Simply add your GraphCommerce hostname to the `http_cache_hosts` configuration
in your `app/etc/env.php`:

```php
'http_cache_hosts' => [
    [
        'host' => '127.0.0.1', // Your varnish instance
        'port' => '6081'
    ],
    [
        'host' => 'myshop.example.com', // Your GraphCommerce application
        'port' => '443'
    ]
],
```
