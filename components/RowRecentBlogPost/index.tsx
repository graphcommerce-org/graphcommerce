import React from 'react'
import { Container, makeStyles, ContainerProps, Theme, Fab } from '@material-ui/core'
import { CRGetStaticProps } from '../ContentRenderer/ContentRenderer'
import { UseStyles, vpCalc } from '../Theme'
import Link from '../Link'
import BlogListItem from '../BlogList/BlogListItem'
import { ArrowRight } from '../Icons'
import TriangleBg from '../TriangleBg'

const useStyles = makeStyles(
  ({ gridSpacing, palette, spacings, breakpoints }: Theme) => ({
    rowContainer: {
      display: 'grid',
      gridColumnGap: gridSpacing.column,
      gridRowGap: gridSpacing.row,
      paddingTop: spacings.xl,
      paddingBottom: spacings.xl,

      gridTemplateColumns: `repeat(2, minmax(${vpCalc(130, 285)}, 1fr))`,
      gridTemplateAreas: `
        "post1 post2"
        "post3 view"
      `,
      [breakpoints.only('md')]: {
        maxWidth: breakpoints.values.md,
      },
      [breakpoints.up('lg')]: {
        gridTemplateColumns: `repeat(4, minmax(${vpCalc(130, 285)}, 1fr))`,
        gridTemplateAreas: `
          "post1 post2 post3 view"
        `,
      },
    },
    fabContainer: {
      // gridArea: 'view',
    },
    fabAspect: {
      position: 'relative',
      paddingTop: 'calc(100% / 3 * 2)',
    },
    fabLink: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fab: {
      width: vpCalc(72, 112),
      height: vpCalc(72, 112),
      '& svg': { color: palette.primary.main, fontSize: vpCalc(30, 56) },
    },
    fabText: {
      marginTop: spacings.sm,
    },
  }),
  { name: 'RowRecentBlogPost' },
)

export type RowRecentBlogPostProps = GQLRowRecentBlogPostFragment &
  GQLGetBlogListQuery &
  ContainerProps &
  UseStyles<typeof useStyles>

const RowRecentBlogPost: React.FC<RowRecentBlogPostProps> = (props) => {
  const { link, blogPosts, ...containerProps } = props
  const {
    rowContainer,
    fab,
    fabLink,
    fabText,
    fabAspect,
    fabContainer,
    ...containerClasses
  } = useStyles(props)
  if (!link || !link.page) {
    return <>Please provide link in RowRecentBlogPost</>
  }

  return (
    <TriangleBg color='white' gradient>
      <Container {...containerProps} classes={containerClasses} className={rowContainer}>
        {blogPosts.map((blogPost, index) => (
          <BlogListItem key={blogPost.id} {...blogPost} />
        ))}

        <div className={fabContainer}>
          <div className={fabAspect}>
            <Link
              href={link.page.url}
              metaRobots={link.page.metaRobots}
              color='inherit'
              className={fabLink}
            >
              <Fab size='large' classes={{ root: fab }} aria-label={link.page.title}>
                <ArrowRight />
              </Fab>
              <div className={fabText}>{link.title}</div>
            </Link>
          </div>
        </div>
      </Container>
    </TriangleBg>
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
