import { extendableComponent, sxx } from '@graphcommerce/next-ui'
import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import type { PaymentMethodOptionsProps } from '../Api/PaymentMethod'
import { usePaymentMethodContext } from '../PaymentMethodContext/paymentMethodContextType'

const name = 'PaymentMethodOptions'
const parts = ['root'] as const
const { classes } = extendableComponent(name, parts)

/**
 * @deprecated
 * @public
 */
export function PaymentMethodOptions(props: PaymentMethodOptionsProps & { sx?: SxProps<Theme> }) {
  const { sx = [], ...optionsProps } = props
  const { selectedMethod, selectedModule } = usePaymentMethodContext()

  return (
    <Box className={classes.root} sx={sxx((theme) => ({ marginBottom: theme.spacings.sm }), sx)}>
      {selectedModule && selectedMethod && (
        <Box key={selectedMethod.code}>
          <selectedModule.PaymentOptions {...selectedMethod} {...optionsProps} />
        </Box>
      )}
    </Box>
  )
}
