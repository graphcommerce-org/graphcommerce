import type { MethodPlugin } from '@graphcommerce/next-config'
import { parseHygraph } from '../lib'

export const func = 'parseHygraph'
export const exported = '@graphcommerce/graphcms-ui/lib'

const test: MethodPlugin<typeof parseHygraph> = (prev) => {
  console.log('alalala')

  /**
   * Todo:
   * - hook into next-ui package or examples folder
   * - make hygraph ggl files for rowColOne, rowLinks, rowQuote under components in this folder.
   * - inject them into the RowRenderer query
   *
   * - if hygraph-ui is installed:
   *  - parse query outcomes with parser for Hygraph
   *
   * - else
   *  - use default JSON inputs
   *
   **/
  return prev
}

export const plugin = test
