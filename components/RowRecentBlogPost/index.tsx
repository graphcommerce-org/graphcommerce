import React from 'react'
import { Container, makeStyles, ContainerProps, Theme, Fab } from '@material-ui/core'
import { CRGetStaticProps } from '../ContentRenderer/ContentRenderer'
import { UseStyles, vpCalc } from '../Theme'
import Link from '../Link'
import BlogListItem from '../BlogList/BlogListItem'
import { ArrowRight } from '../Icons'

const useStyles = makeStyles(
  ({ gridSpacing, palette, spacings, breakpoints }: Theme) => ({
    rowContainer: {
      display: 'grid',
      gridColumnGap: gridSpacing.column,
      gridRowGap: gridSpacing.row,
      marginTop: gridSpacing.gutter,
      marginBottom: gridSpacing.gutter,

      gridTemplateColumns: `1fr`,
      gridTemplateAreas: `
          "post"
          "post"
          "post"
          "view"
        `,

      [breakpoints.up('sm')]: {
        gridTemplateColumns: `
          minmax(${vpCalc(130, 285)}, 1fr)
          minmax(${vpCalc(130, 285)}, 1fr)
        `,
        gridTemplateAreas: `
          "post post"
          "post view"
        `,
      },

      [breakpoints.up('md')]: {
        gridTemplateColumns: `
          repeat(3, minmax(${vpCalc(130, 285)}, 1fr))
          minmax(${vpCalc(72, 112)}, 1fr)}
        `,
        gridTemplateAreas: `"post post post view"`,
      },
    },
    fabContainer: {
      gridArea: 'view',
      color: palette.grey[400],
    },
    fabLink: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
      marginTop: spacings.md,
    },
    fab: {
      backgroundColor: '#fff',
      width: vpCalc(72, 112),
      height: vpCalc(72, 112),
      '&:hover': {
        backgroundColor: '#efefef',
      },
      '& svg': {
        color: palette.primary.main,
        fontSize: 56,
      },
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
  const { rowContainer, fab, fabContainer, fabLink, fabText, ...containerClasses } = useStyles(
    props,
  )
  if (!link || !link.page) {
    return <>Please provide link in RowRecentBlogPost</>
  }

  return (
    <Container {...containerProps} classes={containerClasses} className={rowContainer}>
      {blogPosts.map((blogPost) => (
        <BlogListItem key={blogPost.id} {...blogPost} />
      ))}
      <div className={fabContainer}>
        <Link
          href={link.page.url}
          metaRobots={link.page.metaRobots}
          color='inherit'
          className={fabLink}
        >
          <Fab size='large' classes={{ root: fab }}>
            <ArrowRight />
          </Fab>
          <div className={fabText}>{link.title}</div>
        </Link>
      </div>
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
