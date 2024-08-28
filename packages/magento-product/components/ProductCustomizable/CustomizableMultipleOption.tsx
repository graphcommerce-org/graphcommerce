import { ActionCardListForm } from '@graphcommerce/ecommerce-ui'
import { Money } from '@graphcommerce/magento-store'
import {
  ActionCard,
  ActionCardProps,
  filterNonNullableKeys,
  SectionHeader,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Box } from '@mui/material'
import { useFormAddProductsToCart } from '../AddProductsToCart'
import { OptionTypeRenderer } from './CustomizableAreaOption'

type CustomizableMultipleOptionProps = React.ComponentProps<
  OptionTypeRenderer['CustomizableMultipleOption']
>

export function CustomizableMultipleOption(props: CustomizableMultipleOptionProps) {
  const { uid, required, index, title: label, multipleValue, currency, productPrice } = props
  const { control, getValues } = useFormAddProductsToCart()

  const allSelected = getValues(`cartItems.${index}.customizable_options.${uid}`) || []

  return (
    <Box>
      <SectionHeader labelLeft={label} sx={{ mt: 0 }} />
      <ActionCardListForm
        sx={(theme) => ({
          mt: theme.spacings.xxs,
        })}
        multiple
        rules={{
          required: required
            ? i18n._(/* i18n*/ 'Please select a value for ‘{label}’', { label })
            : false,
        }}
        control={control}
        render={ActionCard}
        name={`cartItems.${index}.customizable_options.${uid}`}
        items={filterNonNullableKeys(multipleValue, ['title']).map(
          (multipleVal) =>
            ({
              value: multipleVal.uid,
              title: multipleVal.title,
              price:
                multipleVal.price === 0
                  ? null
                  : multipleVal.price && (
                      <Box
                        sx={{
                          color: allSelected.includes(multipleVal.uid)
                            ? 'text.primary '
                            : 'text.secondary',
                        }}
                      >
                        <span style={{ fontFamily: 'arial' }}>{'+ '}</span>
                        <Money
                          value={
                            multipleVal.price_type === 'PERCENT'
                              ? productPrice * (multipleVal.price / 100)
                              : multipleVal.price
                          }
                          currency={currency}
                        />
                      </Box>
                    ),
            }) satisfies ActionCardProps,
        )}
      />
    </Box>
  )
}
