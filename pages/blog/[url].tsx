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

const BlogView: PageWithLayoutFull = ({ page }) => {
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
        {page.author && <ReleaseDateCard author={page.author} releaseDate={page.releaseDate} />}
        <Typography variant='h1'>{page.title}</Typography>
      </Container>
      <Container maxWidth='md'>
        <ContentRenderer content={page.content} />
      </Container>
      <Container maxWidth='lg'>
        <ContactFormLoader />
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
