import { makeStyles, Container, Theme } from '@material-ui/core'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import { BlogListQuery } from './BlogList.gql'
import BlogItem from './BlogItem'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      gap: theme.spacings.md,
      gridTemplateColumns: `repeat(auto-fill, minmax(${responsiveVal(150, 285)}, 1fr))`,
      marginBottom: theme.spacings.lg,
    },
  }),
  { name: 'BlogList' },
)

export type BlogListProps = BlogListQuery

export default function BlogList(props: BlogListProps) {
  const { BlogPosts } = props
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      {BlogPosts.map((BlogPost) => (
        <BlogItem key={BlogPost.title} {...BlogPost} />
      ))}
    </Container>
  )
}
