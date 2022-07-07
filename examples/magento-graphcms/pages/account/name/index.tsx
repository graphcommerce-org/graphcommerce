import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useGoogleRecaptcha } from '@graphcommerce/googlerecaptcha'
import {
  ApolloCustomerErrorFullPage,
  ChangeNameForm,
  CustomerDocument,
  useCustomerQuery,
} from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  GetStaticProps,
  iconId,
  SectionContainer,
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

function AccountNamePage() {
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
        <LayoutTitle size='small' component='span' icon={iconId}>
          <Trans id='Name' />
        </LayoutTitle>
      </LayoutOverlayHeader>

      <Container maxWidth='md'>
        <PageMeta title={i18n._(/* i18n */ 'Name')} metaRobots={['noindex']} />

        <LayoutTitle icon={iconId}>
          <Trans id='Name' />
        </LayoutTitle>

        <SectionContainer labelLeft={<Trans id='Name' />}>
          {customer && (
            <ChangeNameForm
              prefix={customer.prefix ?? ''}
              firstname={customer.firstname ?? ''}
              lastname={customer.lastname ?? ''}
            />
          )}
        </SectionContainer>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account',
  Layout: LayoutOverlay,
}
AccountNamePage.pageOptions = pageOptions

export default AccountNamePage

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
