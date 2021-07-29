import { AvailablePaymentMethod } from '@reachdigital/graphql'
import { ButtonProps } from '@reachdigital/next-ui/Button'
import { UseFormComposeOptions } from '@reachdigital/react-hook-form'
import React from 'react'
import { AvailablePaymentMethodFragment } from './AvailablePaymentMethod/AvailablePaymentMethod.gql'
import { PaymentMethodContextFragment } from './PaymentMethodContext.gql'
import { SelectedPaymentMethodFragment } from './SelectedPaymentMethod/SelectedPaymentMethod.gql'

export type PaymentMethod = Partial<AvailablePaymentMethodFragment> &
  Pick<AvailablePaymentMethod, 'code' | 'title'> & {
    child: string
    preferred?: boolean
    selected?: SelectedPaymentMethodFragment
  }

export type PaymentMethodOptionsProps = Pick<UseFormComposeOptions, 'step'> & {
  Container: React.FC
}
export type PaymentButtonProps = PaymentMethod & { buttonProps: ButtonProps }
export type PaymentOptionsProps = PaymentMethod & PaymentMethodOptionsProps

export type PaymentToggleProps = PaymentMethod
export type ExpandPaymentMethods = (
  available: AvailablePaymentMethodFragment,
  context: PaymentMethodContextFragment,
) => Promise<PaymentMethod[]> | PaymentMethod[]

export type PaymentPlaceOrderProps = PaymentMethod & Pick<UseFormComposeOptions, 'step'>

export interface PaymentModule {
  PaymentOptions: React.VFC<PaymentOptionsProps>
  PaymentPlaceOrder: React.VFC<PaymentPlaceOrderProps>
  PaymentButton?: React.VFC<PaymentButtonProps>
  PaymentToggle?: React.VFC<PaymentToggleProps>
  expandMethods?: ExpandPaymentMethods
}

export type PaymentMethodModules = { [code: string]: PaymentModule }
