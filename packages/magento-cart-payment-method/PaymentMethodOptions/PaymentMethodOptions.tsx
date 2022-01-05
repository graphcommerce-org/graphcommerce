import { AnimatedRow } from '@graphcommerce/next-ui'
import { Theme } from '@mui/material'
import { makeStyles } from '@graphcommerce/next-ui'
import { AnimatePresence } from 'framer-motion'
import { PaymentMethodOptionsProps } from '../Api/PaymentMethod'
import { usePaymentMethodContext } from '../PaymentMethodContext/PaymentMethodContext'

const useStyles = makeStyles({ name: 'PaymentMethodOptions' })((theme) => ({
  root: {
    marginBottom: theme.spacings.sm,
  },
}))

export default function PaymentMethodOptions(props: PaymentMethodOptionsProps) {
  const { selectedMethod, selectedModule } = usePaymentMethodContext()
  const { classes } = useStyles()

  return (
    <div className={classes.root}>
      <AnimatePresence initial={false}>
        {selectedModule && selectedMethod && (
          <AnimatedRow key={selectedMethod.code}>
            <selectedModule.PaymentOptions {...selectedMethod} {...props} />
          </AnimatedRow>
        )}
      </AnimatePresence>
    </div>
  )
}
