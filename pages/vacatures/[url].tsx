import React from 'react'
import { GetStaticProps } from 'next'
import { Container, Theme, makeStyles, Typography, Link } from '@material-ui/core'
import { JobPosting } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from 'components/PageLayout'
import extractParams, { StaticPageParams } from 'node/staticParams'
import getStaticPathsFactory from 'node/getStaticPathsFactory'
import ContentRenderer from 'components/ContentRenderer'
import { useHeaderSpacing } from 'components/Header'
import getPageLayoutProps from 'components/PageLayout/getPageLayoutProps'
import clsx from 'clsx'
import RowHeroReversed from 'components/RowHero/RowHeroReversed'
import RowYoutubeVideoYellow from 'components/RowYoutubeVideo/RowYoutubeVideoYellow'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.tertiary.contrastText,
      textAlign: 'center',

      '& *::selection': {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.main,
      },
    },
    status: {
      borderRadius: 4,
      border: '2px solid rgba(255,255,255,0.2)',
      color: theme.palette.tertiary.contrastText,
      padding: '15px 30px',
      marginBottom: 30,
      textAlign: 'center',
      ...theme.typography.body1,
    },
    link: {
      marginLeft: 7,
    },
  }),
  { name: 'VacancyView' },
)

const VacancyView: PageWithLayoutFull = ({ page }) => {
  const { content } = page
  const classes = useStyles()
  const headerSpacing = useHeaderSpacing()

  const status = content[0].__typename

  return (
    <>
      <JsonLd<JobPosting>
        item={{
          '@context': 'https://schema.org',
          '@type': 'JobPosting',
          title: page.metaTitle,
          image: page.asset?.url,
          datePosted: page.releaseDate,
        }}
      />

      <div className={clsx(headerSpacing.paddingTop, headerSpacing.paddingBottom, classes.root)}>
        <Container maxWidth='lg'>
          <Typography variant='h1'>{page.title}</Typography>
          {status == 'RowVacancy' && status == 'NOT_AVAILABLE' && (
            <span className={classes.status}>
              Deze vacature is niet meer beschikbaar,
              <Link href='/vacatures' color='inherit' underline='always' className={classes.link}>
                bekijk alle vacatures
              </Link>
            </span>
          )}
        </Container>
      </div>

      <Container>
        <ContentRenderer
          maxWidth='lg'
          content={page.content}
          renderers={{
            RowHero: RowHeroReversed,
            RowYoutubeVideo: RowYoutubeVideoYellow,
          }}
        />
      </Container>
    </>
  )
}

VacancyView.layout = LayoutFull

export default VacancyView

export const getStaticPaths = getStaticPathsFactory('/vacatures/', 'nl')

export const getStaticProps: GetStaticProps<PageLayoutProps, StaticPageParams> = async (ctx) => ({
  props: await getPageLayoutProps(extractParams(ctx, '/vacatures/')),
})
