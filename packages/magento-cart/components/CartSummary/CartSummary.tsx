import { useHistoryLink } from '@graphcommerce/framer-next-pages'
import { SectionContainer, extendableComponent, breakpointVal } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, Link, SxProps, Theme, Typography, lighten } from '@mui/material'
import React from 'react'
import { useCartQuery } from '../../hooks'
import { CartAddressMultiLine } from '../CartAddressMultiLine/CartAddressMultiLine'
import { GetCartSummaryDocument } from './GetCartSummary.gql'

export type CartSummaryProps = {
  children?: React.ReactNode
  sx?: SxProps<Theme>
} & OwnerState

type OwnerState = { editable?: boolean }

const compName = 'CartSummary' as const
const parts = ['root', 'detailsContainer', 'sectionHeaderWrapper'] as const
const { classes } = extendableComponent<OwnerState, typeof compName, typeof parts>(compName, parts)

export function CartSummary(props: CartSummaryProps) {
  const { children, editable, sx = [] } = props

  const { data } = useCartQuery(GetCartSummaryDocument)
  const { href: historyHref, onClick: historyOnClick } = useHistoryLink({
    href: '/checkout',
  })

  if (!data?.cart) return null

  const { email, shipping_addresses, billing_address, is_virtual } = data.cart

  return (
    <Box
      className={classes.root}
      sx={[
        (theme) => ({
          margin: `${theme.spacings.sm} 0`,
          '& > div:last-of-type': {
            borderRadius: '0',
            ...breakpointVal(
              'borderBottomLeftRadius',
              theme.shape.borderRadius * 2,
              theme.shape.borderRadius * 3,
              theme.breakpoints.values,
            ),
            ...breakpointVal(
              'borderBottomRightRadius',
              theme.shape.borderRadius * 2,
              theme.shape.borderRadius * 3,
              theme.breakpoints.values,
            ),
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        className={classes.detailsContainer}
        sx={(theme) => ({
          ...breakpointVal(
            'borderTopLeftRadius',
            theme.shape.borderRadius * 2,
            theme.shape.borderRadius * 3,
            theme.breakpoints.values,
          ),
          ...breakpointVal(
            'borderTopRightRadius',
            theme.shape.borderRadius * 2,
            theme.shape.borderRadius * 3,
            theme.breakpoints.values,
          ),
          background: theme.palette.background.default,
          ...theme.applyStyles('dark', {
            background: lighten(theme.palette.background.default, 0.15),
          }),

          padding: theme.spacings.sm,
          gridColumnGap: theme.spacings.xxl,
          gridRowGap: theme.spacings.sm,
          display: `grid`,
          [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: `1fr 1fr`,
            marginTop: theme.spacings.xxs,
          },
        })}
      >
        <Box>
          <SectionContainer
            variantLeft='h5'
            labelLeft={<Trans id='Confirmation + Track & trace' />}
            sx={{ '& .SectionHeader-root': { marginTop: 0, paddingBottom: '8px' } }}
          />
          <Typography variant='body1'>{email || ''}</Typography>
        </Box>
        {!is_virtual && (
          <Box>
            <SectionContainer
              variantLeft='h5'
              labelLeft={<Trans id='Shipping method' />}
              sx={{ '& .SectionHeader-root': { marginTop: 0, paddingBottom: '8px' } }}
            />
            <Typography variant='body1'>
              {shipping_addresses?.[0]?.selected_shipping_method?.carrier_title}
              {shipping_addresses?.[0]?.selected_shipping_method?.method_title}
            </Typography>
          </Box>
        )}
        {!is_virtual && shipping_addresses && (
          <Box>
            <SectionContainer
              variantLeft='h5'
              labelLeft={<Trans id='Shipping address' />}
              sx={{ '& .SectionHeader-root': { marginTop: 0, paddingBottom: '8px' } }}
              labelRight={
                editable ? (
                  <Link
                    href={historyHref}
                    color='secondary'
                    variant='body2'
                    onClick={historyOnClick}
                    underline='hover'
                  >
                    <Trans id='Edit' />
                  </Link>
                ) : undefined
              }
            />
            <CartAddressMultiLine {...shipping_addresses[0]} />
          </Box>
        )}
        <Box>
          <SectionContainer
            variantLeft='h5'
            labelLeft={<Trans id='Billing address' />}
            sx={{ '& .SectionHeader-root': { marginTop: 0, paddingBottom: '8px' } }}
            labelRight={
              editable ? (
                <Link
                  href='/checkout/edit/billing-address'
                  color='secondary'
                  variant='body2'
                  underline='hover'
                >
                  <Trans id='Edit' />
                </Link>
              ) : undefined
            }
          >
            <CartAddressMultiLine {...billing_address} />
          </SectionContainer>
        </Box>
      </Box>
      {children}
    </Box>
  )
}
