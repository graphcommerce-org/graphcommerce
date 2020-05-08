import React from 'react'
import Typography from '@material-ui/core/Typography'
import { GetStaticProps } from 'next'
import { Container } from '@material-ui/core'
import { JobPosting } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from '../../components/PageLayout'
import extractParams, { StaticPageParams } from '../../lib/staticParams'
import getStaticPathsFactory from '../../lib/getStaticPaths'
import ContentRenderer from '../../components/ContentRenderer'
import ContactFormLoader from '../../components/ContactForm'
import Asset from '../../components/Asset'
import useStyles from '../../components/VacancyList/Styles'
import { useHeaderSpacing } from '../../components/Header'

const VacancyView: PageWithLayoutFull = ({ page }) => {
  const classes = useStyles()
  const header = useHeaderSpacing()

  return (
    <>
      <JsonLd<JobPosting>
        item={{
          '@context': 'https://schema.org',
          '@type': 'JobPosting',
          title: page.metaTitle,
          employmentType: page.metaDescription,
        }}
      />
      <Container maxWidth='lg' className={header.marginTop}>
        <div className={classes.featured}>
          {page.asset && (
            <div className={classes.assetWrapper}>
              <Asset asset={page.asset} className={classes.asset} width={380} />
            </div>
          )}
          <Typography variant='h1' className={classes.pageTitle}>
            {page.title}
          </Typography>
        </div>
      </Container>
      <ContentRenderer content={page.content} />
      <Container maxWidth='lg' className={classes.last}>
        <div className={classes.boxed}>
          <ContactFormLoader />
        </div>
      </Container>
    </>
  )
}

VacancyView.layout = LayoutFull

export default VacancyView

export const getStaticPaths = getStaticPathsFactory('/vacatures/', 'nl')

export const getStaticProps: GetStaticProps<PageLayoutProps, StaticPageParams> = async (ctx) => {
  const params = extractParams(ctx, '/vacatures/')
  const { getStaticProps: get } = await import('../../components/PageLayout')
  return { props: await get(params) }
}
