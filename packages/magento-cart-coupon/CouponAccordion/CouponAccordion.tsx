import { Button, makeStyles, Theme, Typography } from '@material-ui/core'
import { useCartQuery } from '@reachdigital/magento-cart'
import {
  AnimatedRow,
  UseStyles,
  SvgImage,
  iconChevronDown,
  iconChevronUp,
} from '@reachdigital/next-ui'
import clsx from 'clsx'
import { m, AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import ApplyCouponForm from '../ApplyCouponForm/ApplyCouponForm'
import RemoveCouponForm from '../RemoveCouponForm/RemoveCouponForm'
import { GetCouponDocument } from './GetCoupon.gql'

const useStyles = makeStyles((theme: Theme) => ({
  accordion: {
    '&:before': {
      background: 'none',
    },
    boxShadow: 'none',
    border: '1px solid #ededed',
    borderRadius: 8,
  },
  accordionInner: {
    padding: theme.spacings.xs,
    position: 'relative',
    display: 'flex',
  },
  accordionLabel: {
    marginRight: theme.spacings.xxs,
  },
  accordionOpen: {
    background: 'rgba(0,0,0,0.04)',
  },
  button: {
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
    marginLeft: 'auto',
    '& .MuiButton-label': {
      width: 'auto',
      display: 'flex',
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

export type CouponAccordionProps = UseStyles<typeof useStyles>

export default function CouponAccordion(props: CouponAccordionProps) {
  const classes = useStyles(props)
  const { data } = useCartQuery(GetCouponDocument)
  const [open, setOpen] = useState<boolean>(false)

  if (!data?.cart?.id) return null

  const coupon = data?.cart?.applied_coupons?.[0]?.code

  return (
    <AnimatedRow key='discount-codes'>
      <m.div layout className={classes.accordion}>
        <m.div className={clsx(classes.accordionInner, { [classes.accordionOpen]: open })}>
          <Typography className={classes.accordionLabel} variant='h6'>
            Coupon code
          </Typography>
          {coupon && <RemoveCouponForm {...data.cart} />}

          {!coupon && (
            <Button
              onClick={() => setOpen(!open)}
              className={clsx(classes.button, { [classes.buttonOpen]: open })}
              endIcon={
                open ? (
                  <SvgImage src={iconChevronUp} alt='expand more' loading='eager' />
                ) : (
                  <SvgImage src={iconChevronDown} alt='expand less' loading='eager' />
                )
              }
            />
          )}
        </m.div>
        {!coupon && (
          <AnimatePresence>
            {open && (
              <AnimatedRow key='discount-codes-form-wrap'>
                <m.div layout='position' className={classes.couponFormWrap}>
                  {!coupon && <ApplyCouponForm />}
                </m.div>
              </AnimatedRow>
            )}
          </AnimatePresence>
        )}
      </m.div>
    </AnimatedRow>
  )
}
