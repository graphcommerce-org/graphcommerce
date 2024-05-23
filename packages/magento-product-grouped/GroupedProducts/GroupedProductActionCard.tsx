import { NumberFieldElement } from '@graphcommerce/ecommerce-ui'
import { Image } from '@graphcommerce/image'
import { ProductPageItemFragment } from '@graphcommerce/magento-product/Api/ProductPageItem.gql'
import {
  AddToCartItemSelector,
  useFormAddProductsToCart,
} from '@graphcommerce/magento-product/components'
import { Money } from '@graphcommerce/magento-store'
import {
  ActionCard,
  ActionCardProps,
  actionCardImageSizes,
  responsiveVal,
} from '@graphcommerce/next-ui'
import { Box, Link } from '@mui/material'

export type GroupedProductActionCardProps = ProductPageItemFragment &
  Omit<ActionCardProps, 'value' | 'image' | 'price' | 'title' | 'action'> &
  AddToCartItemSelector

const typographySizes = {
  small: 'body2',
  medium: 'body1',
  large: 'subtitle1',
}

export function GroupedProductActionCard(props: GroupedProductActionCardProps) {
  const {
    uid,
    name,
    small_image,
    price_range,
    url_key,
    sx = [],
    size = 'large',
    index = 0,
    sku,
    url_rewrites,
    ...rest
  } = props

  const { control, register } = useFormAddProductsToCart()
  if (!sku) return null
  const hasUrl = (url_rewrites ?? []).length > 0
  return (
    <>
      <input type='hidden' {...register(`cartItems.${index}.sku`)} value={sku} />
      <ActionCard
        variant='default'
        value={uid}
        sx={[
          (theme) => ({
            '&.ActionCard-root': {
              px: 0,
              py: theme.spacings.xs,
            },
            '& .ActionCard-title': {
              width: '100%',
            },
            '& .ActionCard-rootInner': {
              justifyContent: 'space-between',
              alignItems: 'stretch',
            },
            '&.sizeSmall': {
              px: 0,
            },
            '& .ActionCard-end': {
              justifyContent: 'space-between',
            },
            '& .ActionCard-action': {
              pr: theme.spacings.xs,
            },
            '& .ActionCard-image': {
              alignSelf: 'flex-start',
            },
            '& .ActionCard-secondaryAction': {
              typography: typographySizes[size],
              display: 'flex',
              alignItems: 'center',
              color: 'text.secondary',
              gap: '10px',
              justifyContent: 'start',
            },
            '& .ActionCard-price': {
              typography: typographySizes[size],
              pr: theme.spacings.xs,
              mb: { xs: 0.5, sm: 0 },
            },
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        image={
          small_image?.url && (
            <Image
              layout='fill'
              src={small_image?.url}
              sx={{
                width: actionCardImageSizes[size],
                height: actionCardImageSizes[size],
                display: 'block',
                borderRadius: 1,
                objectFit: 'contain',
              }}
              sizes={actionCardImageSizes[size]}
            />
          )
        }
        title={
          url_key && hasUrl ? (
            <Link
              href={url_key}
              underline='hover'
              sx={{
                color: 'inherit',
                flexWrap: 'nowrap',
                maxWidth: 'max-content',
              }}
            >
              {name}
            </Link>
          ) : (
            name
          )
        }
        secondaryAction={
          <NumberFieldElement
            size='small'
            inputProps={{ min: 0 }}
            defaultValue={1}
            control={control}
            sx={{
              width: responsiveVal(80, 120),
              mt: 2,
              '& .MuiFormHelperText-root': {
                margin: 1,
                width: '100%',
              },
            }}
            name={`cartItems.${index}.quantity`}
            onMouseDown={(e) => e.stopPropagation()}
          />
        }
        price={
          <Box>
            <Box>
              <Money {...price_range.minimum_price.final_price} />
            </Box>
            {price_range.minimum_price.final_price.value !==
              price_range.minimum_price.regular_price.value && (
              <Box
                component='span'
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.disabled',
                }}
              >
                <Money {...price_range.minimum_price.regular_price} />
              </Box>
            )}
          </Box>
        }
        {...rest}
      />
    </>
  )
}
