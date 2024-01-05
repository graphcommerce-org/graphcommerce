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
import { ContentItem, parseHygraphContentItem } from '../lib'

export const func = 'parseHygraphContentItem'
export const exported = '@graphcommerce/graphcms-ui/lib/parser'

const extendedParserMap = {
  RowColumnTwo: (input: ContentItem & RowColumnTwoFragment): RowColumnTwoProps => {
    const { __typename, colOne: copy, colTwo: copyTwo } = input

    const output = {
      ...input,
      __typename: __typename as RowColumnTwoProps['__typename'],
      copy,
      copyTwo,
    }

    return output
  },
  RowColumnThree: (input: ContentItem & RowColumnThreeFragment): RowColumnThreeProps => {
    const { __typename, colOne: copy, colTwo: copyTwo, colThree: copyThree } = input

    const output = {
      ...input,
      __typename: __typename as RowColumnThreeProps['__typename'],
      copy,
      copyTwo,
      copyThree,
    }

    return output
  },
  RowBlogContent: (input: ContentItem & RowBlogContentFragment): RowBlogContentProps => {
    const { __typename, content: copy } = input

    const output = {
      ...input,
      __typename: __typename as RowBlogContentProps['__typename'],
      copy,
    }

    return output
  },
  RowButtonLinkList: (input: ContentItem & RowButtonLinkListFragment): RowButtonLinkListProps => {
    const { __typename } = input

    const output = {
      ...input,
      __typename: __typename as RowButtonLinkListProps['__typename'],
    }

    return output
  },
  RowContentLinks: (input: ContentItem & RowContentLinksFragment): RowContentLinksProps => {
    const { __typename, contentLinks: links } = input

    const output = {
      ...input,
      __typename: __typename as RowContentLinksProps['__typename'],
      links,
    }

    return output
  },
  RowHeroBanner: (input: ContentItem & RowHeroBannerFragment): RowHeroBannerProps => {
    const { __typename, heroAsset: asset, pageLinks: links } = input

    const output = {
      ...input,
      __typename: __typename as RowHeroBannerProps['__typename'],
      asset,
      links,
    }

    return output
  },
  RowServiceOptions: (input: ContentItem & RowServiceOptionsFragment): RowServiceOptionsProps => {
    const { __typename, serviceOptions: options } = input

    const output = {
      ...input,
      __typename: __typename as RowServiceOptionsProps['__typename'],
      options,
    }

    return output
  },
  RowSpecialBanner: (input: ContentItem & RowSpecialBannerFragment): RowSpecialBannerProps => {
    const { __typename, pageLinks: links, topic: title } = input

    const output = {
      ...input,
      __typename: __typename as RowSpecialBannerProps['__typename'],
      links,
      title,
    }

    return output
  },
}

const extendParser: MethodPlugin<typeof parseHygraphContentItem> = (prev, input) => {
  if (extendedParserMap[input.__typename]) {
    console.log('PARSED CORRECTLY', input.__typename)
    return extendedParserMap[input.__typename](input)
  }

  console.log('PARSED INCORRECTLY', input.__typename, prev(input), prev)

  return prev(input)
}

export const plugin = extendParser
