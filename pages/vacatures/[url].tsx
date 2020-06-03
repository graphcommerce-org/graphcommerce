import React from 'react'
import { GetStaticProps } from 'next'
import { Container } from '@material-ui/core'
import { JobPosting } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from 'components/PageLayout'
import extractParams, { StaticPageParams } from 'node/staticParams'
import getStaticPathsFactory from 'node/getStaticPathsFactory'
import ContentRenderer from 'components/ContentRenderer'
import getPageLayoutProps from 'components/PageLayout/getPageLayoutProps'
import RowHeroReversed from 'components/RowHero/RowHeroReversed'
import RowYoutubeVideoYellow from 'components/RowYoutubeVideo/RowYoutubeVideoYellow'

const VacancyView: PageWithLayoutFull = ({ page }) => {
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
