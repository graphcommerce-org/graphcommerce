import {
  ActionCardLayout,
  breakpointVal,
  extendableComponent,
  nonNullable,
  SectionContainer,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import type { InvoiceFragment } from './Invoice.gql'
import { InvoiceItem } from './InvoiceItem'

export type InvoiceItemsProps = {
  invoice: InvoiceFragment
  sx?: SxProps<Theme>
  layout?: 'list' | 'grid'
  size?: 'small' | 'medium' | 'large'
}

const componentName = 'InvoiceItems'
const parts = ['root', 'items', 'actionCard'] as const
const { classes } = extendableComponent(componentName, parts)

export function InvoiceItems(props: InvoiceItemsProps) {
  const { invoice, sx = [], layout = 'list', size } = props

  const items = (invoice.items ?? []).filter(nonNullable)
  if (!items.length) return null

  return (
    <Box
      className={classes.root}
      sx={[
        (theme) => ({
          my: theme.spacings.md,
          padding: `${theme.spacings.sm} ${theme.spacings.sm}`,
          border: `1px ${theme.palette.divider} solid`,
          ...breakpointVal(
            'borderRadius',
            theme.shape.borderRadius * 2,
            theme.shape.borderRadius * 3,
            theme.breakpoints.values,
          ),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <SectionContainer
        sx={{ '& .SectionHeader-root': { mt: 0 } }}
        labelLeft={<Trans>Invoiced items</Trans>}
        variantLeft='h6'
        className={classes.items}
      >
        <ActionCardLayout
          sx={(theme) => ({
            marginBottom: theme.spacings.md,
            '&.layoutStack': {
              gap: 0,
            },
          })}
          className={classes.actionCard}
          layout={layout}
        >
          {items.map((item) => (
            <InvoiceItem key={item.id} item={item} size={size} layout={layout} variant='default' />
          ))}
        </ActionCardLayout>
      </SectionContainer>
    </Box>
  )
}
