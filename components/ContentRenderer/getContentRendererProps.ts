import getRowRecentBlogPostProps from 'components/RowRecentBlogPost/getRowRecentBlogPostProps'
import getRowColumnOneAwardsProps from 'components/RowColumnOne/getRowColumnOneAwardsProps'
import getRowPeopleWithTextProps from 'components/RowPeopleWithText/getRowPeopleWithTextProps'
import { ContentRendererTypes } from './ContentRenderer'

export type CRGetStaticProps<P, R> = (props: P) => Promise<R>

export type StaticData = { [T in ContentRendererTypes]?: CRGetStaticProps<any, any> }

let staticProps: StaticData = {}
export const setStaticProps = (newStaticProps: StaticData): void => {
  staticProps = { ...staticProps, ...newStaticProps }
}

setStaticProps({
  RowRecentBlogPost: getRowRecentBlogPostProps,
  RowPeopleWithText: getRowPeopleWithTextProps,
  RowColumnOne: getRowColumnOneAwardsProps,
})

const getContentRendererProps = async (
  content: GQLContentRendererFragment['content'],
): Promise<GQLContentRendererFragment['content']> => {
  const augmented = await Promise.all(
    content.map(async (item) => {
      const loader = staticProps[item.__typename]
      if (!loader) return item
      return Object.assign(item, await loader(item))
    }),
  )

  return augmented
}

export default getContentRendererProps
