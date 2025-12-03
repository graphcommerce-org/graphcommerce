import type { CurrencyEnum } from '@graphcommerce/graphql-mesh'
import { extendableComponent, type ExtendableComponentProps } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { Money } from '../Money/Money'
import type { PriceModifierItem } from './PriceModifiers'

const name = 'PriceModifierListChildItem'
const slots = ['root', 'label', 'quantity', 'amount'] as const
const { withState } = extendableComponent(name, slots)

type PriceModifierListChildItemProps = Omit<PriceModifierItem, 'key'> & {
  currency?: CurrencyEnum | null | undefined
  color?: 'text.primary' | 'text.secondary'
} & ExtendableComponentProps<typeof slots>

export function PriceModifierListChildItem(props: PriceModifierListChildItemProps) {
  const { label, amount = 0, quantity = 1, secondary, currency, color = 'text.secondary' } = props

  const classes = withState(props)

  return (
    <Box className={classes.root} sx={(theme) => ({ display: 'flex', gap: theme.spacings.xxs })}>
      <Box className={classes.label} sx={{ color }}>
        {label}
      </Box>
      {(quantity > 1 || secondary) && (
        <Box className={classes.quantity} sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
          {quantity > 1 && (
            <>
              {quantity} &times; <Money value={amount} currency={currency} />
            </>
          )}
          {secondary}
        </Box>
      )}
      {amount !== 0 && amount && (
        <Box
          className={classes.amount}
          sx={(theme) => ({ position: 'absolute', right: theme.spacings.xs })}
        >
          <Money value={quantity * amount} currency={currency} />
        </Box>
      )}
    </Box>
  )
}
