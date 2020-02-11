import { GridList, GridListTile, makeStyles } from '@material-ui/core'
import { GQLLocale } from '../generated/graphql'
import { Link, GraphCmsPage } from '../graphcms'
import { WebsiteLayout } from '../layout'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
}))

const Blog: GraphCmsPage = props => {
  const classes = useStyles()

  const { page, childs } = props
  return (
    <>
      <h1>{page?.title}</h1>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {childs.map(child => (
          <GridListTile key={child!.url!} cols={1}>
            <Link href={child!.url!} metaRobots={child!.metaRobots}>
              {child?.title}
            </Link>
          </GridListTile>
        ))}
      </GridList>
    </>
  )
}

Blog.getLayout = WebsiteLayout

export default Blog

// eslint-disable-next-line @typescript-eslint/camelcase
export const unstable_getStaticProps = async () => {
  const { getProps } = await import('../graphcms/ssg')
  return getProps('/blog', GQLLocale.Nl)
}
