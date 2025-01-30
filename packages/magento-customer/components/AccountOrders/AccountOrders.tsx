import { Pagination, sxx } from '@graphcommerce/next-ui'
import type { SxProps, Theme } from '@mui/material'
import { Box, Link } from '@mui/material'
import React from 'react'
import { NoOrdersFound } from '../NoOrdersFound/NoOrdersFound'
import { OrderCard } from '../OrderCard/OrderCard'
import type { AccountOrdersFragment } from './AccountOrders.gql'

export type AccountOrdersProps = AccountOrdersFragment & { sx?: SxProps<Theme> }

export function AccountOrders(props: AccountOrdersProps) {
  const { orders, sx = [] } = props
  const pageInfo = orders?.page_info

  return (
    <Box sx={sxx((theme) => ({ display: 'grid', rowGap: theme.spacings.sm }), sx)}>
      {orders?.items?.map((order) => order && <OrderCard key={order.number} {...order} />)}
      {orders?.items && !orders?.items?.length && <NoOrdersFound />}

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
