import { Color } from '@material-ui/lab'
import { ButtonProps } from '@reachdigital/next-ui/Button'
import { ClientCartQuery } from '../ClientCart.gql'
import { AvailablePaymentMethodFragment } from './AvailablePaymentMethod.gql'

export type PaymentMethod = AvailablePaymentMethodFragment & {
  child: string
  preferred?: boolean
}

export type PaymentError = { message: React.ReactNode; severity?: Color }

type PaymentEventHandlers = {
  /** Disable forms and place shroud over page */
  onPaymentStart: () => void
  /** Removes the shroud, enables the forms, renders error if provided */
  onPaymentError: (error: PaymentError) => void
  /** Calls the placeorder method and redirects to the checkout/success page */
  onPaymentComplete: (message?: React.ReactNode) => void
}

export type PaymentButtonProps = PaymentMethod & PaymentEventHandlers & ButtonProps
export type PaymentOptionsProps = PaymentMethod

export interface PaymentModule {
  PaymentOptions?: React.VFC<PaymentOptionsProps>
  PaymentButton: React.VFC<PaymentButtonProps>
  expandMethods?: ExpandPaymentMethods
}

export type PaymentMethodModules = { [code: string]: PaymentModule }

export type ExpandPaymentMethods = (
  method: AvailablePaymentMethodFragment,
  cart: ClientCartQuery['cart'],
) => Promise<PaymentMethod[]> | PaymentMethod[]
