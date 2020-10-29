import { useQuery } from '@apollo/client'
import { Container, makeStyles, NoSsr, Theme, Typography } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import getLayoutHeaderProps from '@reachdigital/magento-app-shell/getLayoutHeaderProps'
import { CartDocument } from '@reachdigital/magento-cart/Cart.gql'
import GuestEmailForm from '@reachdigital/magento-cart/email/GuestEmailForm'
import { CustomerDocument } from '@reachdigital/magento-customer/Customer.gql'
import { CustomerTokenDocument } from '@reachdigital/magento-customer/CustomerToken.gql'
import { IsEmailAvailableDocument } from '@reachdigital/magento-customer/IsEmailAvailable.gql'
import SignInFormInline from '@reachdigital/magento-customer/SignInFormInline'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import getStoreConfig from '@reachdigital/magento-store/getStoreConfig'
import BottomDrawerUi from '@reachdigital/next-ui/AppShell/BottomDrawerUi'
import Button from '@reachdigital/next-ui/Button'
import { PageFC, PageStaticPropsFn } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import clsx from 'clsx'
import { AnimatePresence, m } from 'framer-motion'
import { HTMLMotionProps } from 'framer-motion/types/render/dom/types'
import React, { ReactHTML, useState } from 'react'
import apolloClient from '../../lib/apolloClient'

type PageComponent = PageFC<unknown, PageLayoutProps>
type GetPageStaticProps = PageStaticPropsFn<PageComponent>

type AnimatedRowProps = { key: string } & Omit<
  ReactHTML['div'] & HTMLMotionProps<'div'>,
  'layout' | 'initial' | 'animate' | 'exit' | 'transition'
>

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: 'grid',
    alignItems: 'center',
  },
  formContained: {
    background: '#f7f7f7',
    padding: theme.spacings.xxs,
    overflow: 'hidden',
    borderRadius: 6,
  },
  formRow: {
    padding: theme.spacings.xxs,
  },
  actions: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    paddingBottom: theme.spacings.xs,
    '& :last-child': {
      textAlign: 'right',
    },
  },
}))

function AnimatedRow(props: AnimatedRowProps) {
  return (
    <m.div
      {...props}
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ type: 'tween' }}
    />
  )
}

const CartPage: PageComponent = () => {
  const classes = useStyles()
  const { data: cartQuery } = useQuery(CartDocument)
  const { data: tokenQuery } = useQuery(CustomerTokenDocument)
  const { data: customerQuery } = useQuery(CustomerDocument)
  const { data: emailQuery } = useQuery(IsEmailAvailableDocument, {
    fetchPolicy: 'cache-only',
    variables: { email: cartQuery?.cart?.email ?? '' },
  })

  const isCustomer = tokenQuery?.customerToken
  const canSignIn =
    Boolean(tokenQuery?.customerToken && !tokenQuery?.customerToken.valid) ||
    emailQuery?.isEmailAvailable?.is_email_available === false

  const [expand, setExpand] = useState(false)

  return (
    <BottomDrawerUi title='Checkout' fullHeight>
      <PageMeta title='Checkout' metaDescription='Cart Items' metaRobots='NOINDEX, FOLLOW' />
      <Container maxWidth='sm'>
        <NoSsr>
          <AnimatePresence>
            {tokenQuery?.customerToken?.valid || (
              <AnimatedRow key='email' className={clsx(classes.form, classes.formContained)}>
                <AnimatePresence>
                  {!isCustomer && (
                    <AnimatedRow key='guest-email-form'>
                      <div className={classes.formRow}>
                        <GuestEmailForm
                          signInAdornment={
                            <Button
                              color='secondary'
                              style={{ whiteSpace: 'nowrap' }}
                              onClick={() => setExpand(!expand)}
                            >
                              {expand ? 'Close' : 'Sign In'}
                            </Button>
                          }
                        />
                      </div>
                    </AnimatedRow>
                  )}
                  {!isCustomer && expand && <AnimatedRow key='sign-up' />}
                  {canSignIn && expand && (
                    <AnimatedRow key='sign-in'>
                      <div className={classes.formRow}>
                        <SignInFormInline email={cartQuery?.cart?.email ?? ''} />
                      </div>
                    </AnimatedRow>
                  )}
                </AnimatePresence>
              </AnimatedRow>
            )}
          </AnimatePresence>
        </NoSsr>
      </Container>
    </BottomDrawerUi>
  )
}

CartPage.Layout = PageLayout

registerRouteUi('/checkout', BottomDrawerUi)

export default CartPage

export const getStaticProps: GetPageStaticProps = async () => {
  const client = apolloClient()
  const config = getStoreConfig(client)
  const staticClient = apolloClient()
  const layoutHeader = getLayoutHeaderProps(staticClient)

  await config
  return {
    props: {
      ...(await layoutHeader),
      apolloState: client.cache.extract(),
    },
  }
}
