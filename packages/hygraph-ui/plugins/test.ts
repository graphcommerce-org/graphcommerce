import type { MethodPlugin } from '@graphcommerce/next-config'
import { parseHygraph } from '../lib'

export const func = 'parseHygraph'
export const exported = '@graphcommerce/graphcms-ui/lib'

const test: MethodPlugin<typeof parseHygraph> = (prev) => {
  console.log('alalala')

  return prev
}

export const plugin = test
