import { ActionCardListForm } from '@graphcommerce/ecommerce-ui'
import { Money } from '@graphcommerce/magento-store'
import type { ActionCardProps } from '@graphcommerce/next-ui'
import { ActionCard, nonNullable, SectionHeader } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Box, Checkbox } from '@mui/material'
import { useFormAddProductsToCart } from '../AddProductsToCart'
import type { OptionTypeRenderer } from './CustomizableAreaOption'
import type { CustomizableCheckboxOptionFragment } from './CustomizableCheckboxOption.gql'

export type CustomizableCheckboxOptionProps = React.ComponentProps<
  OptionTypeRenderer['CustomizableCheckboxOption']
>

type CheckboxActionCardProps = Pick<CustomizableCheckboxOptionProps, 'productPrice' | 'currency'> &
  Pick<ActionCardProps, 'value' | 'selected'> & {
    option: NonNullable<NonNullable<CustomizableCheckboxOptionFragment['checkboxValue']>[number]>
  }

function CustomizableCheckboxActionCard(props: CheckboxActionCardProps) {
  const { productPrice, currency, value, selected, option, ...rest } = props
  const { title, price, price_type } = option

  return (
    <ActionCard
      {...rest}
      value={value}
      selected={selected}
      title={
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox checked={selected} /> {title}
        </Box>
      }
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

export function CustomizableCheckboxOption(props: CustomizableCheckboxOptionProps) {
  const { uid, required, index, title: label, checkboxValue, productPrice, currency } = props
  const { control } = useFormAddProductsToCart()

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
        control={control}
        rules={{
          required: required
            ? i18n._(/* i18n*/ 'Please select a value for ‘{label}’', { label })
            : false,
        }}
        render={CustomizableCheckboxActionCard}
        name={`cartItems.${index}.selected_options_record.${uid}`}
        items={(checkboxValue ?? []).filter(nonNullable).map((checkboxVal) => ({
          productPrice,
          currency,
          title: checkboxVal.title ?? '',
          value: checkboxVal.uid,
          option: checkboxVal,
        }))}
        errorMessage=''
      />
    </Box>
  )
}
