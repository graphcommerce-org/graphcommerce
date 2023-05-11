import { PageOptions } from '@graphcommerce/framer-next-pages'
import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import { CartAgreementsDocument } from '@graphcommerce/magento-cart'
import { PageMeta, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { enhanceStaticPaths, enhanceStaticProps, notFound } from '@graphcommerce/next-ui/server'
import { Container, Typography } from '@mui/material'
import { InferGetStaticPropsType } from 'next'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'
import { getLayout } from '../../../components/Layout/layout'

function TermsPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { agreement } = props

  const title = agreement?.name ?? ''

  return (
    <>
      <PageMeta title={title} />

      <LayoutOverlayHeader>
        <LayoutTitle component='span' size='small'>
          {title}
        </LayoutTitle>
      </LayoutOverlayHeader>

      <LayoutTitle variant='h1'>{title}</LayoutTitle>

      <Container maxWidth='md'>
        <Typography component='div' variant='body1'>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: agreement?.content ?? '' }} />
        </Typography>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'left',
  Layout: LayoutOverlay,
  layoutProps: { variantMd: 'left' },
}
TermsPage.pageOptions = pageOptions

export default TermsPage

export const getStaticPaths = enhanceStaticPaths('blocking', async ({ locale }) =>
  ((await graphqlQuery(CartAgreementsDocument)).data.checkoutAgreements ?? []).map((agreement) => ({
    locale,
    params: { url: agreement?.name.toLowerCase().replace(/\s+/g, '-') ?? '' },
  })),
)

export const getStaticProps = enhanceStaticProps(getLayout, async ({ params }) => {
  const agreements = await graphqlQuery(CartAgreementsDocument)
  const agreement = agreements.data.checkoutAgreements?.find(
    (ca) => ca?.name?.toLowerCase().replace(/\s+/g, '-') === params?.url,
  )

  if (!agreement) return notFound()

  return {
    props: {
      agreement,
    },
    revalidate: 60 * 20,
  }
})
