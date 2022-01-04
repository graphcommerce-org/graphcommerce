import { useHistoryLink } from '@graphcommerce/framer-next-pages'
import { SectionContainer, UseStyles } from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Link, Theme, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PageLink from 'next/link'
import React from 'react'
import { useCartQuery } from '../../hooks'
import CartAddressMultiLine from '../CartAddressMultiLine'
import { GetCartSummaryDocument } from './GetCartSummary.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      margin: `${theme.spacings.sm} 0`,
      '& div:last-child': {
        borderRadius: '0 0 4px 4px',
      },
    },
    detailsContainer: {
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
    },
    sectionHeaderWrapper: {
      marginTop: 0,
      paddingBottom: 8,
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
  const { href: historyHref, onClick: historyOnClick } = useHistoryLink({
    href: '/checkout',
  })

  if (!data?.cart) return null

  const { email, shipping_addresses, billing_address } = data.cart

  return (
    <div className={classes.root}>
      <div className={classes.detailsContainer}>
        <div>
          <SectionContainer
            variantLeft='h5'
            labelLeft={t`Confirmation + Track & trace`}
            classes={{ sectionHeaderWrapper: classes.sectionHeaderWrapper }}
          />
          <Typography variant='body1'>{email || ''}</Typography>
        </div>
        <div>
          <SectionContainer
            variantLeft='h5'
            labelLeft={t`Shipping method`}
            classes={{ sectionHeaderWrapper: classes.sectionHeaderWrapper }}
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
                labelLeft={t`Shipping address`}
                classes={{ sectionHeaderWrapper: classes.sectionHeaderWrapper }}
                labelRight={
                  editable ? (
                    <PageLink href={historyHref} passHref>
                      <Link
                        color='secondary'
                        variant='body2'
                        onClick={historyOnClick}
                        underline="hover">
                        <Trans>Edit</Trans>
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
                labelLeft={t`Billing Address`}
                classes={{ sectionHeaderWrapper: classes.sectionHeaderWrapper }}
                labelRight={
                  editable ? (
                    <PageLink href='/checkout/edit/billing-address' passHref>
                      <Link color='secondary' variant='body2' underline="hover">
                        <Trans>Edit</Trans>
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
  );
}
