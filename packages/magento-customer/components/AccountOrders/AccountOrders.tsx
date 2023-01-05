import { Pagination, SectionContainer, extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, Link, SxProps, Theme } from '@mui/material'
import React from 'react'
import useOrderCardItemImages from '../../hooks/useOrderCardItemImages'
import { NoOrdersFound } from '../NoOrdersFound/NoOrdersFound'
import { OrderCard } from '../OrderCard/OrderCard'
import { AccountOrdersFragment } from './AccountOrders.gql'

export type AccountOrdersProps = AccountOrdersFragment & { sx?: SxProps<Theme> }

const parts = ['root', 'older'] as const
const { classes } = extendableComponent('AccountOrders', parts)

export function AccountOrders(props: AccountOrdersProps) {
  const { orders, sx = [] } = props
  const amountLatestOrders = 2
  const images = useOrderCardItemImages(orders)

  const pageInfo = orders?.page_info
  const isFirstPage = pageInfo?.current_page === 1

  // whenever it's possible, pick last {amountLatestOrders} items, then reverse the resulting array,
  // because we want to render the latest order first,
  // but the API returns the orders in ASC order...
  const latestOrders = orders?.items
    .slice(Math.max((orders?.items?.length ?? 0) - 2, 0), orders?.items?.length)
    .reverse()

  const olderOrders = isFirstPage
    ? orders?.items.slice(0, Math.max((orders?.items?.length ?? 0) - 2, 0)).reverse()
    : orders?.items

  return (
    <Box
      className={classes.root}
      sx={[
        (theme) => ({
          typography: 'body2',
          marginBottom: theme.spacings.md,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {isFirstPage && (
        <SectionContainer labelLeft={<Trans id='Latest orders' />}>
          {latestOrders?.map(
            (order) => order && <OrderCard key={order.number} {...order} images={images} />,
          )}
          {orders?.items && !orders?.items?.length && <NoOrdersFound />}
        </SectionContainer>
      )}

      {orders?.items &&
        ((isFirstPage && orders?.items?.length >= amountLatestOrders + 1) || !isFirstPage) && (
          <SectionContainer
            labelLeft={<Trans id='Older' />}
            className={classes.older}
            sx={(theme) => ({
              [theme.breakpoints.up('md')]: {
                marginTop: theme.spacings.lg,
                marginBottom: theme.spacings.lg,
              },
              marginTop: theme.spacings.md,
              marginBottom: theme.spacings.md,
            })}
          >
            {olderOrders?.map(
              (order) => order && <OrderCard key={order.number} {...order} images={images} />,
            )}
          </SectionContainer>
        )}

      <Pagination
        count={pageInfo?.total_pages ?? 1}
        page={pageInfo?.current_page ?? 1}
        renderLink={(p: number, icon: React.ReactNode) => (
          <Link
            href={p === 1 ? '/account/orders' : `/account/orders?page=${p}`}
            color='primary'
            underline='hover'
          >
            {icon}
          </Link>
        )}
      />
    </Box>
  )
}
