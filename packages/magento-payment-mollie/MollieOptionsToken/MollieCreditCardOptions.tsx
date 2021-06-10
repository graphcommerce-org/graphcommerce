import { useFormGqlMutationCart } from '@reachdigital/magento-cart'
import { PaymentOptionsProps } from '@reachdigital/magento-cart-payment-method'
import Form from '@reachdigital/next-ui/Form'
import FormRow from '@reachdigital/next-ui/Form/FormRow'
import { useFormCompose, useFormPersist } from '@reachdigital/react-hook-form'
import Script from 'next/experimental-script'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ComponentHandler, Mollie, MollieInstance } from '../Mollie'
import { SetMolliePaymentMethodTokenOnCartDocument } from '../MollieOptionsIssuer/SetMolliePaymentMethodIssuerOnCart copy.gql'
import MollieField from './MollieField'

type MollieContext =
  | (MollieInstance & {
      cardHolder: ComponentHandler
      cardNumber: ComponentHandler
      expiryDate: ComponentHandler
      verificationCode: ComponentHandler
    })
  | undefined
const mollieContext = React.createContext<MollieContext>(undefined)

export function useMollieContext() {
  return useContext(mollieContext)
}

export default function MollieCreditCardOptions(props: PaymentOptionsProps) {
  const { mollie_available_issuers = [], mollie_meta } = props
  const { code, step, Container } = props
  const [loaded, setLoaded] = useState<boolean>(false)
  const [mollie, setMollie] = useState<MollieContext>(undefined)

  const form = useFormGqlMutationCart(SetMolliePaymentMethodTokenOnCartDocument, {
    mode: 'onChange',
    defaultValues: { code },
  })

  const { handleSubmit } = form
  const submit = handleSubmit(() => {})

  useFormPersist({ form, name: `PaymentMethodOptions_${code}` })
  useFormCompose({ form, step, submit, key: `PaymentMethodOptions_${code}` })

  useEffect(() => {
    // @ts-expect-error window.Mollie is not defined in TS
    if (!window.Mollie || mollie) return

    // @ts-expect-error window.Mollie is not defined in TS
    const mollieInstance = (window.Mollie as Mollie)('pfl_Ah5xUV4c6z', {
      locale: 'nl_NL',
      testmode: true,
    })

    setMollie({
      ...mollieInstance,
      cardHolder: mollieInstance.createComponent('cardHolder'),
      cardNumber: mollieInstance.createComponent('cardNumber'),
      expiryDate: mollieInstance.createComponent('expiryDate'),
      verificationCode: mollieInstance.createComponent('verificationCode'),
    })
  }, [loaded, mollie])

  return (
    <Container>
      <Script src='https://js.mollie.com/v1/mollie.js' onLoad={() => setLoaded(true)} />
      <mollieContext.Provider value={mollie}>
        <form onSubmit={submit} noValidate>
          <FormRow>
            <MollieField
              name='cardNumber'
              variant='outlined'
              label='Credit Card Number'
              form={form}
            />
          </FormRow>
          <FormRow>
            <MollieField
              name='cardHolder'
              variant='outlined'
              label='Credit Card Holder'
              form={form}
            />
          </FormRow>
          <FormRow>
            <MollieField name='expiryDate' variant='outlined' label='Expiration Date' form={form} />
          </FormRow>
          <FormRow>
            <MollieField
              name='verificationCode'
              variant='outlined'
              label='Verification Code'
              form={form}
            />
          </FormRow>
        </form>
      </mollieContext.Provider>
    </Container>
  )
}
