import React from 'react'
import Typography from '@material-ui/core/Typography'
import { GetStaticProps } from 'next'
import { Container } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { BlogPosting } from 'schema-dts'
import { JsonLd } from 'react-schemaorg'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from 'components/PageLayout'
import extractParams, { StaticPageParams } from 'node/staticParams'
import getStaticPathsFactory from 'node/getStaticPathsFactory'
import RowColumnOneSingleBlog from 'components/RowColumnOne/RowColumnOneSingleBlog'
import ContentRenderer from 'components/ContentRenderer'
import ReleaseDateCard from 'components/ReleaseDateCard'
import ContactFormLoader from 'components/ContactForm'
import Asset from 'components/Asset'
import useBlogViewStyles from 'components/BlogView/useBlogViewStyles'
import { useHeaderSpacing } from 'components/Header'
import getPageLayoutProps from 'components/PageLayout/getPageLayoutProps'

const BlogView: PageWithLayoutFull = ({ page }) => {
  const classes = useBlogViewStyles()
  const header = useHeaderSpacing()

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
      <Container maxWidth='lg' className={header.marginTop}>
        <ReleaseDateCard {...page} />
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
      <ContentRenderer
        content={page.content}
        renderers={{
          RowColumnOne: RowColumnOneSingleBlog,
        }}
      />
      <Container maxWidth='lg' className={classes.last}>
        <ReleaseDateCard {...page} />
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

export const getStaticProps: GetStaticProps<PageLayoutProps, StaticPageParams> = async (ctx) => ({
  props: await getPageLayoutProps(extractParams(ctx, '/blog/')),
})
