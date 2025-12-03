import { Money } from '@graphcommerce/magento-store'
import { breakpointVal, iconChevronRight, IconSvg, NextLink, sxx } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import type { SxProps, Theme } from '@mui/material'
import { Box, lighten } from '@mui/material'
import type { InvoiceCardFragment } from './InvoiceCard.gql'

export type InvoiceCardProps = {
  orderNumber: string
  invoice: InvoiceCardFragment
  sx?: SxProps<Theme>
}

export function InvoiceCard(props: InvoiceCardProps) {
  const { invoice, sx = [], orderNumber } = props
  const { number, total } = invoice

  return (
    <Box
      component={NextLink}
      href={`/account/orders/invoice?orderNumber=${orderNumber}&invoiceNumber=${number}`}
      sx={sxx(
        (theme) => ({
          textDecoration: 'none',
          color: 'text.primary',
          px: theme.spacings.xxs,
          py: theme.spacings.xxs,
          gap: theme.spacings.sm,
          background: theme.palette.background.default,
          ...theme.applyStyles('dark', {
            background: lighten(theme.palette.background.default, 0.15),
          }),
          ...breakpointVal(
            'borderRadius',
            theme.shape.borderRadius * 2,
            theme.shape.borderRadius * 3,
            theme.breakpoints.values,
          ),
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
          display: 'grid',
          gridTemplate: `
            "number total action" / 1fr auto auto
          `,
          rowGap: 0.5,
          columnGap: 1,
        }),
        sx,
      )}
    >
      <Box sx={{ gridArea: 'number', typography: 'body1' }}>
        <Trans>Invoice #{number}</Trans>
      </Box>
      <Box sx={{ gridArea: 'total', alignSelf: 'center' }}>
        <Money {...total?.grand_total} />
      </Box>

      <IconSvg
        src={iconChevronRight}
        size='medium'
        sx={{ gridArea: 'action', alignSelf: 'center' }}
      />
    </Box>
  )
}
