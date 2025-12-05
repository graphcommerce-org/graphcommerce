import { useCartQuery } from '@graphcommerce/magento-cart'
import {
  breakpointVal,
  extendableComponent,
  iconChevronDown,
  IconSvg,
  sxx,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import type { AccordionProps, SxProps, Theme } from '@mui/material'
import { Accordion, AccordionDetails, AccordionSummary, Box } from '@mui/material'
import { useState } from 'react'
import { ApplyCouponForm } from '../ApplyCouponForm/ApplyCouponForm'
import { RemoveCouponForm } from '../RemoveCouponForm/RemoveCouponForm'
import { GetCouponDocument } from './GetCoupon.gql'

export type CouponAccordionProps = Omit<AccordionProps, 'expanded' | 'onChange' | 'children'>

type OwnerState = { open: boolean; disabled: boolean }
const name = 'CouponAccordion'
const parts = ['accordion', 'button', 'couponFormWrap'] as const
const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

export function CouponAccordion(props: CouponAccordionProps) {
  const { sx = [], ...rest } = props
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
      sx={sxx(
        (theme) => ({
          ...breakpointVal(
            'borderRadius',
            theme.shape.borderRadius * 2,
            theme.shape.borderRadius * 3,
            theme.breakpoints.values,
          ),
          '::before': { display: 'none' },
        }),
        sx,
      )}
      {...rest}
    >
      <AccordionSummary
        onClick={(e) => e.preventDefault()}
        expandIcon={<IconSvg src={iconChevronDown} style={{ opacity: coupon ? 0 : 1 }} />}
        sx={sxx(
          (theme) => ({
            typography: 'body1',
            px: theme.spacings.xs,
            '& .MuiAccordionSummary-content': {
              alignItems: 'center',
              columnGap: theme.spacings.xxs,
              pr: theme.spacings.xxs,
              justifyContent: 'space-between',
            },
          }),
          coupon && { '&:hover:not(.Mui-disabled)': { cursor: 'default' } },
        )}
      >
        <Box sx={{ flex: 1 }}>
          <Trans>Discount code</Trans>
        </Box>
        <RemoveCouponForm {...data.cart} sx={{ flex: 0 }} />
      </AccordionSummary>
      <AccordionDetails sx={(theme) => ({ px: theme.spacings.xs, typography: 'body1' })}>
        <ApplyCouponForm />
      </AccordionDetails>
    </Accordion>
  )
}
