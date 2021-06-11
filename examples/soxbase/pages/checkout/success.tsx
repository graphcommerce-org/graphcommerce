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
import { AddressMultiLine } from '@reachdigital/magento-customer'
<<<<<<< HEAD
import InlineAccount from '@reachdigital/magento-customer/InlineAccount'
import { ConfigurableCartItem } from '@reachdigital/magento-product-configurable'
=======
>>>>>>> f0a18b4c (style: signup and newsletter styling)
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import Row from '@reachdigital/next-ui/Row'
import SectionHeader from '@reachdigital/next-ui/SectionHeader'
import Stepper from '@reachdigital/next-ui/Stepper/Stepper'
import SvgImage from '@reachdigital/next-ui/SvgImage'
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
    orderReceived: {
      color: theme.palette.common.white,
      background: theme.palette.secondary.main,
      padding: 2,
    },
    buttonRow: {
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      marginTop: theme.spacings.lg,
    },
    newsletter: {
      background: theme.palette.background.highlight,
      padding: theme.spacings.sm,
      borderRadius: 4,
      marginBottom: theme.spacings.xs,
      marginTop: theme.spacings.lg,
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.up('md')]: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      },
    },
    newsletterAction: {
      display: 'flex',
      alignItems: 'center',
    },
    signup: {
      padding: theme.spacings.sm,
      border: `2px ${theme.palette.background.highlight} solid`,
      borderRadius: 4,
      gridColumnGap: theme.spacings.sm,
      display: 'grid',
      marginBottom: theme.spacings.sm,
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
  // const router = useRouter()
  // const cartId = router.query.cartId as string
  const classes = useStyles()

  return (
    <Container maxWidth='md'>
      <PageMeta title='Checkout summary' metaDescription='Ordered items' metaRobots={['noindex']} />

      <Typography variant='h6' component='h1' align='center'>
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
          <span className={classes.orderNumberLabel}>
            <Typography variant='body1'>12525052020</Typography>
            <span className={classes.orderReceived}>Order received</span>
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

      <div className={classes.newsletter}>
        <Typography className={classes.newsletterTitle} variant='h5'>
          Sign up for our newsletter and stay updated
        </Typography>
        <div className={classes.newsletterAction}>
          <Switch color='primary' />
          <Typography variant='body1'>info@someemail.co.uk</Typography>
        </div>
      </div>

      <div className={classes.signup}>
        <Typography variant='h5' className={classes.signupTitle}>
          No account yet?
        </Typography>
        <Typography variant='caption' className={classes.signupDescription}>
          You can track your order status and much more!
        </Typography>
        <Button
          url='/signup'
          title='Create an account'
          variant='pill'
          size='medium'
          color='secondary'
          text='bold'
        />
      </div>

      <Row maxWidth='lg' classes={{ root: classes.buttonRow }}>
        <Button
          url='/'
          title='Continue shopping'
          variant='pill'
          size='large'
          color='secondary'
          text='bold'
        />
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
