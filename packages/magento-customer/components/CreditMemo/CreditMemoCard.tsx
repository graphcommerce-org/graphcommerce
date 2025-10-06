import { Money } from '@graphcommerce/magento-store'
import { breakpointVal, iconChevronRight, IconSvg, NextLink, sxx } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import type { SxProps, Theme } from '@mui/material'
import { Box, lighten } from '@mui/material'
import type { CreditMemoCardFragment } from './CreditMemoCard.gql'

export type CreditMemoCardProps = {
  orderNumber: string
  creditMemo: CreditMemoCardFragment
  sx?: SxProps<Theme>
}

export function CreditMemoCard(props: CreditMemoCardProps) {
  const { creditMemo, orderNumber, sx = [] } = props
  const { number, total } = creditMemo

  return (
    <Box
      component={NextLink}
      href={`/account/orders/credit-memo?orderNumber=${orderNumber}&creditMemoNumber=${number}`}
      sx={sxx(
        (theme) => ({
          textDecoration: 'none',
          color: 'text.primary',
          px: theme.spacings.xxs,
          py: theme.spacings.xxs,
          gap: theme.spacings.sm,
          background:
            theme.palette.mode === 'light'
              ? theme.palette.background.default
              : lighten(theme.palette.background.default, 0.15),
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
        <Trans>Credit Memo #{number}</Trans>
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
