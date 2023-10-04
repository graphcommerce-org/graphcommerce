# Magento Varnish Purge

This package contains the neccesary logic for some limited support for handling
the PURGE requests that Magento sends when using varnish as the full page cache
backend. We use these requests to invalidate statically generated content for
product and category pages (see
https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration#using-on-demand-revalidation)

While this doesn't work entirely similar to Magento, where cache entries are
saved along with the tags relevant for all the models that were involved with
generating the content, (allowing very precise and fine-grained flushing of
cache entries by directly referring to the tags), it does allow us to handle
some common tag patterns for product and category pages, where we can parse the
IDs from the tags, and map them to the product/category URLs, and revalidate
those.

Because Magento allows us to configure multiple cache hosts, this allows both
the Varnish backend as well as the graphcommerce backend to be included as
targets for sending PURGE requests. As Magento allows only a host + port number,
we employ a middleware file to rewrite the PURGE request to the
api/varnish-purge route.
