import { TextFieldElement } from '@graphcommerce/ecommerce-ui'
import type { CustomizableDateTypeEnum } from '@graphcommerce/graphql-mesh'
import { SectionHeader } from '@graphcommerce/next-ui'
import { t } from '@lingui/macro'
import { Box } from '@mui/material'
import { useFormAddProductsToCart } from '../AddProductsToCart'
import type { OptionTypeRenderer } from './CustomizableAreaOption'
import { CustomizablePrice } from './CustomizablePrice'

export type CustomizableDateOptionProps = React.ComponentProps<
  OptionTypeRenderer['CustomizableDateOption']
> & {
  minDate?: Date
  maxDate?: Date
}

function getInputType(
  type: CustomizableDateTypeEnum | null | undefined,
): React.HTMLInputTypeAttribute {
  if (type === 'DATE') return 'date'
  if (type === 'TIME') return 'time'
  return 'datetime-local'
}

export function CustomizableDateOption(props: CustomizableDateOptionProps) {
  const { uid, required, index, title, minDate, maxDate, dateValue, currency, productPrice } = props
  const { control } = useFormAddProductsToCart()

  const name = `cartItems.${index}.customizable_options_entered.${uid}` as const
  if (!dateValue) return null

  minDate?.setSeconds(0, 0)
  maxDate?.setSeconds(0, 0)

  return (
    <Box>
      <SectionHeader labelLeft={title} sx={{ mt: 0 }} />
      <TextFieldElement
        control={control}
        name={name}
        sx={{
          width: '100%',
          '& ::-webkit-calendar-picker-indicator': {
            filter: (theme) => (theme.palette.mode === 'dark' ? 'invert(100%)' : 'none'),
            mr: '10px',
          },
        }}
        required={!!required}
        type={getInputType(dateValue.type)}
        InputProps={{
          endAdornment: (
            <CustomizablePrice
              name={name}
              price_type={dateValue.price_type}
              currency={currency}
              value={dateValue.price}
              productPrice={productPrice}
            />
          ),
          inputProps: {
            min: minDate?.toISOString().replace(/.000Z/, ''),
            max: maxDate?.toISOString().replace(/.000Z/, ''),
          },
        }}
        rules={{
          validate: (value) => {
            if (!(value instanceof Date)) return true

            if (minDate && value < minDate)
              return t`Date must be after ${minDate.toLocaleDateString()}`
            if (maxDate && value > maxDate)
              return t`Date must be before ${maxDate.toLocaleDateString()}`

            return true
          },
        }}
      />
    </Box>
  )
}
