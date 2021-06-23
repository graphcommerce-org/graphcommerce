import { makeStyles, Theme, Typography } from '@material-ui/core'
import { Cart } from '@reachdigital/graphql'
import { AddressMultiLine } from '@reachdigital/magento-customer'
import SectionHeader from '@reachdigital/next-ui/SectionHeader'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useCartQuery } from '../../hooks'
import { GetCartSummaryDocument } from './GetCartSummary.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      borderRadius: 4,
      background: '#FFFADD',
      margin: `${theme.spacings.lg} 0`,
    },
    detailsContainer: {
      padding: theme.spacings.sm,
      gridColumnGap: theme.spacings.lg,
      gridRowGap: theme.spacings.md,
      display: `grid`,

      [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: `1fr 1fr`,
        marginTop: theme.spacings.md,
      },
    },
    labelLeft: {
      textTransform: 'none',
      ...theme.typography.h6,
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.common.black,
    },
    labelInnerContainer: {
      paddingBottom: 5,
      marginBottom: 10,
      display: 'flex',
      alignItems: 'center',
    },
    labelRight: {
      fontSize: responsiveVal(12, 16),
      '& > a': {
        textDecoration: 'none',
        color: theme.palette.secondary.main,
      },
    },
    orderNumberLabel: {
      display: 'grid',
      gridTemplateColumns: `2fr 1fr`,
    },
    address: {
      fontWeight: theme.typography.fontWeightRegular,
      padding: 0,
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
          <SectionHeader
            classes={{
              labelLeft: classes.labelLeft,
              labelInnerContainer: classes.labelInnerContainer,
              labelRight: classes.labelRight,
            }}
            labelLeft={<Typography variant='h6'>Confirmation + Track & trace</Typography>}
            labelRight={
              editable ? (
                <PageLink key='Confirmation + track & trace' href='/checkout/edit'>
                  Edit
                </PageLink>
              ) : undefined
            }
          />
          <Typography variant='body1'>{email || ''}</Typography>
        </div>
        <div>
          <SectionHeader
            classes={{
              labelLeft: classes.labelLeft,
              labelInnerContainer: classes.labelInnerContainer,
              labelRight: classes.labelRight,
            }}
            labelLeft={<Typography variant='h6'>Shipping method</Typography>}
            labelRight={
              editable ? (
                <PageLink key='Shipping method' href='/checkout/edit/shipping'>
                  Edit
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
              <SectionHeader
                classes={{
                  labelLeft: classes.labelLeft,
                  labelInnerContainer: classes.labelInnerContainer,
                  labelRight: classes.labelRight,
                }}
                labelLeft={<Typography variant='h6'>Shipping address</Typography>}
                labelRight={
                  editable ? (
                    <PageLink key='Shipping address' href='/checkout/edit/shipping_address'>
                      Edit
                    </PageLink>
                  ) : undefined
                }
              />
              <AddressMultiLine classes={{ title: classes.address }} {...shipping_addresses[0]} />
            </div>
            <div>
              <SectionHeader
                classes={{
                  labelLeft: classes.labelLeft,
                  labelInnerContainer: classes.labelInnerContainer,
                  labelRight: classes.labelRight,
                }}
                labelLeft={<Typography variant='h6'>Billing address</Typography>}
                labelRight={
                  editable ? (
                    <PageLink key='Billing address' href='/checkout/edit/billing_address'>
                      Edit
                    </PageLink>
                  ) : undefined
                }
              />
              <AddressMultiLine classes={{ title: classes.address }} {...billing_address} />
            </div>
          </>
        )}
      </div>
      {children}
    </div>
  )
}
