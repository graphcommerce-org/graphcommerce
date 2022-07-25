import {
  ProductAddToCartButton,
  ProductAddToCartButtonProps,
  useFormProductAddToCart,
} from '@graphcommerce/magento-product'
import { Trans } from '@lingui/react'
import { Box } from '@mui/material'
import { useConfigurableTypeProduct } from '../../hooks/useConfigurableTypeProduct'

export function ConfigurableAddToCartButton(props: ProductAddToCartButtonProps) {
  const typeProduct = useConfigurableTypeProduct()
  const form = useFormProductAddToCart()

  const formVal = form.watch('selectedOptions') ?? []
  const options = Array.isArray(formVal) ? formVal : [formVal]
  const items = options.slice(0, typeProduct?.configurable_options?.length ?? 0)

  const partial = items.every((item) => item !== undefined)
  const combinationNotAvailable =
    partial && !typeProduct.configurable_product_options_selection?.variant

  return (
    <Box width='100%'>
      <ProductAddToCartButton {...props} disabled={combinationNotAvailable} />
      {combinationNotAvailable && (
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
