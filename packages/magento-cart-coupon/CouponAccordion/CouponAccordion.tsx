import { useCartQuery } from '@graphcommerce/magento-cart'
import {
  AnimatedRow,
  iconChevronDown,
  iconChevronUp,
  responsiveVal,
  SvgImageSimple,
  UseStyles,
  makeStyles,
  useMergedClasses,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Button, Typography } from '@mui/material'
import clsx from 'clsx'
import { AnimatePresence, m } from 'framer-motion'
import { useState } from 'react'
import ApplyCouponForm from '../ApplyCouponForm/ApplyCouponForm'
import RemoveCouponForm from '../RemoveCouponForm/RemoveCouponForm'
import { GetCouponDocument } from './GetCoupon.gql'

const useStyles = makeStyles({ name: 'CouponAccordion' })((theme) => ({
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
    justifyContent: 'space-between',
    padding: `${theme.spacings.xs} ${theme.spacings.sm}`,
    width: '100%',

    '& .MuiButton-label': {
      display: 'flex',
      justifyContent: 'flex-start',
      '& span:last-of-type': {
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
  endIcon: {
    display: 'inherit',
  },
}))

export type CouponAccordionProps = UseStyles<typeof useStyles>

export default function CouponAccordion(props: CouponAccordionProps) {
  const classes = useMergedClasses(useStyles().classes, props.classes)
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
          classes={{ endIcon: classes.endIcon }}
          endIcon={
            <>
              {!coupon && open && <SvgImageSimple src={iconChevronUp} size='large' />}
              {!coupon && !open && <SvgImageSimple src={iconChevronDown} size='large' />}
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
