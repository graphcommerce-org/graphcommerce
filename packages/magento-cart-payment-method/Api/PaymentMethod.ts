import { ApolloClient } from '@graphcommerce/graphql'
import { ActionCardProps, LinkOrButtonProps } from '@graphcommerce/next-ui'
import { UseFormComposeOptions } from '@graphcommerce/react-hook-form'
import React from 'react'
import { AvailablePaymentMethodFragment } from './AvailablePaymentMethod/AvailablePaymentMethod.gql'
import { PaymentMethodContextFragment } from './PaymentMethodContext.gql'
import { SelectedPaymentMethodFragment } from './SelectedPaymentMethod/SelectedPaymentMethod.gql'

export type PaymentMethod = Partial<AvailablePaymentMethodFragment> &
  Pick<AvailablePaymentMethodFragment, 'code' | 'title'> & {
    child: string
    preferred?: boolean
    selectedPm?: SelectedPaymentMethodFragment
  }

export type PaymentMethodOptionsProps = Pick<UseFormComposeOptions, 'step'> & {
  Container: React.FC<{ children?: React.ReactNode }>
}
export type PaymentButtonProps = PaymentMethod & { buttonProps: LinkOrButtonProps }
export type PaymentOptionsProps = PaymentMethod & PaymentMethodOptionsProps

export type PaymentHandlerProps = { code: string }

export type ExpandPaymentMethodsContext = Partial<PaymentMethodContextFragment> & {
  client: ApolloClient<object>
}

export type ExpandPaymentMethods = (
  available: AvailablePaymentMethodFragment,
  context: ExpandPaymentMethodsContext,
) => Promise<PaymentMethod[]> | PaymentMethod[]

export type PaymentPlaceOrderProps = PaymentMethod & Pick<UseFormComposeOptions, 'step'>

export type PaymentMethodActionCardProps = ActionCardProps & PaymentMethod

export interface PaymentModule {
  PaymentOptions: React.FC<PaymentOptionsProps>
  PaymentPlaceOrder: React.FC<PaymentPlaceOrderProps>
  PaymentButton?: React.FC<PaymentButtonProps>
  expandMethods?: ExpandPaymentMethods
  PaymentHandler?: React.FC<PaymentHandlerProps>
  PaymentActionCard?: React.FC<PaymentMethodActionCardProps>
}

export type PaymentMethodModules = { [code: string]: PaymentModule }
