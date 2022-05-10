import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useGoogleRecaptcha } from '@graphcommerce/googlerecaptcha'
import { useQuery } from '@graphcommerce/graphql'
import {
  ApolloCustomerErrorFullPage,
  CustomerDocument,
  UpdateCustomerEmailForm,
} from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  GetStaticProps,
  iconEmailOutline,
  SectionContainer,
  LayoutOverlayHeader,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container, NoSsr } from '@mui/material'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'
import { graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountContactPage() {
  useGoogleRecaptcha()

  const { loading, data, error } = useQuery(CustomerDocument, {
    ssr: false,
  })
  const customer = data?.customer

  if (loading) return <div />
  if (error)
    return (
      <ApolloCustomerErrorFullPage
        error={error}
        signInHref='/account/signin'
        signUpHref='/account/signin'
      />
    )

  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconEmailOutline}>
          <Trans id='Contact' />
        </LayoutTitle>
      </LayoutOverlayHeader>
      <NoSsr>
        <Container maxWidth='md'>
          <PageMeta
            title={i18n._(/* i18n */ `Contact`)}
            metaDescription={i18n._(/* i18n */ `Contact information`)}
            metaRobots={['noindex']}
          />

          <LayoutTitle icon={iconEmailOutline}>
            <Trans id='Contact' />
          </LayoutTitle>

          <SectionContainer labelLeft='Email'>
            {customer && <UpdateCustomerEmailForm email={customer.email ?? ''} />}
          </SectionContainer>
        </Container>
      </NoSsr>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account',
  Layout: LayoutOverlay,
}
AccountContactPage.pageOptions = pageOptions

export default AccountContactPage

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
