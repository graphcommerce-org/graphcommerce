import { useQuery } from '@apollo/client'
import { Button, makeStyles, Theme, Typography } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { useCurrentCartId } from '@reachdigital/magento-cart/CurrentCartId/useCurrentCartId'
import AnimatedRow from '@reachdigital/next-ui/AnimatedRow'
import clsx from 'clsx'
import { m, AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import ApplyCouponForm from '../ApplyCouponForm/ApplyCouponForm'
import RemoveCouponForm from '../RemoveCouponForm/RemoveCouponForm'
import { CouponAccordionDocument } from './CouponAccordion.gql'

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
  const { data } = useQuery(CouponAccordionDocument, { variables: { cartId: useCurrentCartId() } })
  const [open, setOpen] = useState<boolean>(false)

  if (!data?.cart?.id) return null

  const coupon = data?.cart?.applied_coupons?.[0]?.code

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
            {coupon && <RemoveCouponForm {...data.cart} />}
          </Button>
        </m.div>

        <AnimatePresence>
          {open && (
            <AnimatedRow key='discount-codes-form-wrap'>
              <m.div layout='position' className={classes.couponFormWrap}>
                {!coupon && <ApplyCouponForm {...data.cart} />}
                {coupon && <i>Only one active coupon allowed</i>}
              </m.div>
            </AnimatedRow>
          )}
        </AnimatePresence>
      </m.div>
    </AnimatedRow>
  )
}
