import { ActionCardListForm } from '@graphcommerce/ecommerce-ui'
import { Money } from '@graphcommerce/magento-store'
import {
  ActionCard,
  ActionCardProps,
  filterNonNullableKeys,
  SectionHeader,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Box, Checkbox } from '@mui/material'
import { useFormAddProductsToCart } from '../AddProductsToCart'
import { OptionTypeRenderer } from './CustomizableAreaOption'

type CustomizableCheckboxOptionProps = React.ComponentProps<
  OptionTypeRenderer['CustomizableCheckboxOption']
>

export function CustomizableCheckboxOption(props: CustomizableCheckboxOptionProps) {
  const { uid, required, index, title: label, checkboxValue, currency, productPrice } = props
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
        control={control}
        rules={{
          required: required
            ? i18n._(/* i18n*/ 'Please select a value for ‘{label}’', { label })
            : false,
        }}
        render={ActionCard}
        name={`cartItems.${index}.customizable_options.${uid}`}
        items={filterNonNullableKeys(checkboxValue, ['title']).map(
          (checkboxVal) =>
            ({
              value: checkboxVal.uid,
              title: (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox checked={allSelected.includes(checkboxVal.uid)} /> {checkboxVal.title}
                </Box>
              ),
              price:
                checkboxVal.price === 0
                  ? null
                  : checkboxVal.price && (
                      <Box
                        sx={{
                          color: allSelected.includes(checkboxVal.uid)
                            ? 'text.primary'
                            : 'text.secondary',
                        }}
                      >
                        <span style={{ fontFamily: 'arial' }}>{'+ '}</span>
                        <Money
                          value={
                            checkboxVal.price_type === 'PERCENT'
                              ? productPrice * (checkboxVal.price / 100)
                              : checkboxVal.price
                          }
                          currency={currency}
                        />
                      </Box>
                    ),
            }) satisfies ActionCardProps,
        )}
        errorMessage=''
      />
    </Box>
  )
}
