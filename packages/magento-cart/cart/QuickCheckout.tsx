import { Theme, makeStyles } from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Money from '@reachdigital/magento-store/Money'
import { MoneyFragment } from '@reachdigital/magento-store/Money.gql'
import Button from '@reachdigital/next-ui/Button'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    quickCheckoutContainer: {
      textAlign: 'center',
    },
    img: {
      display: 'block',
      margin: '0 auto',
      width: responsiveVal(56, 72),
      height: responsiveVal(56, 72),
    },
    total: {
      fontWeight: 700,
      fontFamily: theme.typography.fontFamily,
      fontSize: responsiveVal(18, 25),
      display: 'block',
    },
    button: {
      marginTop: responsiveVal(20, 40),
      paddingTop: responsiveVal(10, 15),
      paddingBottom: responsiveVal(10, 15),
      paddingLeft: responsiveVal(25, 35),
      paddingRight: responsiveVal(25, 35),
      borderRadius: responsiveVal(40, 50),
      fontSize: 17,
      fontFamily: theme.typography.fontFamily,
      fontWeight: 500,
      marginBottom: theme.spacings.lg,
    },
    icon: {
      '& > svg': {
        fontSize: responsiveVal(24, 30),
        fontWeight: 100,
      },
    },
  }),
  { name: 'QuickCheckout' },
)

type QuickCheckoutProps = {
  total?: MoneyFragment | null
}

export default function QuickCheckout(props: QuickCheckoutProps) {
  const { total } = props
  const classes = useStyles()

  return (
    <div className={classes.quickCheckoutContainer}>
      <img
        src='/icons/shopping_bag.svg'
        alt='Shopping Bag'
        className={classes.img}
        width={72}
        height={72}
        loading='eager'
      />
      <span className={classes.total}>Cart Total: {total && <Money {...total} />}</span>
      <PageLink href='/checkout'>
        <Button
          variant='pill'
          color='secondary'
          className={classes.button}
          endIcon={<ChevronRightIcon className={classes.icon} />}
        >
          Start checkout
        </Button>
      </PageLink>
    </div>
  )
}
