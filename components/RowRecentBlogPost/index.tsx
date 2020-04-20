import React from 'react'
import LinkInternal from '../LinkInternal/LinkInternal'
import { GetStaticData } from '../../lib/staticParams'

const RowRecentBlogPost: React.FC<GQLRowRecentBlogPostFragment> = ({ link }) => {
  if (!link || !link.page) {
    return <>Please provide link in RowRecentBlogPost</>
  }

  return (
    <>
      <LinkInternal {...link} />
    </>
  )
}

export default RowRecentBlogPost

export const getStaticData: GetStaticData<GQLGetBlogListQuery> = async (variables) => {
  const { default: client } = await import('../../lib/apollo')
  const { GetBlogListDocument } = await import('../../generated/apollo')

  const { data } = await client().query<GQLGetBlogListQuery, GQLGetBlogListQueryVariables>({
    query: GetBlogListDocument,
    variables,
  })

  return data
}
