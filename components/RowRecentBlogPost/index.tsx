import React from 'react'
import { Container, makeStyles, ContainerProps } from '@material-ui/core'
import BlogList from '../BlogList'
import { CRGetStaticProps } from '../ContentRenderer/ContentRenderer'
import { UseStyles } from '../Theme'
import Link from '../Link'

const useStyles = makeStyles(
  {
    root: {},
  },
  { name: 'RowRecentBlogPost' },
)

export type RowRecentBlogPostProps = GQLRowRecentBlogPostFragment &
  GQLGetBlogListQuery &
  ContainerProps &
  UseStyles<typeof useStyles>

const RowRecentBlogPost: React.FC<RowRecentBlogPostProps> = (props) => {
  const { link, blogPosts, ...containerProps } = props
  const classes = useStyles(props)
  if (!link || !link.page) {
    return <>Please provide link in RowRecentBlogPost</>
  }

  return (
    <Container {...containerProps} classes={classes}>
      <BlogList blogPosts={blogPosts} />
      <Link href={link.page.url} metaRobots={link.page.metaRobots}>
        {link.title}
      </Link>
    </Container>
  )
}

export default RowRecentBlogPost

export const getStaticProps: CRGetStaticProps<
  GQLRowRecentBlogPostFragment,
  GQLGetBlogListQuery
> = async ({ link }) => {
  const { default: client } = await import('../../lib/apollo')
  const { GetBlogListDocument } = await import('../../generated/apollo')

  if (!link || !link.page)
    throw new Error('Make sure there is a link with a page for GQLGetBlogListQuery')

  const { data } = await client().query<GQLGetBlogListQuery, GQLGetBlogListQueryVariables>({
    query: GetBlogListDocument,
    variables: { locale: link.locale, url: `${link?.page?.url}/`, first: 3 },
  })

  return data
}
