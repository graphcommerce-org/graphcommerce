import { RowProductFragment } from '../components/GraphCMS/RowProduct/RowProduct.gql'
import { Input, parseHygraphContentItem } from '@graphcommerce/graphcms-ui'
import { MethodPlugin } from '@graphcommerce/next-config'
import { RowProductProps } from '../components/GraphCMS'

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

const isProduct = (item: Input | ExtendedInput): item is ExtendedInput =>
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
    const { __typename: __typename, productCopy: copy } = input

    const output = {
      ...input,
      __typename: __typename as RowProductProps['__typename'],
      copy,
    }

    return output
  }

  /**
   * We overwrite the result of prev(input) with input otherwise the parser
   * runs again and causes undefined object keys for the base parser.
   */
  return { ...prev(input), ...input }
}

export const plugin = extendHygraphParser
