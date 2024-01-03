import { AllRows } from '@graphcommerce/next-ui'
import { RowProductFragment } from '../components/GraphCMS/RowProduct/RowProduct.gql'

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

const extendHygraphParser = <K extends ExtendedInput['__typename']>(
  prev,
  input: Extract<ExtendedInput, { __typename: K }>,
) => {
  if (!input) return null

  if (isProduct(input)) {
    const { productCopy: copy } = input

    return { ...prev(input), ...input, copy }
  }

  /**
   * We overwrite the result of prev(input) with input otherwise the parser
   * runs again and causes undefined object keys for the base parser.
   */
  return { ...prev(input), input }
}

export const plugin = extendHygraphParser
