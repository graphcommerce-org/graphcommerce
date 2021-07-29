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
    display: 'flex',
  },
  accordionLabel: {
    padding: `${theme.spacings.xs} ${theme.spacings.sm}`,
    display: 'flex',
    alignItems: 'center',
    '& h6': {
      marginRight: theme.spacings.xs,
    },
  },
  accordionOpen: {
    background: 'rgba(0,0,0,0.04)',
  },
  button: {
    marginLeft: 'auto',
    padding: `0 ${theme.spacings.sm}`,
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
    padding: `${theme.spacings.xs} ${theme.spacings.sm}`,
    paddingTop: 0,
    '& > *': {
      padding: 0,
    },
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
        <m.div layout className={clsx(classes.accordionInner, { [classes.accordionOpen]: open })}>
          <div className={classes.accordionLabel}>
            <Typography variant='h6'>Discount code</Typography>
            {coupon && <RemoveCouponForm {...data.cart} />}
          </div>
          {!coupon && (
            <Button
              onClick={() => setOpen(!open)}
              className={classes.button}
              endIcon={
                open ? (
                  <SvgImage src={iconChevronUp} alt='expand more' loading='eager' size='small' />
                ) : (
                  <SvgImage src={iconChevronDown} alt='expand less' loading='eager' size='small' />
                )
              }
            />
          )}
        </m.div>
        {!coupon && open && (
          <AnimatePresence>
            <AnimatedRow key='discount-codes-form-wrap'>
              <m.div layout='position' className={classes.couponFormWrap}>
                <ApplyCouponForm />
              </m.div>
            </AnimatedRow>
          </AnimatePresence>
        )}
      </m.div>
    </AnimatedRow>
  )
}
