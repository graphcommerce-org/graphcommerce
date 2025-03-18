import type { ActionCardItemRenderProps } from '@graphcommerce/ecommerce-ui'
import { NumberFieldElement } from '@graphcommerce/ecommerce-ui'
import { Image } from '@graphcommerce/image'
import { useFormAddProductsToCart } from '@graphcommerce/magento-product'
import { calcOptionPrice } from '@graphcommerce/magento-product/components/ProductPagePrice/useCustomizableOptionPrice'
import { Money } from '@graphcommerce/magento-store'
import { ActionCard, Button, responsiveVal } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import type { BundleOptionValueProps } from './types'

const swatchSizes = {
  small: responsiveVal(30, 40),
  medium: responsiveVal(30, 50),
  large: responsiveVal(50, 80),
}

export function BundleOptionValue(props: ActionCardItemRenderProps<BundleOptionValueProps>) {
  const {
    selected,
    uid,
    index,
    product,
    label,
    size = 'large',
    color,
    can_change_quantity,
    price_type,
    quantity = 1,
    required,
    onReset,
  } = props
  const { control } = useFormAddProductsToCart()

  const thumbnail = product?.thumbnail?.url

  const price = calcOptionPrice(props, product?.price_range.minimum_price.final_price)

  return (
    <ActionCard
      {...props}
      title={label}
      price={
        price ? (
          <Money value={price} currency={product?.price_range.minimum_price.final_price.currency} />
        ) : undefined
      }
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
      reset={
        (can_change_quantity || !required) && (
          <Button disableRipple variant='inline' color='inherit' size='small' onClick={onReset}>
            <Trans id='Remove' />
          </Button>
        )
      }
      secondaryAction={
        selected &&
        can_change_quantity && (
          <NumberFieldElement
            size='small'
            label='Quantity'
            color={color}
            inputProps={{ min: 1 }}
            required
            defaultValue={`${quantity}`}
            control={control}
            sx={{
              width: responsiveVal(80, 120),
              mt: 2,
              '& .MuiFormHelperText-root': {
                margin: 1,
                width: '100%',
              },
            }}
            name={`cartItems.${index}.entered_options_record.${uid}`}
            onMouseDown={(e) => e.stopPropagation()}
          />
        )
      }
    />
  )
}
