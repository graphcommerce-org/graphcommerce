import { Color } from '@material-ui/lab'
import { ButtonProps } from '@reachdigital/next-ui/Button'
import React from 'react'
import { AvailablePaymentMethodFragment } from './Api/AvailablePaymentMethod/AvailablePaymentMethod.gql'
import { PaymentMethodRequestedFragment } from './Api/PaymentMethodRequested.gql'

export type PaymentMethod = AvailablePaymentMethodFragment & {
  child: string
  preferred?: boolean
}

export type PaymentError = { message: React.ReactNode; severity?: Color }

export type OnPaymentStart = () => void
export type OnPaymentError = (error: PaymentError) => void
export type OnPaymentComplete = (message?: React.ReactNode) => void

type PaymentEventHandlers = {
  /** Disable forms and place shroud over page */
  onPaymentStart: OnPaymentStart
  /** Removes the shroud, enables the forms, renders error if provided */
  onPaymentError: OnPaymentError
  /** Calls the placeorder method and redirects to the checkout/success page */
  onPaymentComplete: OnPaymentComplete
}

export type PaymentButtonProps = PaymentMethod & PaymentEventHandlers & { buttonProps: ButtonProps }
export type PaymentOptionsProps = PaymentMethod
export type PaymentToggleProps = PaymentMethod

export interface PaymentModule {
  PaymentOptions?: React.VFC<PaymentOptionsProps>
  PaymentButton?: React.VFC<PaymentButtonProps>
  PaymentToggle?: React.VFC<PaymentToggleProps>
  expandMethods?: ExpandPaymentMethods
}

export type PaymentMethodModules = { [code: string]: PaymentModule }

export type ExpandPaymentMethods = (
  available: AvailablePaymentMethodFragment,
) => Promise<PaymentMethod[]> | PaymentMethod[]
