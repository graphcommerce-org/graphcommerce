import { NormalizedCacheObject, ApolloClient } from '@graphcommerce/graphql'
import { storefrontConfig } from '@graphcommerce/next-ui'
import { NextApiRequest, NextApiResponse } from 'next'
import { rimraf } from 'rimraf'
import { PurgeGetProductPathsDocument } from '../graphql/PurgeGetProductPaths.gql'

function parseTagsFromHeader(tagsHeader: string | string[] | undefined): string[] {
  if (typeof tagsHeader === 'undefined') {
    return []
  }

  const tagsPatterns = typeof tagsHeader === 'string' ? [tagsHeader] : tagsHeader

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
  locale: string,
  id: number,
  res: NextApiResponse,
) {
  const internalUrl = `catalog/product/view/id/${id}`

  const routeData = await client.query({
    query: PurgeGetProductPathsDocument,
    variables: {
      internalUrl,
    },
  })

  if (!routeData.data.route) {
    console.warn(`varnish-purge: no URL found for product ID ${id}`)
    return
  }

  // Determine locale prefix, this is needed unless we're the default locale, or we have our own domain.
  const prefix =
    storefrontConfig(locale)?.defaultLocale || storefrontConfig(locale)?.domain ? '' : `/${locale}`

  // Invalidate product URL
  let urlPath = routeData.data.route?.relative_url
  if (urlPath) {
    // Construct product URL based on Magento path. We can safely (and must)
    // strip off the .html suffix, as we already redirect to URLs without this
    // suffix

    urlPath = urlPath.replace(/\.html$/, '')
    urlPath = `${prefix}/p/${urlPath}`

    console.info(`varnish-purge: invalidating URL ${urlPath} for product ID ${id}`)
    try {
      await res.revalidate(urlPath)
    } catch (err) {
      console.warn(`varnish-purge: failed to revalidate ${urlPath}: ${err}`)
    }
  } else {
    console.warn(`varnish-purge: no URL found for product ID ${id}`)
  }

  // Invalidate category URLs for the categories the product is in
  const categoryPromises: Promise<void>[] = []

  if ('categories' in routeData.data.route) {
    routeData.data.route.categories?.forEach((category) => {
      const categoryUrl = `${prefix}/${category?.url_path}`
      console.info(`varnish-purge: invalidating URL ${categoryUrl} for product ID ${id}`)
      categoryPromises.push(res.revalidate(categoryUrl))
    })
  }

  await Promise.allSettled(categoryPromises)
}

async function doFullPurge(locale: string) {
  const workingDir = process.cwd()
  const staticPath = `${workingDir}/.next/server/pages`

  console.info(`varnish-purge: full purge, cleaning ${staticPath}/${locale}(.json|.html)`)
  await rimraf(`${staticPath}/${locale}`)
  await rimraf(`${staticPath}/${locale}.html`)
  await rimraf(`${staticPath}/${locale}.json`)
}

function checkAllowList(req: NextApiRequest): boolean {
  if (import.meta.graphCommerce.purgeAllowList && req.socket.remoteAddress) {
    if (import.meta.graphCommerce.purgeAllowList.includes(req.socket.remoteAddress)) {
      return true
    }
  }
  return false
}

export async function handlePurgeRequest(
  client: ApolloClient<NormalizedCacheObject>,
  locale: string,
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!checkAllowList(req)) {
    console.warn(`varnish-purge: disallowed purge request from ${req.socket.remoteAddress}`)
    res.status(403)
    res.send('FORBIDDEN')
    res.end()
    return
  }
  const rawTags = req.headers['x-magento-tags-pattern']

  console.info(`varnish-purge: purge request from ${req.socket.remoteAddress} for ${rawTags}`)

  if (rawTags === '.*') {
    await doFullPurge(locale)
  } else {
    const productTagPattern = /^cat_p_([0-9]+)$/
    const tags = parseTagsFromHeader(rawTags)

    tags.forEach(async (tag) => {
      const match = tag.match(productTagPattern)

      if (match) {
        await invalidateProductById(client, locale, +match[1], res)
      }
    })
  }

  res.status(200)
  res.send('OK')
  res.end()
}
