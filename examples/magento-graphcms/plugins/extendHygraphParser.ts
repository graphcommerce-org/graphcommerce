import { RowProductFragment } from '../components/GraphCMS/RowProduct/RowProduct.gql'
import { ContentItem, parseHygraphContentItem } from '@graphcommerce/graphcms-ui'
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

const isProduct = (item: ContentItem | ExtendedInput): item is ExtendedInput =>
  item.__typename === 'RowProduct' ||
  item.__typename === 'SimpleProduct' ||
  item.__typename === 'ConfigurableProduct' ||
  item.__typename === 'GroupedProduct' ||
  item.__typename === 'BundleProduct' ||
  item.__typename === 'VirtualProduct' ||
  item.__typename === 'DownloadableProduct' ||
  item.__typename === 'CustomizableProduct'

const extendHygraphParser: MethodPlugin<typeof parseHygraphContentItem> = (prev, input) => {
  if (isProduct(input)) {
    const { __typename } = input
    console.log('PARSED CORRECTLY', input.__typename)
    const output = {
      ...input,
      __typename: __typename as RowProductProps['__typename'],
      // copy,
    }

    return output
  }

  console.log('PARSED INCORRECTLY', input.__typename, prev(input), prev)

  return prev(input)
}

export const plugin = extendHygraphParser
