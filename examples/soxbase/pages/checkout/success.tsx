import { useQuery } from '@apollo/client'
import { Box, Container, makeStyles, Theme } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { CartItemSummary, CartSummary } from '@reachdigital/magento-cart'
import { CustomerDocument } from '@reachdigital/magento-customer'
import { AccountNewsletter } from '@reachdigital/magento-customer-account'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import {
  AppShellTitle,
  Button,
  GetStaticProps,
  iconParty,
  PageShellHeader,
  Stepper,
  Title,
} from '@reachdigital/next-ui'
import PageLink from 'next/link'
import React from 'react'
import { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import MinimalPageShell, { MinimalPageShellProps } from '../../components/AppShell/MinimalPageShell'
import { DefaultPageDocument } from '../../components/GraphQL/DefaultPage.gql'
import apolloClient from '../../lib/apolloClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props>

// TODO: new component 'OrderSuccessSignupNewsletter'
const useStyles = makeStyles(
  (theme: Theme) => ({
    signup: {
      background: theme.palette.background.highlight,
      display: 'grid',
      alignItems: 'center',
      gridAutoFlow: 'column',
      columnGap: theme.spacings.xxs,
      padding: theme.spacings.sm,
      ...theme.typography.body1,
      marginTop: theme.spacings.sm,
      borderRadius: 4,
      gridTemplateColumns: '1fr 1fr',
      gridTemplateAreas: `
        "a a a"
        "b c c"
      `,
      [theme.breakpoints.up('sm')]: {
        gridTemplateAreas: `"a b c"`,
        gridTemplateColumns: '4fr 1fr',
      },
    },
    signupForm: {
      display: 'flex',
      gap: 8,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  }),
  {
    name: 'SignUpNewsletterOrderSuccess',
  },
)

type SignupNewsletterProps = {
  email: string
}

export function SignupNewsletter(props: SignupNewsletterProps) {
  const { email } = props
  const classes = useStyles()

  return (
    <div className={classes.signup}>
      <b>Sign up for our newsletter and stay updated</b>
      <div className={classes.signupForm}>
        <AccountNewsletter color='primary' hideErrors />
        {email ?? 'unknown@undefined.nl'}
      </div>
    </div>
  )
}

function ShippingPage() {
  const { data: customerQuery } = useQuery(CustomerDocument, { fetchPolicy: 'cache-only' })

  return (
    <>
      <PageMeta title='Checkout summary' metaDescription='Ordered items' metaRobots={['noindex']} />
      <PageShellHeader
        divider={
          <Container maxWidth={false}>
            <Stepper steps={3} currentStep={3} />
          </Container>
        }
      >
        <Title size='small' icon={iconParty}>
          Thank you for your order!
        </Title>
      </PageShellHeader>
      <Container maxWidth='md'>
        <AppShellTitle icon={iconParty}>Thank you for your order!</AppShellTitle>
        <CartSummary />
        <CartItemSummary />

        {customerQuery?.customer?.email && (
          <SignupNewsletter email={customerQuery.customer.email} />
        )}

        <Box textAlign='center' m={8}>
          <PageLink href='/' passHref>
            <Button color='secondary' variant='pill' size='large' text='bold'>
              Back to home
            </Button>
          </PageLink>
        </Box>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<MinimalPageShellProps> = {
  overlayGroup: 'checkout',
  SharedComponent: MinimalPageShell,
  sharedKey: () => 'checkout',
}
ShippingPage.pageOptions = pageOptions

export default ShippingPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)
  const conf = client.query({ query: StoreConfigDocument })
  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: `checkout/success`,
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })

  return {
    props: {
      ...(await page).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
