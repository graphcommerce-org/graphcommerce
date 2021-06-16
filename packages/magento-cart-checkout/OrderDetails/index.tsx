import { makeStyles, Theme, Typography, Link } from '@material-ui/core'
import { EmailFormProps } from '@reachdigital/magento-cart-email'
import { CartProps, DeliveryLabelProps } from '@reachdigital/magento-cart-items'
import { ShippingAddressFormProps } from '@reachdigital/magento-cart-shipping-address'
import { AddressMultiLine, OrderStateLabelInline } from '@reachdigital/magento-customer'
import SectionHeader from '@reachdigital/next-ui/SectionHeader'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import PageLink from 'next/link'
import React from 'react'
import { CartAddressMultiLineProps } from '../../magento-cart-address'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      borderRadius: 4,
      background: '#FFFADD',
      padding: theme.spacings.xs,
      margin: `${theme.spacings.lg} 0`,

      [theme.breakpoints.up('md')]: {
        padding: theme.spacings.md,
        marginTop: theme.spacings.md,
      },
    },
    detailsContainer: {
      gridColumnGap: theme.spacings.lg,
      gridRowGap: theme.spacings.md,
      display: `grid`,

      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: `1fr 1fr`,
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
      '& > a ': {
        textDecoration: 'none!important',
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
  { name: 'OrderDetailSummary' },
)

export type OrderDetailProps = CartAddressMultiLineProps &
  DeliveryLabelProps &
  ShippingAddressFormProps &
  EmailFormProps & {
    children: React.ReactNode
    optionEndLabels: boolean
  } & UseStyles<typeof useStyles>

export default function OrderDetails(props: any) {
  const classes = useStyles()
  const { email, shipping_addresses, billing_address, children, optionEndLabels } = props

  console.log(props)

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
              optionEndLabels ? (
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
              optionEndLabels ? (
                <PageLink key='Shipping method' href='/checkout/edit/shipping'>
                  Edit
                </PageLink>
              ) : undefined
            }
          />
          <Typography variant='body1'>
            {shipping_addresses?.[0]?.selected_shipping_method?.carrier_code || ''}
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
                  optionEndLabels ? (
                    <PageLink key='Shipping address' href='/checkout/edit/shipping_address'>
                      Edit
                    </PageLink>
                  ) : undefined
                }
              />
              <Typography variant='body1'>
                <AddressMultiLine classes={{ title: classes.address }} {...shipping_addresses[0]} />
              </Typography>
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
                  optionEndLabels ? (
                    <PageLink key='Billing address' href='/checkout/edit/billing_address'>
                      Edit
                    </PageLink>
                  ) : undefined
                }
              />
              <Typography variant='body1'>
                <AddressMultiLine
                  classes={{ title: classes.address }}
                  {...(billing_address || shipping_addresses[0])}
                />
              </Typography>
            </div>
          </>
        )}
      </div>
      {children}
    </div>
  )
}
