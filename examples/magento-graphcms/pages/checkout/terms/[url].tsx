import { PageOptions } from '@graphcommerce/framer-next-pages'
import { CartAgreementsDocument, CartAgreementsQuery } from '@graphcommerce/magento-cart'
import { GetStaticProps, PageMeta, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { enhanceStaticPaths, enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { Container, Typography } from '@mui/material'
import { GetStaticPaths } from 'next'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'
import { graphqlQuery } from '@graphcommerce/graphql-mesh'

type Props = { agreement: NonNullable<NonNullable<CartAgreementsQuery['checkoutAgreements']>[0]> }
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

function TermsPage(props: Props) {
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
  layoutProps: {},
}
TermsPage.pageOptions = pageOptions

export default TermsPage

export const getStaticPaths: GetPageStaticPaths = enhanceStaticPaths(
  'blocking',
  async ({ locale }) =>
    ((await graphqlQuery(CartAgreementsDocument)).data.checkoutAgreements ?? []).map(
      (agreement) => ({
        locale,
        params: { url: agreement?.name.toLowerCase().replace(/\s+/g, '-') ?? '' },
      }),
    ),
)

export const getStaticProps: GetPageStaticProps = enhanceStaticProps(async ({ params }) => {
  const agreements = await graphqlQuery(CartAgreementsDocument)
  const agreement = agreements.data.checkoutAgreements?.find(
    (ca) => ca?.name?.toLowerCase().replace(/\s+/g, '-') === params?.url,
  )

  if (!agreement) return { notFound: true }

  return {
    props: {
      variantMd: 'left',
      agreement,
    },
    revalidate: 60 * 20,
  }
})
