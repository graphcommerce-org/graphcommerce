import { NormalizedCacheObject, ApolloClient } from '@graphcommerce/graphql'
import { storefrontConfig, storefrontAll } from '@graphcommerce/next-ui'
import type { NextApiRequest, NextApiResponse } from 'next'
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

async function invalidateByUrl(locale: string, url: string, res: NextApiResponse) {
  // Determine locale prefix, this is needed unless we're the default locale, or we have our own domain.
  const prefix =
    storefrontConfig(locale)?.defaultLocale || storefrontConfig(locale)?.domain ? '' : `/${locale}`

  let urlPath = `${prefix}/${url}`

  console.info(`varnish-purge: invalidating URL ${urlPath}`)
  try {
    await res.revalidate(urlPath)
  } catch (err) {
    console.warn(`varnish-purge: failed to revalidate ${urlPath}: ${err}`)
  }
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

async function handleForLocale(locale: string, req: NextApiRequest, res: NextApiResponse) {
  let tagInfo = req.body
  console.log(typeof req.body)
  console.log(req.body)

  if (!tagInfo || !Array.isArray(tagInfo)) {
    return
  }
  tagInfo.forEach(async (tag) => {
    await invalidateByUrl(locale, tag.url, res)
  })
}

export async function handlePurgeRequest(
  req: NextApiRequest,
  res: NextApiResponse,
  client: (locale: string) => ApolloClient<NormalizedCacheObject>,
) {
  if (!checkAllowList(req)) {
    console.warn(`varnish-purge: disallowed purge request from ${req.socket.remoteAddress}`)
    res.status(403)
    res.send('FORBIDDEN')
    res.end()
    return
  }

  console.info(
    `varnish-purge: purge request from ${req.socket.remoteAddress} for tag pattern ${req.headers['x-magento-tags-pattern']} request body: ${JSON.stringify(req.body)}`,
  )

  const promises: Promise<void>[] = []

  storefrontAll.forEach((store) => {
    promises.push(handleForLocale(store.locale, req, res))
  })

  await Promise.all(promises)
    .then(() => {
      console.info(`varnish-purge: OK`)
      res.status(200)
      res.send('OK')
      res.end()
    })
    .catch((error) => {
      console.info(`varnish-purge: error: ${error.message}`)
      res.status(500)
      res.send(`Internal Server Error: ${error.message}`)
      res.end()
    })
}
