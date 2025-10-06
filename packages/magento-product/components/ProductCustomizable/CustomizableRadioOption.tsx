import { ActionCardListForm } from '@graphcommerce/ecommerce-ui'
import { Money } from '@graphcommerce/magento-store'
import type { ActionCardProps } from '@graphcommerce/next-ui'
import { ActionCard, filterNonNullableKeys, SectionHeader } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Box } from '@mui/material'
import { useFormAddProductsToCart } from '../AddProductsToCart'
import type { OptionTypeRenderer } from './CustomizableAreaOption'
import type { CustomizableRadioOptionFragment } from './CustomizableRadioOption.gql'

export type CustomizableRadioOptionProps = React.ComponentProps<
  OptionTypeRenderer['CustomizableRadioOption']
>

type RadioActionCardProps = Pick<CustomizableRadioOptionProps, 'productPrice' | 'currency'> &
  Pick<ActionCardProps, 'value' | 'selected'> & {
    option: NonNullable<NonNullable<CustomizableRadioOptionFragment['radioValue']>[number]>
  }

function CustomizableRadioActionCard(props: RadioActionCardProps) {
  const { productPrice, currency, value, option, selected, ...rest } = props
  const { title, price, price_type } = option

  return (
    <ActionCard
      {...rest}
      value={value}
      title={title}
      selected={selected}
      price={
        price === 0
          ? null
          : price && (
              <Box
                sx={{
                  color: selected ? 'text.primary' : 'text.secondary',
                }}
              >
                {/* Change fontFamily so the + is properly outlined */}
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

export function CustomizableRadioOption(props: CustomizableRadioOptionProps) {
  const { uid, required, index, title: label, radioValue, currency, productPrice } = props
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
        layout='stack'
        control={control}
        render={CustomizableRadioActionCard}
        name={`cartItems.${index}.selected_options_record.${uid}`}
        rules={{
          required: required
            ? i18n._(/* i18n*/ 'Please select a value for ‘{label}’', { label })
            : false,
        }}
        items={filterNonNullableKeys(radioValue, ['title']).map((radioVal) => ({
          productPrice,
          currency,
          title: radioVal.title ?? '',
          value: radioVal.uid,
          option: radioVal,
        }))}
      />
    </Box>
  )
}
