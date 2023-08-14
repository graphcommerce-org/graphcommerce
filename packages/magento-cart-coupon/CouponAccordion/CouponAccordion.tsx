import { useCartQuery } from '@graphcommerce/magento-cart'
import {
  iconChevronDown,
  IconSvg,
  extendableComponent,
  breakpointVal,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { SxProps, Theme, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { useState } from 'react'
import { ApplyCouponForm } from '../ApplyCouponForm/ApplyCouponForm'
import { RemoveCouponForm } from '../RemoveCouponForm/RemoveCouponForm'
import { GetCouponDocument } from './GetCoupon.gql'

export type CouponAccordionProps = { sx?: SxProps<Theme> }

type OwnerState = { open: boolean; disabled: boolean }
const name = 'CouponAccordion' as const
const parts = ['accordion', 'button', 'couponFormWrap'] as const
const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

export function CouponAccordion(props: CouponAccordionProps) {
  const { sx = [] } = props
  const { data } = useCartQuery(GetCouponDocument)
  const [open, setOpen] = useState<boolean>(false)

  if (!data?.cart?.id) return null

  const coupon = data?.cart?.applied_coupons?.[0]?.code

  const classes = withState({
    open: Boolean(!coupon && open),
    disabled: Boolean(coupon),
  })
  const handleChange = () => setOpen(!coupon && !open)

  return (
    <Accordion
      className={classes.accordion}
      onChange={handleChange}
      expanded={!coupon && open}
      variant='outlined'
      sx={[
        (theme) => ({
          ...breakpointVal(
            'borderRadius',
            theme.shape.borderRadius * 2,
            theme.shape.borderRadius * 3,
            theme.breakpoints.values,
          ),
          '::before': { display: 'none' },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <AccordionSummary
        onClick={(e) => e.preventDefault()}
        expandIcon={!coupon && <IconSvg src={iconChevronDown} />}
        sx={[
          (theme) => ({
            px: theme.spacings.xs,
            '& .MuiAccordionSummary-content': {
              alignItems: 'center',
              columnGap: 2,
              justifyContent: 'space-between',
            },
          }),
          Boolean(coupon) && {
            '&:hover:not(.Mui-disabled)': {
              cursor: 'default',
            },
          },
        ]}
      >
        <Trans id='Discount code' />
        <RemoveCouponForm {...data.cart} />
      </AccordionSummary>
      <AccordionDetails sx={(theme) => ({ px: theme.spacings.xs })}>
        <ApplyCouponForm />
      </AccordionDetails>
    </Accordion>
  )
}
