import { PageOptions } from '@graphcommerce/framer-next-pages'
import { AccountDeleteForm } from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, LayoutOverlayHeader, LayoutTitle, iconBin } from '@graphcommerce/next-ui'
import { Trans, t } from '@lingui/macro'
import { Container } from '@mui/material'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'
import { graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountDeletePage() {
  return (
    <>
      <PageMeta title={t`Delete account`} metaRobots={['noindex']} />

      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconBin}>
          <Trans>Delete account</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>

      <Container maxWidth='md'>
        <PageMeta title={t`Delete account`} metaRobots={['noindex']} />

        <LayoutTitle icon={iconBin}>
          <Trans>Delete account</Trans>
        </LayoutTitle>
        <AccountDeleteForm />
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account',
  Layout: LayoutOverlay,
}
AccountDeletePage.pageOptions = pageOptions

export default AccountDeletePage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  if (
    import.meta.graphCommerce.magentoVersion < 246 ||
    !import.meta.graphCommerce.customerDeleteEnabled
  )
    return { notFound: true }

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'bottom',
    },
  }
}
