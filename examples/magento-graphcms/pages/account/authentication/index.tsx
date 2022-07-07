import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useGoogleRecaptcha } from '@graphcommerce/googlerecaptcha'
import { useQuery } from '@graphcommerce/graphql'
import {
  ApolloCustomerErrorFullPage,
  ChangePasswordForm,
  CustomerDocument,
  useCustomerQuery,
} from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  GetStaticProps,
  SectionContainer,
  iconLock,
  LayoutOverlayHeader,
  LayoutTitle,
  FullPageMessage,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { CircularProgress, Container } from '@mui/material'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'
import { graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountAuthenticationPage() {
  useGoogleRecaptcha()
  const { loading, data, error, called } = useCustomerQuery(CustomerDocument)
  const customer = data?.customer

  if (loading || !called)
    return (
      <FullPageMessage icon={<CircularProgress />} title='Loading your account'>
        <Trans id='This may take a second' />
      </FullPageMessage>
    )

  if (error) return <ApolloCustomerErrorFullPage error={error} />

  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconLock}>
          <Trans id='Authentication' />
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        <PageMeta title={i18n._(/* i18n */ 'Authentication')} metaRobots={['noindex']} />
        <LayoutTitle icon={iconLock}>
          <Trans id='Authentication' />
        </LayoutTitle>
        <SectionContainer labelLeft={<Trans id='Password' />}>
          {customer && <ChangePasswordForm />}
        </SectionContainer>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account',
  Layout: LayoutOverlay,
}
AccountAuthenticationPage.pageOptions = pageOptions

export default AccountAuthenticationPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'bottom',
      size: 'max',
      up: { href: '/account', title: 'Account' },
    },
  }
}
