import React from 'react'
import Typography from '@material-ui/core/Typography'
import { GetStaticProps } from 'next'
import { Container, makeStyles } from '@material-ui/core'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from '../../components/PageLayout'
import extractParams, { StaticPageParams } from '../../lib/staticParams'
import getStaticPathsFactory from '../../lib/getStaticPaths'
import ContentRenderer from '../../components/ContentRenderer'
import AuthorCard from '../../components/AuthorCard'
import ContactFormLoader from '../../components/ContactForm'

const useStyles = makeStyles({
  article: {
    margin: '0 auto',
    maxWidth: 800,
  },
})

const BlogView: PageWithLayoutFull = ({ page }) => {
  const classes = useStyles()
  const image = 'https://media.graphcms.com/resize=fit:max,w:100/L4GgPJCbS5OHefBPtaTp'

  return (
    <Container maxWidth='lg'>
      {/* TODO get data below from parent component */}
      <AuthorCard name='Erwin Otten' date='19 juni 2015' imageUrl={image} />
      <Typography variant='h1'>{page.title}</Typography>
      <div className={classes.article}>
        <ContentRenderer content={page.content} />
      </div>
      <ContactFormLoader />
    </Container>
  )

  // return (
  //   <div>
  //     <JsonLd<BlogPosting>
  //       item={{
  //         '@context': 'https://schema.org',
  //         '@type': 'BlogPosting',
  //         headline: page.metaTitle!,
  //         image: page.blogPost.image?.url,
  //         datePublished: page.blogPost.publicPublishedAt,
  //       }}
  //     />
  //     <h1>
  //       <Link metaRobots={page.metaRobots!} href={page.url!}>
  //         {page.breadcrumbTitle}
  //       </Link>
  //     </h1>

  //     {/* eslint-disable react/no-danger */}
  //     <div dangerouslySetInnerHTML={{ __html: page.blogPost?.content! }} />
  //   </div>
  // )
}

BlogView.layout = LayoutFull

export default BlogView

export const getStaticPaths = getStaticPathsFactory('/blog/', 'nl')

export const getStaticProps: GetStaticProps<PageLayoutProps, StaticPageParams> = async (ctx) => {
  const params = extractParams(ctx, '/blog/')
  const { getStaticProps: get } = await import('../../components/PageLayout')
  return { props: await get(params) }
}
