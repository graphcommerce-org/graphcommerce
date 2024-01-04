import {
  RowBlogContentProps,
  RowButtonLinkListProps,
  RowColumnThreeProps,
  RowColumnTwoProps,
  RowContentLinksProps,
  RowHeroBannerProps,
  RowServiceOptionsProps,
  RowSpecialBannerProps,
} from '@graphcommerce/row-renderer'
import { RowBlogContentFragment } from '../components/RowBlogContent/RowBlogContent.gql'
import { RowButtonLinkListFragment } from '../components/RowButtonLinkList/RowButtonLinkList.gql'
import { RowColumnThreeFragment } from '../components/RowColumnThree/RowColumnThree.gql'
import { RowColumnTwoFragment } from '../components/RowColumnTwo/RowColumnTwo.gql'
import { RowContentLinksFragment } from '../components/RowContentLinks/RowContentLinks.gql'
import { RowHeroBannerFragment } from '../components/RowHeroBanner/RowHeroBanner.gql'
import { RowServiceOptionsFragment } from '../components/RowServiceOptions/RowServiceOptions.gql'
import { RowSpecialBannerFragment } from '../components/RowSpecialBanner/RowSpecialBanner.gql'
import { MethodPlugin } from '@graphcommerce/next-config'
import { parseHygraphContentItem } from '../lib'

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

type ExtendedOutput =
  | RowColumnTwoProps
  | RowColumnThreeProps
  | RowBlogContentProps
  | RowButtonLinkListProps
  | RowContentLinksProps
  | RowHeroBannerProps
  | RowServiceOptionsProps
  | RowSpecialBannerProps

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
      title,
    }

    return output
  },
}

// ExtendParser should extend the BaseParser input type with some typescript magic.
const extendParser: MethodPlugin<typeof parseHygraphContentItem> = (prev, input) => {
  if (!input) return null

  if (extendedParserMap[input.__typename]) {
    return extendedParserMap[input.__typename](input)
  }

  /**
   * We overwrite the result of prev(input) with input otherwise the parser
   * runs again and causes undefined object keys for the base parser.
   */
  return { ...prev(input), ...input }
}

export const plugin = extendParser
