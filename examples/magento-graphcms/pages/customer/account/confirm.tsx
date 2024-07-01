import { PageOptions } from '@graphcommerce/framer-next-pages'
import { ConfirmCustomerForm } from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container } from '@mui/material'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'
import { graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountConfirmPage() {
  return (
    <>
      <PageMeta
        title={i18n._(/* i18n */ 'Account confirmation')}
        metaRobots={['noindex', 'nofollow']}
      />

      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span'>
          <Trans id='Account confirmation' />
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='sm'>
        <ConfirmCustomerForm />
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account-public',
  sharedKey: () => 'account-public',
  Layout: LayoutOverlay,
}
AccountConfirmPage.pageOptions = pageOptions

export default AccountConfirmPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  if (!(await conf).data.storeConfig?.create_account_confirmation)
    return { notFound: true, revalidate: 60 * 20 }

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'bottom',
      size: 'max',
    },
  }
}
