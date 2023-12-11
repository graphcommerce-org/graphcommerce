/* eslint-disable no-cond-assign */
import { NormalizedCacheObject, ApolloClient } from '@graphcommerce/graphql'
import { NextApiRequest, NextApiResponse } from 'next'
import { PurgeGetProductPathDocument } from '../graphql/PurgeGetProductPath.gql'

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

async function invalidateProductById(
  client: ApolloClient<NormalizedCacheObject>,
  id: number,
  res: NextApiResponse,
) {
  console.info(`varnish-purge: invalidating for product ${id}`)

  const internalUrl = `catalog/product/view/id/${id}`

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

    // FIXME: We must build the correct URL for current locale, based on possible locale prefix/locale domain
    urlPath = `/p/${urlPath}`
    urlPath = urlPath.replace(/\.html$/, '')

    console.info(`varnish-purge: invalidating URL ${urlPath}`)
    try {
      await res.revalidate(urlPath)
    } catch (err) {
      console.warn(`varnish-purge: failed to revalidate ${urlPath}: ${err}`)
    }
  } else {
    console.warn(`varnish-purge: no URL found for product ID ${id}`)
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function invalidateCategoryById(
  client: ApolloClient<NormalizedCacheObject>,
  id: number,
  res: NextApiResponse,
) {
  console.info(`varnish-purge: invalidating for category ${id}`)
  // TODO
}

function invalidateByTags(
  client: ApolloClient<NormalizedCacheObject>,
  tagsPatterns: string | string[] | undefined,
  res: NextApiResponse,
) {
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
      invalidateCategoryById(client, +match[1], res)
    } else if ((match = tag.match(categoryRelationTagPattern))) {
      invalidateCategoryById(client, +match[1], res)
    } else if ((match = tag.match(productTagPattern))) {
      void invalidateProductById(client, +match[1], res)
    } else {
      console.warn(`varnish-purge: unsupported tag: ${tag}}`)
    }
  })
}

export function doFullPurge() {
  // TODO
}

export function handlePurgeRequest(
  client: ApolloClient<NormalizedCacheObject>,
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const rawTags = req.headers['x-magento-tags-pattern']

  console.info(`varnish-purge: purge request from ${req.socket.remoteAddress} for ${rawTags}`)

  if (rawTags === '.*') {
    doFullPurge()
  } else {
    invalidateByTags(client, rawTags, res)
  }

  res.status(200)
  res.send('OK')
  res.end()
}
