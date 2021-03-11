import { useQuery } from '@apollo/client'
import { Button, makeStyles, Theme, Typography } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import AnimatedRow from '@reachdigital/next-ui/AnimatedRow'
import clsx from 'clsx'
import { m } from 'framer-motion'
import React, { useState } from 'react'
import { ClientCartDocument } from '../ClientCart.gql'
import ApplyCouponCode from './ApplyCouponCode'
import CartCoupon from './CartCoupon'

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
      justifyContent: 'flex-start',
      '& span:last-child': {
        marginLeft: 'auto',
      },
    },
    '& > span': {
      display: 'inline',
      '& > h6': {
        textAlign: 'left',
        marginRight: theme.spacings.sm,
      },
    },
  },
  couponFormWrap: {
    background: 'rgba(0,0,0,0.04)',
    padding: theme.spacings.xs,
  },
  buttonOpen: {
    '&.MuiButton-root': {
      background: 'rgba(0,0,0,0.04)',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
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
            className={clsx(classes.button, { [classes.buttonOpen]: open })}
            endIcon={open ? <ExpandLess /> : <ExpandMore />}
          >
            <Typography variant='h6'>Discount code</Typography>

            {coupon && <CartCoupon {...cartQuery?.cart} />}
          </Button>
        </m.div>

        {open && (
          <AnimatedRow key='discount-codes-form-wrap'>
            <m.div layout='position' className={classes.couponFormWrap}>
              {!coupon && <ApplyCouponCode />}
              {coupon && <i>Only one active coupon allowed</i>}
            </m.div>
          </AnimatedRow>
        )}
      </m.div>
    </AnimatedRow>
  )
}
