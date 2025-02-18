import { extendableComponent, SectionContainer } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import type { InvoiceFragment } from './Invoice.gql'
import { InvoiceItem } from './InvoiceItem'

export type InvoiceItemsProps = {
  invoice: InvoiceFragment
  sx?: SxProps<Theme>
}

const componentName = 'InvoiceItems'
const parts = ['root', 'items'] as const
const { classes } = extendableComponent(componentName, parts)

export function InvoiceItems(props: InvoiceItemsProps) {
  const { invoice, sx = [] } = props
  const { items } = invoice

  if (!items?.length) return null

  return (
    <SectionContainer
      labelLeft={<Trans>Invoiced items</Trans>}
      className={classes.root}
      sx={[
        (theme) => ({
          marginTop: theme.spacings.md,
          marginBottom: theme.spacings.sm,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box className={classes.items} sx={(theme) => ({ mb: theme.spacings.md })}>
        {items.map((item) => {
          if (!item) return null
          return <InvoiceItem key={item.id} item={item} />
        })}
      </Box>
    </SectionContainer>
  )
}
