import React from 'react'
import { makeStyles, Container, Theme } from '@material-ui/core'
import { vpCalc } from 'components/Theme'
import BlogListItem from './BlogListItem'

const useStyles = makeStyles(
  (theme: Theme) => ({
    blogList: {
      display: 'grid',
      gridColumnGap: theme.gridSpacing.column,
      gridRowGap: theme.gridSpacing.gutter,
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
