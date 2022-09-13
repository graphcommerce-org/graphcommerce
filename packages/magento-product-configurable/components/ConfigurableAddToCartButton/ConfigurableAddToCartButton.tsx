import {
  AddProductsToCartButton,
  AddProductsToCartButtonProps,
  useFormAddProductsToCart,
} from '@graphcommerce/magento-product'
import { nonNullable } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box } from '@mui/material'
import { useConfigurableTypeProduct } from '../../hooks/useConfigurableTypeProduct'

export function ConfigurableAddToCartButton(props: AddProductsToCartButtonProps) {
  const typeProduct = useConfigurableTypeProduct()
  const form = useFormAddProductsToCart()

  const { watch, formState } = form
  const options = (watch('cartItems.0.selected_options') ?? []).filter(nonNullable).filter(Boolean)

  const optionCount = typeProduct?.configurable_options?.length ?? 0
  const items = options.slice(0, typeProduct?.configurable_options?.length ?? 0)

  const allOptionsComplete = items.length === optionCount

  const combinationNotAvailable =
    allOptionsComplete && !typeProduct.configurable_product_options_selection?.variant

  return (
    <Box width='100%'>
      <AddProductsToCartButton {...props} disabled={combinationNotAvailable} />
      {combinationNotAvailable && !formState.isSubmitting && (
        <Box
          sx={{
            color: 'error.main',
            typography: 'body2',
            textAlign: 'center',
            mt: '6px',
            lineHeight: 1,
            marginBottom: `calc(-1em - 6px)`,
          }}
        >
          <Trans id='The selected option combination is not available' />
        </Box>
      )}
    </Box>
  )
}
