import { ApolloErrorFullPage } from '@graphcommerce/ecommerce-ui'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useConfirmCustomer } from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  GetStaticProps,
  LayoutOverlayHeader,
  LayoutTitle,
  IconSvg,
  iconPerson,
  FullPageMessage,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Button, Typography } from '@mui/material'
import PageLink from 'next/link'
import { LayoutOverlay, LayoutOverlayProps } from '../../components'
import { graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountConfirmPage() {
  const { error, loading } = useConfirmCustomer()

  return (
    <>
      <PageMeta title={i18n._(/* i18n */ 'Confirm account')} metaRobots={['noindex', 'nofollow']} />

      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span'>
          <Trans id='Account confirmation' />
        </LayoutTitle>
      </LayoutOverlayHeader>

      {!error && loading && (
        <FullPageMessage
          icon={<IconSvg src={iconPerson} size='xxl' />}
          title={<Trans id='Validating your email...' />}
        />
      )}
      {error && (
        <ApolloErrorFullPage
          icon={<IconSvg src={iconPerson} size='xxl' />}
          error={error}
          button={
            <PageLink href='/account/signin' passHref>
              <Button variant='pill' color='primary' size='large'>
                <Trans id='Log in' />
              </Button>
            </PageLink>
          }
          altButton={
            <PageLink href='/' passHref>
              <Button variant='text' color='primary'>
                <Trans id='Return to home' />
              </Button>
            </PageLink>
          }
        />
      )}
      {!error && !loading && (
        <FullPageMessage
          icon={<IconSvg src={iconPerson} size='xxl' />}
          title={<Trans id='Thank you!' />}
          button={
            <PageLink href='/account/signin' passHref>
              <Button variant='pill' color='primary' size='large'>
                <Trans id='Log in' />
              </Button>
            </PageLink>
          }
        >
          <Typography variant='h6' align='center'>
            <Trans id='Your account has been verified.' />
            <Trans id='Sign in and finish registration.' />
          </Typography>
        </FullPageMessage>
      )}
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

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'bottom',
      size: 'max',
    },
  }
}
