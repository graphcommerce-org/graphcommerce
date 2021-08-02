import { makeStyles, Theme } from '@material-ui/core'
import { AnimatedRow } from '@reachdigital/next-ui'
import { AnimatePresence } from 'framer-motion'
import { PaymentMethodOptionsProps } from '../Api/PaymentMethod'
import { usePaymentMethodContext } from '../PaymentMethodContext/PaymentMethodContext'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      '& > div': {
        padding: theme.spacings.sm,
        background: `${theme.palette.secondary.main}12`,
      },
    },
  }),
  { name: 'PaymentMethodOptions' },
)

export default function PaymentMethodOptions(props: PaymentMethodOptionsProps) {
  const { selectedMethod, selectedModule } = usePaymentMethodContext()
  const classes = useStyles()

  return (
    <AnimatePresence initial={false}>
      {selectedModule && selectedMethod && (
        <AnimatedRow key={selectedMethod.code} className={classes.root}>
          <selectedModule.PaymentOptions {...selectedMethod} {...props} />
        </AnimatedRow>
      )}
    </AnimatePresence>
  )
}
