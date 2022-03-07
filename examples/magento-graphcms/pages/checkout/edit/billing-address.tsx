import { PageOptions } from '@graphcommerce/framer-next-pages'
import { EditBillingAddressForm } from '@graphcommerce/magento-cart-billing-address'
import { MagentoEnv } from '@graphcommerce/magento-store'
import { GetStaticProps, PageMeta, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Container, NoSsr } from '@mui/material'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'
import { DefaultPageDocument } from '../../../graphql/DefaultPage.gql'
import { graphqlSsrClient } from '../../../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

function EditBillingAddress() {
  return (
    <>
      <PageMeta title={t`Edit billing address`} metaRobots={['noindex', 'nofollow']} />

      <LayoutOverlayHeader>
        <LayoutTitle component='span' size='small'>
          <Trans>Billing address</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>

      <LayoutTitle variant='h1'>
        <Trans>Billing address</Trans>
      </LayoutTitle>

      <Container maxWidth='md'>
        <NoSsr>
          <EditBillingAddressForm />
        </NoSsr>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'left',
  Layout: LayoutOverlay,
  layoutProps: { variantMd: 'left' },
}
EditBillingAddress.pageOptions = pageOptions

export default EditBillingAddress

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const staticClient = graphqlSsrClient(locale)

  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: `checkout`,
      rootCategory: (process.env as MagentoEnv).ROOT_CATEGORY,
    },
  })

  return {
    props: {
      ...(await page).data,
      variantMd: 'left',
    },
  }
}
