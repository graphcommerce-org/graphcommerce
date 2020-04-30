import React from 'react'
import { makeStyles, Container, Theme } from '@material-ui/core'
import BlogListItem from './BlogListItem'
import { vpCalc } from '../Theme'
import { GQLGetStaticProps } from '../../lib/staticParams'

const useStyles = makeStyles(
  (theme: Theme) => ({
    blogList: {
      display: 'grid',
      gridColumnGap: theme.gridSpacing.column,
      gridRowGap: theme.gridSpacing.row,
      gridTemplateColumns: `repeat(auto-fill, minmax(${vpCalc(150, 285)}, 1fr))`,
    },
  }),
  { name: 'BlogList' },
)

const BlogList: React.FC<GQLGetBlogListQuery> = ({ blogPosts }) => {
  const classes = useStyles()
  return (
    <Container maxWidth='lg' className={classes.blogList}>
      {blogPosts.map((blogPost) => (
        <BlogListItem key={blogPost.id} {...blogPost} />
      ))}
    </Container>
  )
}

export default BlogList

export const getStaticProps: GQLGetStaticProps<GQLGetBlogListQuery> = async (variables) => {
  const { default: client } = await import('../../lib/apollo')
  const { GetBlogListDocument } = await import('../../generated/apollo')
  const { data } = await client().query<GQLGetBlogListQuery, GQLGetBlogListQueryVariables>({
    query: GetBlogListDocument,
    variables: { url: `${variables.url}/`, locale: variables.locale },
  })
  return data
}
