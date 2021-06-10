import { Box, Container, NoSsr, Typography, Theme, makeStyles, Switch } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { useCartQuery } from '@reachdigital/magento-cart'
import { CartPageDocument, OrderSummary } from '@reachdigital/magento-cart-checkout'
import { CartItem, CartItems } from '@reachdigital/magento-cart-items'
import { AddressMultiLine } from '@reachdigital/magento-customer'
import InlineAccount from '@reachdigital/magento-customer/InlineAccount'
import { ConfigurableCartItem } from '@reachdigital/magento-product-configurable'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import Button from '@reachdigital/next-ui/Button'
import Form from '@reachdigital/next-ui/Form'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import Row from '@reachdigital/next-ui/Row'
import SectionHeader from '@reachdigital/next-ui/SectionHeader'
import Stepper from '@reachdigital/next-ui/Stepper/Stepper'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconHeart } from '@reachdigital/next-ui/icons'
import { useRouter } from 'next/router'
import React from 'react'
import { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import MinimalPageShell, { MinimalPageShellProps } from '../../components/AppShell/MinimalPageShell'
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
    buttonRow: {
      alignItems: 'center',
      display: 'flex',
    },
    newsletter: {
      background: theme.palette.background.highlight,
      padding: theme.spacings.sm,
      alignItems: 'center',
      gridColumnGap: theme.spacings.sm,
      borderRadius: 4,
      marginBottom: theme.spacings.sm,
      display: 'grid',
      gridTemplateAreas: `
      "title"
      "action"
    `,
      [theme.breakpoints.up('md')]: {
        gridTemplateAreas: `
      "title action"
    `,
      },
    },
    newsletterTitle: {
      gridArea: 'title',
    },
    newsletterAction: {
      gridArea: 'acton',
    },
    signup: {
      padding: theme.spacings.sm,
      border: `2px ${theme.palette.background.highlight} solid`,
      borderRadius: 4,
      gridColumnGap: theme.spacings.sm,
      display: 'grid',
      marginBottom: theme.spacings.md,
      gridTemplateAreas: `
      "title"
      "description"
      "button"
    `,
      [theme.breakpoints.up('md')]: {
        gridTemplateAreas: `
        "title title"
        "description button"
      `,
      },
    },
    signupTitle: {
      gridArea: 'title',
    },
    signupDescription: {
      gridArea: 'description',
      display: 'flex',
      alignItems: 'center',
    },
    signupButton: {
      gridArea: 'button',
      justifySelf: 'start',
      margintTop: '-3px',
      [theme.breakpoints.up('md')]: {
        justifySelf: 'end',
      },
    },
  }),
  { name: 'OrderSuccess' },
)

function ShippingPage() {
  const { data, error } = useCartQuery(CartPageDocument, { returnPartialData: true })
  const router = useRouter()
  const cartId = router.query.cartId as string
  const classes = useStyles()

  return (
    <Container maxWidth='md'>
      <PageMeta title='Checkout summary' metaDescription='Ordered items' metaRobots={['noindex']} />
      {cartId && <InlineAccount accountHref='/account' />}
      <Typography variant='h5' component='h1' align='center'>
        Checkout
      </Typography>

      <Stepper steps={3} currentStep={3} key='checkout-stepper' />

      <Box textAlign='center'>
        <SvgImage src={iconHeart} loading='eager' alt='party' />

        <Typography variant='h4' component='h1' align='center'>
          Thank you for your order!
        </Typography>
      </Box>

      <div className={classes.orderDetailContainer}>
        <div>
          <SectionHeader
            classes={{ labelLeft: classes.orderDetailLabel }}
            labelLeft={<Typography variant='h5'>Your order number</Typography>}
          />
          <Typography variant='body1'>12525052020</Typography>
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
          <Typography variant='body1'>
            Go for more information to the Customer service page
          </Typography>
        </div>
      </div>

      <OrderSummary {...data?.cart} />

      <Form>
        <div className={classes.newsletter}>
          <Typography className={classes.newsletterTitle} variant='h5'>
            Sign up for our newsletter and stay updated
          </Typography>
          <div className={classes.newsletterAction}>
            <Switch color='primary' />
            <Typography variant='body1'>info@someemail.co.uk</Typography>
          </div>
        </div>
      </Form>

      <Form>
        <div className={classes.signup}>
          <Typography variant='h5' className={classes.signupTitle}>
            No account yet?
          </Typography>
          <Typography variant='body1' className={classes.signupDescription}>
            You can track your order status and much more!
          </Typography>
          <Button
            className={classes.signupButton}
            type='submit'
            color='secondary'
            variant='pill'
            text='bold'
          >
            Create an account
          </Button>
        </div>
      </Form>

      <Row maxWidth='lg' classes={{ root: classes.buttonRow }}>
        <Button type='submit' color='secondary' variant='pill' size='large' text='bold'>
          Continue shopping
        </Button>
      </Row>
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
