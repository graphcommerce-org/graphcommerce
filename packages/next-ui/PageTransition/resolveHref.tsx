import { removePathTrailingSlash } from 'next/dist/client/normalize-trailing-slash'
import PageLoader from 'next/dist/client/page-loader'
import { delBasePath, addBasePath } from 'next/dist/next-server/lib/router/router'
import { isDynamicRoute } from 'next/dist/next-server/lib/router/utils/is-dynamic'
import { parseRelativeUrl } from 'next/dist/next-server/lib/router/utils/parse-relative-url'
import { getRouteRegex } from 'next/dist/next-server/lib/router/utils/route-regex'
import { denormalizePagePath } from 'next/dist/next-server/server/denormalize-page-path'
import Router from 'next/router'

export default async function resolveHref(url: string, applyBasePath = true) {
  const parsedHref = parseRelativeUrl(url)
  const { pathname } = parsedHref
  const cleanPathname = removePathTrailingSlash(
    denormalizePagePath(applyBasePath ? delBasePath(pathname) : pathname),
  )

  if (cleanPathname === '/404' || cleanPathname === '/_error') {
    return parsedHref
  }

  const pages = (await (Router.router?.pageLoader as PageLoader).getPageList()) as string[]

  // handle resolving href for dynamic routes
  if (!pages.includes(cleanPathname)) {
    pages.some((page) => {
      if (isDynamicRoute(page) && getRouteRegex(page).re.test(cleanPathname)) {
        parsedHref.pathname = applyBasePath ? addBasePath(page) : page
        return true
      }
      return false
    })
  }
  return parsedHref
}
