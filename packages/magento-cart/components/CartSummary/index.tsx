import { Link, makeStyles, Theme, Typography } from '@material-ui/core'
import { CartAddressMultiLine } from '@reachdigital/magento-cart-address'
import { SectionContainer, UseStyles } from '@reachdigital/next-ui'
import PageLink from 'next/link'
import React from 'react'
import { useCartQuery } from '../../hooks'
import { GetCartSummaryDocument } from './GetCartSummary.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      borderRadius: 4,
      background: '#FFFADD',
      margin: `${theme.spacings.sm} 0`,
    },
    detailsContainer: {
      padding: theme.spacings.sm,
      gridColumnGap: theme.spacings.lg,
      gridRowGap: theme.spacings.md,
      display: `grid`,

      [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: `1fr 1fr`,
        marginTop: theme.spacings.xxs,
      },
    },
    orderNumberLabel: {
      display: 'grid',
      gridTemplateColumns: `2fr 1fr`,
    },
  }),
  { name: 'OrderDetails' },
)

export type CartSummaryProps = {
  children?: React.ReactNode
  editable?: boolean
} & UseStyles<typeof useStyles>

export default function CartSummary(props: CartSummaryProps) {
  const classes = useStyles(props)
  const { children, editable } = props

  const { data } = useCartQuery(GetCartSummaryDocument, { allowUrl: true })

  if (!data?.cart) return null

  const { email, shipping_addresses, billing_address } = data.cart

  return (
    <div className={classes.root}>
      <div className={classes.detailsContainer}>
        <div>
          <SectionContainer
            variantLeft='h5'
            labelLeft='Confirmation + Track & trace'
            labelRight={
              editable ? (
                <PageLink href='/checkout/edit' passHref>
                  <Link color='secondary' variant='body2'>
                    Edit
                  </Link>
                </PageLink>
              ) : undefined
            }
          />
          <Typography variant='body1'>{email || ''}</Typography>
        </div>
        <div>
          <SectionContainer
            variantLeft='h5'
            labelLeft='Shipping method'
            labelRight={
              editable ? (
                <PageLink href='/checkout/edit/shipping' passHref>
                  <Link color='secondary' variant='body2'>
                    Edit
                  </Link>
                </PageLink>
              ) : undefined
            }
          />
          <Typography variant='body1'>
            {shipping_addresses?.[0]?.selected_shipping_method?.carrier_title}
            {shipping_addresses?.[0]?.selected_shipping_method?.method_title}
          </Typography>
        </div>
        {shipping_addresses && (
          <>
            <div>
              <SectionContainer
                variantLeft='h5'
                labelLeft='Shipping address'
                labelRight={
                  editable ? (
                    <PageLink href='/checkout/edit/shipping_address' passHref>
                      <Link color='secondary' variant='body2'>
                        Edit
                      </Link>
                    </PageLink>
                  ) : undefined
                }
              />
              <CartAddressMultiLine {...shipping_addresses[0]} />
            </div>
            <div>
              <SectionContainer
                variantLeft='h5'
                labelLeft='Billing Address'
                labelRight={
                  editable ? (
                    <PageLink href='/checkout/edit/billing_address' passHref>
                      <Link color='secondary' variant='body2'>
                        Edit
                      </Link>
                    </PageLink>
                  ) : undefined
                }
              >
                <CartAddressMultiLine {...billing_address} />
              </SectionContainer>
            </div>
          </>
        )}
      </div>
      {children}
    </div>
  )
}
