import { AnimatedRow } from '@graphcommerce/next-ui'
import { makeStyles, Theme } from '@material-ui/core'
import { AnimatePresence } from 'framer-motion'
import { PaymentMethodOptionsProps } from '../Api/PaymentMethod'
import { usePaymentMethodContext } from '../PaymentMethodContext/PaymentMethodContext'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      marginBottom: theme.spacings.sm,
    },
  }),
  { name: 'PaymentMethodOptions' },
)

export default function PaymentMethodOptions(props: PaymentMethodOptionsProps) {
  const { selectedMethod, selectedModule } = usePaymentMethodContext()
  const classes = useStyles()

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
