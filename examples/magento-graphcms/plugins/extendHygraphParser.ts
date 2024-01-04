import { AllRows } from '@graphcommerce/row-renderer'
import { RowProductFragment } from '../components/GraphCMS/RowProduct/RowProduct.gql'
import { parseHygraphContentItem } from '@graphcommerce/graphcms-ui'
import { MethodPlugin } from '@graphcommerce/next-config'

export const func = 'parseHygraphContentItem'
export const exported = '@graphcommerce/graphcms-ui/lib/parser'

type ExtendedInput = RowProductFragment & {
  __typename:
    | 'RowProduct'
    | 'SimpleProduct'
    | 'ConfigurableProduct'
    | 'GroupedProduct'
    | 'BundleProduct'
    | 'VirtualProduct'
    | 'DownloadableProduct'
    | 'CustomizableProduct'
}

const isProduct = (item: ExtendedInput | AllRows): item is ExtendedInput =>
  item.__typename === 'RowProduct' ||
  item.__typename === 'SimpleProduct' ||
  item.__typename === 'ConfigurableProduct' ||
  item.__typename === 'GroupedProduct' ||
  item.__typename === 'BundleProduct' ||
  item.__typename === 'VirtualProduct' ||
  item.__typename === 'DownloadableProduct' ||
  item.__typename === 'CustomizableProduct'

const extendHygraphParser: MethodPlugin<typeof parseHygraphContentItem> = (prev, input) => {
  if (!input) return null

  if (isProduct(input)) {
    const { productCopy: copy } = input

    const output = {
      ...input,
      copy,
    }

    return { output }
  }

  /**
   * We overwrite the result of prev(input) with input otherwise the parser
   * runs again and causes undefined object keys for the base parser.
   */
  return { ...prev(input), ...input }
}

export const plugin = extendHygraphParser
