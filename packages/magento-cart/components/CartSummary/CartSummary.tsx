import { useHistoryLink } from '@graphcommerce/framer-next-pages'
import { SectionContainer, extendableComponent } from '@graphcommerce/next-ui'
import { t, Trans } from '@graphcommerce/lingui-next'
import { Box, Link, SxProps, Theme, Typography } from '@mui/material'
import PageLink from 'next/link'
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
  const { children, editable } = props

  const { data } = useCartQuery(GetCartSummaryDocument, { allowUrl: true })
  const { href: historyHref, onClick: historyOnClick } = useHistoryLink({
    href: '/checkout',
  })

  if (!data?.cart) return null

  const { email, shipping_addresses, billing_address } = data.cart

  return (
    <Box
      className={classes.root}
      sx={(theme) => ({
        margin: `${theme.spacings.sm} 0`,
        '& div:last-of-type': {
          borderRadius: '0 0 4px 4px',
        },
      })}
    >
      <Box
        className={classes.detailsContainer}
        sx={(theme) => ({
          borderRadius: '4px 4px 0 0',
          background: theme.palette.mode === 'light' ? '#FFE10820' : theme.palette.background.paper,
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
            labelLeft={t`Confirmation + Track & trace`}
            sx={{ '& .SectionHeader': { marginTop: 0, paddingBottom: '8px' } }}
          />
          <Typography variant='body1'>{email || ''}</Typography>
        </Box>
        <Box>
          <SectionContainer
            variantLeft='h5'
            labelLeft={t`Shipping method`}
            sx={{ '& .SectionHeader': { marginTop: 0, paddingBottom: '8px' } }}
          />
          <Typography variant='body1'>
            {shipping_addresses?.[0]?.selected_shipping_method?.carrier_title}
            {shipping_addresses?.[0]?.selected_shipping_method?.method_title}
          </Typography>
        </Box>
        {shipping_addresses && (
          <>
            <Box>
              <SectionContainer
                variantLeft='h5'
                labelLeft={t`Shipping address`}
                sx={{ '& .SectionHeader': { marginTop: 0, paddingBottom: '8px' } }}
                labelRight={
                  editable ? (
                    <PageLink href={historyHref} passHref>
                      <Link
                        color='secondary'
                        variant='body2'
                        onClick={historyOnClick}
                        underline='hover'
                      >
                        <Trans>Edit</Trans>
                      </Link>
                    </PageLink>
                  ) : undefined
                }
              />
              <CartAddressMultiLine {...shipping_addresses[0]} />
            </Box>
            <Box>
              <SectionContainer
                variantLeft='h5'
                labelLeft={t`Billing address`}
                sx={{ '& .SectionHeader': { marginTop: 0, paddingBottom: '8px' } }}
                labelRight={
                  editable ? (
                    <PageLink href='/checkout/edit/billing-address' passHref>
                      <Link color='secondary' variant='body2' underline='hover'>
                        <Trans>Edit</Trans>
                      </Link>
                    </PageLink>
                  ) : undefined
                }
              >
                <CartAddressMultiLine {...billing_address} />
              </SectionContainer>
            </Box>
          </>
        )}
      </Box>
      {children}
    </Box>
  )
}
