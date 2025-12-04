import { PageOptions } from '@graphcommerce/framer-next-pages'
import { ConfirmCustomerForm, getCustomerAccountIsDisabled } from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { Container } from '@mui/material'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'
import { graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'
import { revalidate } from '@graphcommerce/next-ui'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountConfirmPage() {
  return (
    <>
      <PageMeta title={t`Account confirmation`} metaRobots={['noindex', 'nofollow']} />

      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span'>
          <Trans>Account confirmation</Trans>
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

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCustomerAccountIsDisabled(context.locale)) return { notFound: true }

  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  if (!(await conf).data.storeConfig?.create_account_confirmation)
    return { notFound: true, revalidate: revalidate() }

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'bottom',
    },
    revalidate: revalidate(),
  }
}
