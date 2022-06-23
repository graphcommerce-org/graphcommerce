import { useCartQuery } from '@graphcommerce/magento-cart'
import {
  AnimatedRow,
  iconChevronDown,
  iconChevronUp,
  responsiveVal,
  IconSvg,
  extendableComponent,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import {
  Box,
  Button,
  styled,
  SxProps,
  Theme,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import { AnimatePresence, m } from 'framer-motion'
import { useState } from 'react'
import { ApplyCouponForm } from '../ApplyCouponForm/ApplyCouponForm'
import { RemoveCouponForm } from '../RemoveCouponForm/RemoveCouponForm'
import { GetCouponDocument } from './GetCoupon.gql'

export type CouponAccordionProps = { sx?: SxProps<Theme> }

type OwnerState = { open: boolean; disabled: boolean }
const name = 'CouponAccordion' as const
const parts = ['accordion', 'button', 'couponFormWrap'] as const
const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

const MotionDiv = styled(m.div)({})

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
      onChange={handleChange}
      expanded={!coupon && open}
      variant='outlined'
      sx={[
        {
          borderRadius: 1,
          '::before': { display: 'none' },
        },

        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <AccordionSummary
        onClick={(e) => e.preventDefault()}
        expandIcon={!coupon && <IconSvg src={iconChevronDown} />}
        sx={[
          (theme) => ({
            px: theme.spacings.sm,
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
      <AccordionDetails sx={(theme) => ({ px: theme.spacings.sm })}>
        <ApplyCouponForm />
      </AccordionDetails>
    </Accordion>
  )

  return (
    <AnimatedRow key='discount-codes'>
      <MotionDiv
        className={classes.accordion}
        sx={[
          (theme) => ({
            '&:before': {
              background: 'none',
            },
            boxShadow: 'none',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: responsiveVal(theme.shape.borderRadius * 3, theme.shape.borderRadius * 4),
            overflow: 'hidden',
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Button
          component={coupon ? 'div' : 'button'}
          onClick={() => setOpen(!open)}
          disableRipple={!!coupon}
          className={classes.button}
          sx={(theme) => ({
            justifyContent: 'space-between',
            gap: theme.spacings.sm,
            padding: `${theme.spacings.xs} ${theme.spacings.sm}`,
            width: '100%',
            borderRadius: responsiveVal(theme.shape.borderRadius * 3, theme.shape.borderRadius * 4),

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

            '&.open': {
              background: 'rgba(0,0,0,0.04)',
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            },
            '&.disabled': {
              cursor: 'default',
              justifyContent: 'flex-start',
              '&:hover': {
                background: 'transparent',
              },
            },
          })}
          endIcon={
            <>
              {!coupon && open && (
                <IconSvg src={iconChevronUp} size='large' sx={{ display: 'inherit' }} />
              )}
              {!coupon && !open && (
                <IconSvg src={iconChevronDown} size='large' sx={{ display: 'inherit' }} />
              )}
            </>
          }
        >
          <Typography variant='subtitle1'>
            <Trans id='Discount code' />
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
              <Box
                className={classes.couponFormWrap}
                sx={(theme) => ({
                  background: 'rgba(0,0,0,0.04)',
                  padding: `0 ${theme.spacings.sm} ${theme.spacings.xs}`,
                })}
              >
                <ApplyCouponForm />
              </Box>
            </AnimatedRow>
          )}
        </AnimatePresence>
      </MotionDiv>
    </AnimatedRow>
  )
}
