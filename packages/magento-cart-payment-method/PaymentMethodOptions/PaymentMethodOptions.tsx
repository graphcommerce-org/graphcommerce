import { extendableComponent } from '@graphcommerce/next-ui'
import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import type { PaymentMethodOptionsProps } from '../Api/PaymentMethod'
import { usePaymentMethodContext } from '../PaymentMethodContext/paymentMethodContextType'

const name = 'PaymentMethodOptions'
const parts = ['root'] as const
const { classes } = extendableComponent(name, parts)

export function PaymentMethodOptions(props: PaymentMethodOptionsProps & { sx?: SxProps<Theme> }) {
  const { sx = [], ...optionsProps } = props
  const { selectedMethod, selectedModule } = usePaymentMethodContext()

  return (
    <Box
      className={classes.root}
      sx={[(theme) => ({ marginBottom: theme.spacings.sm }), ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {selectedModule && selectedMethod && (
        <Box key={selectedMethod.code}>
          <selectedModule.PaymentOptions {...selectedMethod} {...optionsProps} />
        </Box>
      )}
    </Box>
  )
}
