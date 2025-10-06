import type { ActionCardItemRenderProps } from '@graphcommerce/ecommerce-ui'
import { NumberFieldElement } from '@graphcommerce/ecommerce-ui'
import { Image } from '@graphcommerce/image'
import { ProductListPrice, useFormAddProductsToCart } from '@graphcommerce/magento-product'
import { ActionCard, responsiveVal } from '@graphcommerce/next-ui'
import {
  calculateBundleOptionValuePrice,
  toProductListPriceFragment,
} from './calculateBundleOptionValuePrice'
import type { BundleOptionValueProps } from './types'

const swatchSizes = {
  small: responsiveVal(30, 40),
  medium: responsiveVal(30, 50),
  large: responsiveVal(50, 80),
}

export function BundleOptionValue(props: ActionCardItemRenderProps<BundleOptionValueProps>) {
  const {
    selected,
    item,
    option,
    product,
    index,
    size = 'large',
    color,
    price,
    onReset,
    ...rest
  } = props
  const { control } = useFormAddProductsToCart()

  const thumbnail = option.product?.thumbnail?.url

  const pricing = toProductListPriceFragment(
    calculateBundleOptionValuePrice(product, item, option),
    item.price_range.minimum_price.final_price.currency,
  )

  return (
    <ActionCard
      {...props}
      title={option.label}
      price={<ProductListPrice {...pricing} />}
      image={
        thumbnail &&
        !thumbnail.includes('/placeholder/') && (
          <Image
            src={thumbnail}
            width={40}
            height={40}
            alt={option.label ?? option.product?.name ?? ''}
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
      reset={<></>}
      secondaryAction={
        selected &&
        option.can_change_quantity && (
          <NumberFieldElement
            size='small'
            label='Quantity'
            color={color}
            inputProps={{ min: 1 }}
            required
            defaultValue={`${option.quantity}`}
            control={control}
            sx={{
              width: responsiveVal(80, 120),
              mt: 2,
              '& .MuiFormHelperText-root': { margin: 1, width: '100%' },
            }}
            name={`cartItems.${index}.entered_options_record.${option.uid}`}
            onMouseDown={(e) => e.stopPropagation()}
          />
        )
      }
    />
  )
}
