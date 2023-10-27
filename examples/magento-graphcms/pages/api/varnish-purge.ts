/* eslint-disable no-void */
/* eslint-disable no-console */
/* eslint-disable no-cond-assign */

import { NextApiRequest, NextApiResponse } from 'next'
import { PurgeGetProductPathDocument } from '../../graphql/PurgeGetProductPath.gql'
import { graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

function parseTagsFromPatterns(tagsPatterns: string[]): string[] {
  const fullTags = tagsPatterns.join('|')

  // Tag matching patterns are concatenated into the following form:
  //   ((^|,)TAG1(,|$))|((^|,)TAG2(,|$))|((^|,)TAG3(,|$))
  // So we can match on )TAG1(.
  const regex = /\)([a-zA-Z0-9_]+)\(/g

  const matches = fullTags.matchAll(regex)
  const parsedTags: string[] = []

  for (const tag of matches) {
    parsedTags.push(tag[1])
  }

  return parsedTags
}

async function invalidateProductById(id: number, res: NextApiResponse) {
  console.log(`varnish-purge: invalidating for product ${id}`)

  const internalUrl = `catalog/product/view/id/${id}`

  // FIXME: do we need to iterate over all defined locales, so we are
  // invalidating store-specific URLs correctly?
  const client = graphqlSsrClient(undefined)
  const routeData = await client.query({
    query: PurgeGetProductPathDocument,
    variables: {
      internalUrl,
    },
  })

  let urlPath = routeData.data.route?.relative_url
  if (urlPath) {
    // Construct product URL based on Magento path. We can safely (and must)
    // strip off the .html suffix, as we already redirect to URLs without this
    // suffix
    urlPath = `/p/${urlPath}`
    urlPath = urlPath.replace(/\.html$/, '')

    console.log(`varnish-purge: invalidating URL ${urlPath}`)
    try {
      await res.revalidate(urlPath)
    } catch (err) {
      console.log(`varnish-purge: failed to revalidate ${urlPath}: ${err}`)
    }
  } else {
    console.log(`varnish-purge: no URL found`)
  }
}

function invalidateCategoryById(id: number, res: NextApiResponse) {
  console.log(`varnish-purge: invalidating for category ${id}`)
  // TODO
}

function invalidateByTags(tagsPatterns: string | string[] | undefined, res: NextApiResponse) {
  if (typeof tagsPatterns === 'undefined') {
    return
  }

  const tags = parseTagsFromPatterns(
    typeof tagsPatterns === 'string' ? [tagsPatterns] : tagsPatterns,
  )

  // Tags to support:
  // cat_c_2 (category was changed)
  // cat_c_p_2 (category/product relation was changed)
  // cat_p_27130 (product was changed)

  const categoryTagPattern = /^cat_c_([0-9]+)$/
  const categoryRelationTagPattern = /^cat_c_p_([0-9]+)$/
  const productTagPattern = /^cat_p_([0-9]+)$/

  tags.forEach((tag) => {
    let match: RegExpMatchArray | null

    if ((match = tag.match(categoryTagPattern))) {
      invalidateCategoryById(+match[1], res)
    } else if ((match = tag.match(categoryRelationTagPattern))) {
      invalidateCategoryById(+match[1], res)
    } else if ((match = tag.match(productTagPattern))) {
      void invalidateProductById(+match[1], res)
    } else {
      console.log(`varnish-purge: unsupported tag: ${tag}}`)
    }
  })
}

function doFullPurge() {
  // @todo
}

function handlePurgeRequest(req: NextApiRequest, res: NextApiResponse) {
  const rawTags = req.headers['x-magento-tags-pattern']

  console.log(`varnish-purge: purge request from ${req.socket.remoteAddress}`)
  console.log(`varnish-purge: purge requested for: ${rawTags}`)

  if (rawTags === '.*') {
    doFullPurge()
  } else {
    invalidateByTags(rawTags, res)
  }

  res.status(200)
  res.send('OK')
  res.end()
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  handlePurgeRequest(req, res)
}
