import { useFormGqlMutationCart } from '@reachdigital/magento-cart'
import { PaymentOptionsProps } from '@reachdigital/magento-cart-payment-method'
import { useFormCompose, useFormPersist } from '@reachdigital/react-hook-form'
import Script from 'next/experimental-script'
import React, { useEffect, useRef, useState } from 'react'
import { Mollie, MollieInstance } from '../Mollie'
import { SetMolliePaymentMethodTokenOnCartDocument } from '../MollieOptionsIssuer/SetMolliePaymentMethodIssuerOnCart copy.gql'
import MollieField from './MollieField'

export default function MollieCreditCardOptions(props: PaymentOptionsProps) {
  const { mollie_available_issuers = [], mollie_meta } = props
  const { code, step, Container } = props
  const [loaded, setLoaded] = useState<boolean>(false)
  const [mollie, setMollie] = useState<MollieInstance>(null)

  const form = useFormGqlMutationCart(SetMolliePaymentMethodTokenOnCartDocument, {
    mode: 'onChange',
    defaultValues: { code },
  })

  const { handleSubmit } = form
  const submit = handleSubmit(() => {})

  useFormPersist({ form, name: `PaymentMethodOptions_${code}` })
  useFormCompose({ form, step, submit, key: `PaymentMethodOptions_${code}` })

  useEffect(() => {
    if (!window.Mollie) return

    setMollie(
      (window.Mollie as Mollie)('pfl_Ah5xUV4c6z', {
        locale: 'nl_NL',
        testmode: true,
      }),
    )
  }, [loaded])

  return (
    <Container>
      <Script src='https://js.mollie.com/v1/mollie.js' onLoad={() => setLoaded(true)} />
      <form onSubmit={submit} noValidate>
        <MollieField component='cardNumber' mollie={mollie} />
        <MollieField component='cardHolder' mollie={mollie} />
        <MollieField component='expiryDate' mollie={mollie} />
        <MollieField component='verificationCode' mollie={mollie} />

        <button type='button'>Pay</button>
      </form>
    </Container>
  )
}
