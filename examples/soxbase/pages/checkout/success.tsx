import {
  Box,
  Container,
  NoSsr,
  Typography,
  Theme,
  makeStyles,
  Switch,
  Link,
} from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { useCartQuery } from '@reachdigital/magento-cart'
import { CartPageDocument, OrderSummary } from '@reachdigital/magento-cart-checkout'
import {
  AddressMultiLine,
  AddressMultiLine,
  OrderStateLabelInline,
} from '@reachdigital/magento-customer'
import InlineAccount from '@reachdigital/magento-customer/InlineAccount'
import { ConfigurableCartItem } from '@reachdigital/magento-product-configurable'

import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import IconHeader from '@reachdigital/next-ui/IconHeader'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import SectionHeader from '@reachdigital/next-ui/SectionHeader'
import Stepper from '@reachdigital/next-ui/Stepper/Stepper'
import { iconHeart } from '@reachdigital/next-ui/icons'
import PageLink from 'next/link'
import React from 'react'
import { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import MinimalPageShell, { MinimalPageShellProps } from '../../components/AppShell/MinimalPageShell'
import Button from '../../components/PageLink/Button'
import apolloClient from '../../lib/apolloClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props>

const useStyles = makeStyles(
  (theme: Theme) => ({
    orderDetailContainer: {
      gridColumnGap: theme.spacings.lg,
      gridRowGap: theme.spacings.md,
      display: `grid`,
      borderRadius: 4,
      background: '#FFFADD',
      padding: theme.spacings.md,
      margin: `${theme.spacings.lg} 0`,
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: `1fr 1fr`,
        padding: theme.spacings.md,
        marginTop: theme.spacings.md,
      },
    },
    orderDetailLabel: {
      textTransform: 'none',
      ...theme.typography.h5,
      color: theme.palette.common.black,
    },
    orderNumberLabel: {
      display: 'grid',
      gridTemplateColumns: `2fr 1fr`,
    },
  }),
  { name: 'OrderSuccess' },
)

function ShippingPage() {
  const { data, error } = useCartQuery(CartPageDocument, { returnPartialData: true })
  // const router = useRouter()
  // const cartId = router.query.cartId as string
  const classes = useStyles()
  console.log(data, 'DATA')

  return (
    <Container maxWidth='md'>
      <PageMeta title='Checkout summary' metaDescription='Ordered items' metaRobots={['noindex']} />

      <Typography variant='h6' component='h1' align='center'>
        Checkout
      </Typography>

      <Stepper steps={3} currentStep={3} key='checkout-stepper' />

      <IconHeader src={iconHeart} title='Thank you for your order' alt='celebrate' size='large' />

      <div className={classes.orderDetailContainer}>
        <div>
          <SectionHeader
            classes={{ labelLeft: classes.orderDetailLabel }}
            labelLeft={<Typography variant='h5'>Your order number</Typography>}
          />
          <span className={classes.orderNumberLabel}>
            <Typography variant='body1'>12525052020</Typography>
            <OrderStateLabelInline
              items={data?.cart?.items}
              renderer={{
                Ordered: () => <span>processed</span>,
                Invoiced: () => <span>invoiced</span>,
                Shipped: () => <span>shipped</span>,
                Refunded: () => <span>refunded</span>,
                Canceled: () => <span>canceled</span>,
                Returned: () => <span>returned</span>,
                Partial: () => <span>partially processed</span>,
              }}
            />
          </span>
        </div>
        <div>
          <SectionHeader
            classes={{ labelLeft: classes.orderDetailLabel }}
            labelLeft={<Typography variant='h5'>We sent the confirmation email to</Typography>}
          />
          <Typography variant='body1'>sophie@reachdigital.nl</Typography>
        </div>
        <div>
          <SectionHeader
            classes={{ labelLeft: classes.orderDetailLabel }}
            labelLeft={<Typography variant='h5'>Your delivery address</Typography>}
          />
          <AddressMultiLine
            street={['Hoefbladstraat 26A']}
            postcode='2153 EX'
            city='Nieuw Vennep'
          />
        </div>
        <div>
          <SectionHeader
            classes={{ labelLeft: classes.orderDetailLabel }}
            labelLeft={<Typography variant='h5'>Any questions about your order?</Typography>}
          />
          <Typography variant='body1'>For more information go to the</Typography>
          <PageLink key='Customer service page' href='/service' passHref>
            <Link color='secondary' underline='none'>
              Customer service page
            </Link>
          </PageLink>
        </div>
      </div>

      <OrderSummary {...data?.cart} />
    </Container>
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

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
