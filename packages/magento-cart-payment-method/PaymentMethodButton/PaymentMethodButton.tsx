import { useApolloClient, useQuery } from '@apollo/client'
import { ErrorResponse } from '@apollo/client/link/error'
import { CurrentCartIdDocument } from '@reachdigital/magento-cart/CurrentCartId/CurrentCartId.gql'
import { useCartQuery } from '@reachdigital/magento-cart/CurrentCartId/useCartQuery'
import Button, { ButtonProps } from '@reachdigital/next-ui/Button'
import { useFormGqlMutation } from '@reachdigital/react-hook-form'
import { useRouter } from 'next/router'
import React from 'react'
import { OnPaymentComplete, OnPaymentError, OnPaymentStart } from '../PaymentMethod'
import { usePaymentMethodContext } from '../PaymentMethodContext/PaymentMethodContext'
import { PaymentMethodButtonDocument } from './PaymentMethodButton.gql'

export type PaymentMethodButtonProps = ButtonProps

export default function PaymentMethodButton(props: PaymentMethodButtonProps) {
  const {
    selectedMethod,
    selectedModule,
    setError,
    setLoading,
    loading,
  } = usePaymentMethodContext()

  const client = useApolloClient()
  const router = useRouter()
  const sadf = useFormGqlMutation(PaymentMethodButtonDocument)
  const cartId = useQuery(CurrentCartIdDocument, { ssr: false }).data?.currentCartId?.id

  const onPaymentStart: OnPaymentStart = () => {
    setLoading(true)
  }
  const onPaymentComplete: OnPaymentComplete = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      try {
        if (!cartId) return
        await client.mutate({
          mutation: PaymentMethodButtonDocument,
          variables: { cartId },
        })

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push('checkout/review')
      } catch (e) {
        if (e.graphQLErrors) {
          const error = e as ErrorResponse
          const message =
            error.graphQLErrors?.map((gqlError) => (
              <span key={gqlError.path?.join('')}>{gqlError.message}</span>
            )) ?? []

          const networkMessage = error.networkError?.message
          if (networkMessage)
            message.push(<span key={error.networkError?.name}>networkMessage</span>)

          setLoading(false)
          setError({ message: <>{message}</>, severity: 'error' })
        }
      }
    })()
  }
  const onPaymentError: OnPaymentError = (error) => {
    setLoading(false)
    setError(error)
  }

  const PaymentButton = selectedModule?.PaymentButton
  return (
    <>
      {!PaymentButton || !selectedMethod?.code ? (
        <Button {...props} />
      ) : (
        <PaymentButton
          {...selectedMethod}
          buttonProps={props}
          onPaymentStart={onPaymentStart}
          onPaymentComplete={onPaymentComplete}
          onPaymentError={onPaymentError}
        />
      )}
    </>
  )
}
