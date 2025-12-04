import { ActionCardListForm } from '@graphcommerce/ecommerce-ui'
import { Money } from '@graphcommerce/magento-store'
import type { ActionCardProps } from '@graphcommerce/next-ui'
import { ActionCard, filterNonNullableKeys, SectionHeader } from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Box } from '@mui/material'
import { useFormAddProductsToCart } from '../AddProductsToCart'
import type { OptionTypeRenderer } from './CustomizableAreaOption'
import type { CustomizableMultipleOptionFragment } from './CustomizableMultipleOption.gql'

export type CustomizableMultipleOptionProps = React.ComponentProps<
  OptionTypeRenderer['CustomizableMultipleOption']
>

type MultipleActionCardProps = Pick<CustomizableMultipleOptionProps, 'productPrice' | 'currency'> &
  Pick<ActionCardProps, 'value' | 'selected'> & {
    option: NonNullable<NonNullable<CustomizableMultipleOptionFragment['multipleValue']>[number]>
  }

function CustomizableMultipleActionCard(props: MultipleActionCardProps) {
  const { productPrice, currency, option, selected, ...rest } = props
  const { title, price, price_type } = option

  return (
    <ActionCard
      {...rest}
      selected={selected}
      title={title}
      price={
        price === 0
          ? null
          : price && (
              <Box
                sx={{
                  color: selected ? 'text.primary' : 'text.secondary',
                }}
              >
                <span style={{ fontFamily: 'arial' }}>{'+ '}</span>
                <Money
                  value={price_type === 'PERCENT' ? productPrice * (price / 100) : price}
                  currency={currency}
                />
              </Box>
            )
      }
    />
  )
}

export function CustomizableMultipleOption(props: CustomizableMultipleOptionProps) {
  const { uid, required, index, title, multipleValue, currency, productPrice } = props
  const { control } = useFormAddProductsToCart()
  const label = title ?? ''

  return (
    <Box>
      <SectionHeader
        labelLeft={
          <>
            {label} {required && ' *'}
          </>
        }
        sx={{ mt: 0 }}
      />
      <ActionCardListForm
        sx={(theme) => ({
          mt: theme.spacings.xxs,
        })}
        multiple
        rules={{
          required: required ? t`Please select a value for ‘${label}’` : false,
        }}
        control={control}
        render={CustomizableMultipleActionCard}
        name={`cartItems.${index}.selected_options_record.${uid}`}
        items={filterNonNullableKeys(multipleValue, ['title']).map((multipleVal) => ({
          productPrice,
          currency,
          title: multipleVal.title ?? '',
          value: multipleVal.uid,
          option: multipleVal,
        }))}
      />
    </Box>
  )
}
