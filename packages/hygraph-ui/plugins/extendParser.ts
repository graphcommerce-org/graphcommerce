import type { MethodPlugin } from '@graphcommerce/next-config'
import {
  RowBlogContentProps,
  RowButtonLinkListProps,
  RowColumnThreeProps,
  RowColumnTwoProps,
  RowContentLinksProps,
  RowHeroBannerProps,
  RowProductProps,
  RowServiceOptionsProps,
  RowSpecialBannerProps,
} from '@graphcommerce/next-ui'
import { parseHygraphContentItem } from '../lib'
import { RowColumnTwoFragment } from '../components/RowColumnTwo/RowColumnTwo.gql'
import { RowColumnThreeFragment } from '../components/RowColumnThree/RowColumnThree.gql'
import { RowBlogContentFragment } from '../components/RowBlogContent/RowBlogContent.gql'
import { RowButtonLinkListFragment } from '../components/RowButtonLinkList/RowButtonLinkList.gql'
import { RowContentLinksFragment } from '../components/RowContentLinks/RowContentLinks.gql'
import { RowHeroBannerFragment } from '../components/RowHeroBanner/RowHeroBanner.gql'
import { RowServiceOptionsFragment } from '../components/RowServiceOptions/RowServiceOptions.gql'
import { RowSpecialBannerFragment } from '../components/RowSpecialBanner/RowSpecialBanner.gql'
import { RowProductFragment } from '../components/RowProduct/RowProduct.gql'

export const func = 'parseHygraphContentItem'
export const exported = '@graphcommerce/graphcms-ui/lib/parser'

type ExtendedInput =
  | (RowColumnTwoFragment & {
      __typename: 'RowColumnTwo'
    })
  | (RowColumnThreeFragment & { __typename: 'RowColumnThree' })
  | (RowBlogContentFragment & { __typename: 'RowBlogContent' })
  | (RowButtonLinkListFragment & { __typename: 'RowButtonLinkList' })
  | (RowContentLinksFragment & { __typename: 'RowContentLinks' })
  | (RowHeroBannerFragment & { __typename: 'RowHeroBanner' })
  | (RowServiceOptionsFragment & { __typename: 'RowServiceOptions' })
  | (RowSpecialBannerFragment & { __typename: 'RowSpecialBanner' })
  | (RowProductFragment & { __typename: 'RowProduct' })
type ExtendedOutput =
  | RowColumnTwoProps
  | RowColumnThreeProps
  | RowBlogContentProps
  | RowButtonLinkListProps
  | RowContentLinksProps
  | RowHeroBannerProps
  | RowServiceOptionsProps
  | RowSpecialBannerProps
  | RowProductProps

type ExtendedParserMapType = {
  [K in ExtendedInput['__typename']]: (
    input: Extract<ExtendedInput, { __typename: K }>,
  ) => Extract<ExtendedOutput, { __typename: K }>
}

const extendedParserMap: ExtendedParserMapType = {
  RowColumnTwo: (input) => {
    const { colOne: copy, colTwo: copyTwo } = input

    const output = {
      ...input,
      copy,
      copyTwo,
    }

    return output
  },
  RowColumnThree: (input) => {
    const { colOne: copy, colTwo: copyTwo, colThree: copyThree } = input

    const output = {
      ...input,
      copy,
      copyTwo,
      copyThree,
    }

    return output
  },
  RowBlogContent: (input) => {
    const { content: copy } = input

    const output = {
      ...input,
      copy,
    }

    return output
  },
  RowButtonLinkList: (input) => input,
  RowContentLinks: (input) => {
    const { contentLinks: links } = input

    const output = {
      ...input,
      links,
    }

    return output
  },
  RowHeroBanner: (input) => {
    const { heroAsset: asset, pageLinks: links } = input

    const output = {
      ...input,
      asset,
      links,
    }

    return output
  },
  RowServiceOptions: (input) => {
    const { serviceOptions: options } = input

    const output = {
      ...input,
      options,
    }

    return output
  },
  RowSpecialBanner: (input) => {
    const { pageLinks: links, topic: title } = input

    const output = {
      ...input,
      links,
    }

    return output
  },
  RowProduct: (input) => {
    const { productCopy: copy, pageLinks: links } = input

    const output = {
      ...input,
      copy,
      links,
    }

    return output
  },
}

const extendParser: MethodPlugin<typeof parseHygraphContentItem> = <
  K extends ExtendedInput['__typename'],
>(
  prev,
  input,
) => {
  console.log('extendHygraphParser', input)
  if (!input) return null

  if (extendedParserMap[input.__typename as K]) {
    console.log('extendedParserMap', extendedParserMap, input.__typename)
    return extendedParserMap[input.__typename as K](input)
  }

  /**
   * We overwrite the result of prev(input) with input otherwise the parser
   * runs again and causes undefined object keys for the base parser.
   */
  return { ...prev(input), ...input }
}

export const plugin = extendParser
