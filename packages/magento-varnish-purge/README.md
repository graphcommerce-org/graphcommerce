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

## Enabling handling of PURGE requests in your GraphCommerce project

TODO, but in short:

- Add middleware for rewriting PURGE requests to api route
- Implement api route that invokes handlePurgeRequest for each store

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
