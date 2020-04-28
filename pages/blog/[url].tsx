import React from 'react'
import Typography from '@material-ui/core/Typography'
import { GetStaticProps } from 'next'
import { Container } from '@material-ui/core'
import { BlogPosting } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from '../../components/PageLayout'
import extractParams, { StaticPageParams } from '../../lib/staticParams'
import getStaticPathsFactory from '../../lib/getStaticPaths'
import ContentRenderer from '../../components/ContentRenderer'
import ReleaseDateCard from '../../components/ReleaseDateCard'
import ContactFormLoader from '../../components/ContactForm'
import Asset from '../../components/Asset'
import useBlogViewStyles from '../../components/BlogView/useBlogViewStyles'

const BlogView: PageWithLayoutFull = ({ page }) => {
  const classes = useBlogViewStyles()

  const releaseDateFormatted = new Date(page.releaseDate).toLocaleDateString(page.locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <JsonLd<BlogPosting>
        item={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: page.metaTitle,
          image: page.asset?.url,
          datePublished: page.releaseDate,
        }}
      />
      <Container maxWidth='lg'>
        {page.author && <ReleaseDateCard author={page.author} releaseDate={releaseDateFormatted} />}
        <div className={classes.featured}>
          {page.asset && (
            <div className={classes.assetWrapper}>
              <Asset
                asset={page.asset}
                className={classes.asset}
                autoPlay
                loop
                muted
                playsInline
                width={380}
              />
            </div>
          )}
          <Typography variant='h1' className={classes.pageTitle}>
            {page.title}
          </Typography>
        </div>
      </Container>
      <Container className={classes.article}>
        <ContentRenderer content={page.content} />
      </Container>
      <Container maxWidth='lg' className={classes.last}>
        {page.author && <ReleaseDateCard author={page.author} releaseDate={releaseDateFormatted} />}
        <div className={classes.boxed}>
          <ContactFormLoader />
        </div>
      </Container>
    </>
  )
}

BlogView.layout = LayoutFull

export default BlogView

export const getStaticPaths = getStaticPathsFactory('/blog/', 'nl')

export const getStaticProps: GetStaticProps<PageLayoutProps, StaticPageParams> = async (ctx) => {
  const params = extractParams(ctx, '/blog/')
  const { getStaticProps: get } = await import('../../components/PageLayout')
  return { props: await get(params) }
}
