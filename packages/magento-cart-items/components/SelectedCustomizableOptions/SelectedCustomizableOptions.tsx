import { Money } from '@graphcommerce/magento-store'
import { filterNonNullableKeys, nonNullable } from '@graphcommerce/next-ui'
import Typography from '@mui/material/Typography'
import { CartItem_ConfigurableCartItem_Fragment } from '../../Api/CartItem.gql'
import { ActionCartItemProps } from '../ActionCartItem/ActionCartItem'
import { SelectedCustomizableOptionFragment } from './SelectedCustomizableOption.gql'

type ConfigurableActionCartItemProps = {
  customizable_options?: (SelectedCustomizableOptionFragment | null | undefined)[] | null
}

export function SelectedCustomizableOptions(props: ConfigurableActionCartItemProps) {
  const { customizable_options } = props

  const options = filterNonNullableKeys(customizable_options, [])

  if (!options.length) return null

  return (
    <>
      {options.map((option) => (
        <Typography variant='body2' component='div' key={option.customizable_option_uid}>
          <Typography variant='subtitle2' component='span'>
            {option.label}
          </Typography>
          {option.values.filter(nonNullable).map((value) => (
            <span key={value.customizable_option_value_uid}>
              {value.price.value > 0 && <Money value={value.price.value} />} {value?.label}
              {value?.value}
            </span>
          ))}
        </Typography>
      ))}
    </>
  )
}
