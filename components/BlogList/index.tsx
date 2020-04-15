import React from 'react'
import { makeStyles, Container, Theme } from '@material-ui/core'
import BlogListItem from './BlogListItem'
import { vpCalc } from '../Theme'

const useStyles = makeStyles((theme: Theme) => ({
  blogList: {
    display: 'grid',
    gridColumnGap: theme.gridSpacing.column,
    gridRowGap: theme.gridSpacing.row,
    gridTemplateColumns: `repeat(auto-fill, minmax(${vpCalc(150, 285)}, 1fr))`,
  },
}))

const BlogList: React.FC<GQLGetBlogListQuery> = ({ blogPosts }) => {
  const classes = useStyles()
  return (
    <Container className={classes.blogList}>
      {blogPosts.map((blogPost) => (
        <BlogListItem key={blogPost.id} {...blogPost} />
      ))}
    </Container>
  )
}

export default BlogList
