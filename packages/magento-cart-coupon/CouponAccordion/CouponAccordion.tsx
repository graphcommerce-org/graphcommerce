import { useCartQuery } from '@graphcommerce/magento-cart'
import {
  AnimatedRow,
  iconChevronDown,
  iconChevronUp,
  responsiveVal,
  SvgImageSimple,
  UseStyles,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Button, Theme, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import clsx from 'clsx'
import { AnimatePresence, m } from 'framer-motion'
import React, { useState } from 'react'
import ApplyCouponForm from '../ApplyCouponForm/ApplyCouponForm'
import RemoveCouponForm from '../RemoveCouponForm/RemoveCouponForm'
import { GetCouponDocument } from './GetCoupon.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    accordion: {
      '&:before': {
        background: 'none',
      },
      boxShadow: 'none',
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: responsiveVal(theme.shape.borderRadius * 3, theme.shape.borderRadius * 4),
      overflow: 'hidden',
    },
    button: {
      padding: `${theme.spacings.xs} ${theme.spacings.sm}`,
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
      padding: `0 ${theme.spacings.sm} ${theme.spacings.xs}`,
    },
    buttonOpen: {
      background: 'rgba(0,0,0,0.04)',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    disabled: {
      cursor: 'default',
      '&:hover': {
        background: 'transparent',
      },
    },
  }),
  { name: 'CouponAccordion' },
)

export type CouponAccordionProps = UseStyles<typeof useStyles>

export default function CouponAccordion(props: CouponAccordionProps) {
  const classes = useStyles(props)
  const { data } = useCartQuery(GetCouponDocument)
  const [open, setOpen] = useState<boolean>(false)

  if (!data?.cart?.id) return null

  const coupon = data?.cart?.applied_coupons?.[0]?.code

  return (
    <AnimatedRow key='discount-codes'>
      <m.div className={classes.accordion}>
        <Button
          component={coupon ? 'div' : 'button'}
          onClick={() => setOpen(!open)}
          disableRipple={!!coupon}
          className={clsx(classes.button, {
            [classes.buttonOpen]: !coupon && open,
            [classes.disabled]: coupon,
          })}
          endIcon={
            <>
              {!coupon && open && <SvgImageSimple src={iconChevronUp} />}
              {!coupon && !open && <SvgImageSimple src={iconChevronDown} />}
            </>
          }
        >
          <Typography variant='subtitle1'>
            <Trans>Discount code</Trans>
          </Typography>
          <AnimatePresence>
            {coupon && (
              <m.div
                key='remove'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <RemoveCouponForm {...data.cart} />
              </m.div>
            )}
          </AnimatePresence>
        </Button>

        <AnimatePresence>
          {open && !coupon && (
            <AnimatedRow key='discount-codes-form-wrap'>
              <div className={classes.couponFormWrap}>
                <ApplyCouponForm />
              </div>
            </AnimatedRow>
          )}
        </AnimatePresence>
      </m.div>
    </AnimatedRow>
  )
}
