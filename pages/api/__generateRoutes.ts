import { Rewrite, Header, Redirect } from 'next/dist/lib/check-custom-routes'
import { NextApiResponse, NextApiRequest } from 'next'

type Manifest = {
  version: number
  pages404: boolean
  basePath: string
  redirects: Redirect[]
  rewrites: Rewrite[]
  headers: Header[]
  dynamicRoutes: {
    page: string
    regex: string
  }[]
  dataRoutes: {
    page: string
    dataRouteRegex: string
  }[]
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const manifest: Manifest = await import('../../lib/routes-manifest.json').then(
      (mol) => mol.default,
    )

    const pages = manifest.dataRoutes.map(({ page }) => ({ page }))
    const bla = pages
      .map(({ page }): [string, string] => {
        const dynamicRoute = manifest.dynamicRoutes.find((dyn) => dyn.page === page)
        return dynamicRoute ? [dynamicRoute.regex, dynamicRoute.page] : [page, page]
      })
      .sort(([, a], [, b]) => (a < b ? 1 : -1))

    console.log(JSON.stringify(bla))

    res.status(200).end()
  } catch (error) {
    res.status(500).end()
    console.error('Could not load manifest, please build first:', error)
  }
}
