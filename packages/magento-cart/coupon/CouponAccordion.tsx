import { useQuery } from '@apollo/client'
import { Button, makeStyles, Theme, Typography } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import AnimatedRow from '@reachdigital/next-ui/AnimatedRow'
import { m } from 'framer-motion'
import React, { useState } from 'react'
import { ClientCartDocument } from '../ClientCart.gql'
import ApplyCouponCode from './ApplyCouponCode'
import RemoveCoupon from './RemoveCoupon'

const useStyles = makeStyles((theme: Theme) => ({
  accordion: {
    '&:before': {
      background: 'none',
    },
    boxShadow: 'none',
    border: '1px solid #ededed',
    borderRadius: 8,
  },
  button: {
    padding: theme.spacings.xs,
    width: '100%',
    '& .MuiButton-label': {
      display: 'flex',
      justifyContent: 'space-between',
    },
    '& > span': {
      display: 'inline',
      '& > h6': {
        textAlign: 'left',
      },
    },
  },
  couponFormWrap: {
    padding: theme.spacings.xs,
  },
}))

export default function CouponAccordion() {
  const classes = useStyles()
  const { data: cartQuery } = useQuery(ClientCartDocument)
  const coupon = cartQuery?.cart?.applied_coupons?.[0]?.code
  const [open, setOpen] = useState<boolean>(false)

  return (
    <AnimatedRow key='discount-codes'>
      <m.div layout className={classes.accordion}>
        <m.div layout>
          <Button
            onClick={() => setOpen(!open)}
            className={classes.button}
            endIcon={open ? <ExpandLess /> : <ExpandMore />}
          >
            <Typography variant='h6'>Discount code</Typography>
          </Button>
        </m.div>

        {open && (
          <AnimatedRow key='discount-codes-form-wrap'>
            <m.div layout className={classes.couponFormWrap}>
              {!coupon && <ApplyCouponCode />}
              {coupon && <RemoveCoupon coupon={coupon} />}
            </m.div>
          </AnimatedRow>
        )}
      </m.div>
    </AnimatedRow>
  )
}
