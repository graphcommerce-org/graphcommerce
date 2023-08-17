import { TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { Image } from '@graphcommerce/image'
import { useFormAddProductsToCart } from '@graphcommerce/magento-product'
import { Money } from '@graphcommerce/magento-store'
import {
  responsiveVal,
  ActionCardItemRenderProps,
  ActionCard,
  Button,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { BundleOptionValueProps } from './types'

const swatchSizes = {
  small: responsiveVal(30, 40),
  medium: responsiveVal(30, 50),
  large: responsiveVal(50, 80),
}

export const BundleOptionValue = (props: ActionCardItemRenderProps<BundleOptionValueProps>) => {
  const {
    selected,
    idx,
    index,
    price,
    product,
    label,
    size = 'large',
    color,
    can_change_quantity,
    quantity = 1,
    required,
    onReset,
  } = props
  const { control } = useFormAddProductsToCart()

  const thumbnail = product?.thumbnail?.url

  return (
    <ActionCard
      {...props}
      title={label}
      price={price ? <Money value={price} /> : undefined}
      image={
        thumbnail &&
        !thumbnail.includes('/placeholder/') && (
          <Image
            src={thumbnail}
            width={40}
            height={40}
            alt={label ?? ''}
            sizes={swatchSizes[size]}
            sx={{
              display: 'block',
              width: swatchSizes[size],
              height: swatchSizes[size],
              objectFit: 'cover',
            }}
          />
        )
      }
      action={
        (can_change_quantity || !required) && (
          <Button disableTouchRipple variant='inline' color='inherit' size='small' tabIndex={-1}>
            <Trans id='Select' />
          </Button>
        )
      }
      reset={
        (can_change_quantity || !required) && (
          <Button
            disableTouchRipple
            variant='inline'
            color='inherit'
            size='small'
            onClick={onReset}
          >
            {can_change_quantity ? <Trans id='Change' /> : <Trans id='Remove' />}
          </Button>
        )
      }
      secondaryAction={
        selected &&
        can_change_quantity && (
          <TextFieldElement
            size='small'
            label='Quantity'
            color={color}
            castToNumber={false}
            InputProps={{ inputProps: { min: 1 } }}
            required
            defaultValue={`${quantity}`}
            control={control}
            sx={{ width: responsiveVal(80, 120), mt: 2 }}
            name={`cartItems.${index}.entered_options.${idx}.value`}
            type='number'
            onMouseDown={(e) => e.stopPropagation()}
          />
        )
      }
    />
  )
}
