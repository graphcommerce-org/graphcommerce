import type { CartItemActionCardProps } from '@graphcommerce/magento-cart-items'
import { CartItemActionCard } from '@graphcommerce/magento-cart-items'
import type { ActionCardLayoutProps } from '@graphcommerce/next-ui'
import {
  ActionCardLayout,
  breakpointVal,
  extendableComponent,
  nonNullable,
  SectionContainer,
  sxx,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import type { SxProps, Theme } from '@mui/material'
import { Box, Divider } from '@mui/material'
import { useCartQuery } from '../../hooks'
import { CartTotals } from '../CartTotals/CartTotals'
import { CartItemSummaryDocument } from './GetCartItemSummary.gql'

const name = 'CartItemSummary'
const parts = ['root', 'items', 'actionCard', 'divider'] as const
const { classes } = extendableComponent(name, parts)

export type OrderSummaryProps = ActionCardLayoutProps & {
  sx?: SxProps<Theme>
  itemProps?: Omit<
    CartItemActionCardProps,
    'cartItem' | 'layout' | 'onClick' | 'disabled' | 'selected' | 'reset' | 'color'
  >
} & { size?: 'small' | 'medium' | 'large' }

export function CartItemSummary(props: OrderSummaryProps) {
  const { sx = [], size, layout = 'list', itemProps, ...cardLayout } = props
  const { data } = useCartQuery(CartItemSummaryDocument, { fetchPolicy: 'cache-only' })

  if (!data?.cart) return null

  const items = data?.cart.items

  return (
    <Box
      className={classes.root}
      sx={sxx(
        (theme) => ({
          padding: `${theme.spacings.sm} ${theme.spacings.sm}`,
          border: `1px ${theme.vars.palette.divider} solid`,
          ...breakpointVal(
            'borderRadius',
            theme.shape.borderRadius * 2,
            theme.shape.borderRadius * 3,
            theme.breakpoints.values,
          ),
        }),
        sx,
      )}
    >
      <SectionContainer
        sx={{ '& .SectionHeader-root': { mt: 0 } }}
        labelLeft={<Trans>Order summary</Trans>}
        variantLeft='h6'
        className={classes.items}
      >
        <ActionCardLayout
          sx={(theme) => ({ marginBottom: theme.spacings.md, '&.layoutStack': { gap: 0 } })}
          className={classes.actionCard}
          {...cardLayout}
        >
          {(items ?? []).filter(nonNullable).map((item) => (
            <CartItemActionCard
              readOnly
              key={item.uid}
              cartItem={item}
              variant='default'
              {...itemProps}
              layout={layout}
              size={size}
            />
          ))}
        </ActionCardLayout>

        <Divider
          classes={{ root: classes.divider }}
          sx={(theme) => ({
            margin: `${theme.spacings.xs} 0 ${theme.spacings.xs} 0`,
          })}
        />
        <CartTotals sx={{ background: 'none', padding: 0 }} readOnly />
      </SectionContainer>
    </Box>
  )
}
