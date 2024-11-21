import { ActionCardListForm } from '@graphcommerce/ecommerce-ui'
import { Money } from '@graphcommerce/magento-store'
import type { ActionCardProps } from '@graphcommerce/next-ui'
import { ActionCard, filterNonNullableKeys, SectionHeader } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Box } from '@mui/material'
import { useFormAddProductsToCart } from '../AddProductsToCart'
import type { OptionTypeRenderer } from './CustomizableAreaOption'

type CustomizableRadioOptionProps = React.ComponentProps<
  OptionTypeRenderer['CustomizableRadioOption']
>

export function CustomizableRadioOption(props: CustomizableRadioOptionProps) {
  const { uid, required, index, title: label, radioValue, currency, productPrice } = props
  const { control, getValues } = useFormAddProductsToCart()

  const allSelected = getValues(`cartItems.${index}.customizable_options.${uid}`) || []

  return (
    <Box>
      <SectionHeader labelLeft={label} sx={{ mt: 0 }} />
      <ActionCardListForm
        sx={(theme) => ({
          mt: theme.spacings.xxs,
        })}
        layout='stack'
        control={control}
        render={ActionCard}
        name={`cartItems.${index}.customizable_options.${uid}`}
        rules={{
          required: required
            ? i18n._(/* i18n*/ 'Please select a value for ‘{label}’', { label })
            : false,
        }}
        items={filterNonNullableKeys(radioValue, ['title']).map(
          (radioVal) =>
            ({
              value: radioVal.uid,
              title: radioVal.title,
              price:
                radioVal.price === 0
                  ? null
                  : radioVal.price && (
                      <Box
                        sx={{
                          color: allSelected.includes(radioVal.uid)
                            ? 'text.primary'
                            : 'text.secondary',
                        }}
                      >
                        {/* Change fontFamily so the + is properly outlined */}
                        <span style={{ fontFamily: 'arial' }}>{'+ '}</span>
                        <Money
                          value={
                            radioVal.price_type === 'PERCENT'
                              ? productPrice * (radioVal.price / 100)
                              : radioVal.price
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
