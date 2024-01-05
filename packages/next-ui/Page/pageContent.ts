/* eslint-disable @typescript-eslint/no-unused-vars */
import { hygraphAllPages } from './hygraphAllPages'
import { hygraphHomePage } from './hygraphHomePage'
import { Pages } from './types'

export const pageContent = async (
  url: string,
  client?: unknown,
  cached?: boolean,
): Promise<{ data: Pages }> => {
  const allRoutes: { data: { pages: Array<{ url: string }> } } = await new Promise((resolve) => {
    resolve({ data: { pages: hygraphAllPages } })
  })

  const found = allRoutes.data.pages.some((page) => page.url === url)

  return found ? Promise.resolve({ data: { pages: [] } }) : Promise.resolve({ data: { pages: [] } })
}
