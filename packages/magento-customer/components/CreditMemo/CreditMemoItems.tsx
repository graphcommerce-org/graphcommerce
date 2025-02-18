import { extendableComponent, SectionContainer } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import type { CreditMemoFragment } from './CreditMemo.gql'
import { CreditMemoItem } from './CreditMemoItem'

export type CreditMemoItemsProps = {
  creditMemo: CreditMemoFragment
  sx?: SxProps<Theme>
}

const componentName = 'CreditMemoItems'
const parts = ['root', 'items'] as const
const { classes } = extendableComponent(componentName, parts)

export function CreditMemoItems(props: CreditMemoItemsProps) {
  const { creditMemo, sx = [] } = props
  const { items } = creditMemo

  if (!items?.length) return null

  return (
    <SectionContainer
      labelLeft={<Trans>Refunded items</Trans>}
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
          return <CreditMemoItem key={item.id} item={item} />
        })}
      </Box>
    </SectionContainer>
  )
}
