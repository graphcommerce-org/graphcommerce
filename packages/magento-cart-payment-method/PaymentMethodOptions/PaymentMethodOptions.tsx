import { AnimatedRow, extendableComponent } from '@graphcommerce/next-ui'
import { Box, SxProps, Theme } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import { PaymentMethodOptionsProps } from '../Api/PaymentMethod'
import { usePaymentMethodContext } from '../PaymentMethodContext/PaymentMethodContext'

const name = 'PaymentMethodOptions' as const
const parts = ['root'] as const
const { classes } = extendableComponent(name, parts)

export default function PaymentMethodOptions(
  props: PaymentMethodOptionsProps & { sx?: SxProps<Theme> },
) {
  const { sx = [], ...optionsProps } = props
  const { selectedMethod, selectedModule } = usePaymentMethodContext()

  return (
    <Box
      className={classes.root}
      sx={[(theme) => ({ marginBottom: theme.spacings.sm }), ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <AnimatePresence initial={false}>
        {selectedModule && selectedMethod && (
          <AnimatedRow key={selectedMethod.code}>
            <selectedModule.PaymentOptions {...selectedMethod} {...optionsProps} />
          </AnimatedRow>
        )}
      </AnimatePresence>
    </Box>
  )
}
