import { useQuery } from '@apollo/client'
import { Alert } from '@material-ui/lab'
import { useFormGqlMutationCart } from '@reachdigital/magento-cart'
import { PaymentOptionsProps } from '@reachdigital/magento-cart-payment-method'
import FormRow from '@reachdigital/next-ui/Form/FormRow'
import { useFormCompose } from '@reachdigital/react-hook-form'
import Script from 'next/script'
import React, { useEffect, useState } from 'react'
import { StoreConfigDocument } from '../../magento-store'
import { Mollie } from '../Mollie'
import MollieField from './MollieField'
import { SetMolliePaymentMethodTokenOnCartDocument } from './SetMolliePaymentMethodTokenOnCart.gql'
import { mollieContext, MollieContext } from './mollieContext'

export default function MollieCreditCardOptions(props: PaymentOptionsProps) {
  const { code, step, Container } = props
  const [loaded, setLoaded] = useState<boolean>(false)
  const [mollie, setMollie] = useState<MollieContext>(undefined)
  const conf = useQuery(StoreConfigDocument)

  const form = useFormGqlMutationCart(SetMolliePaymentMethodTokenOnCartDocument, {
    mode: 'onChange',
    defaultValues: { code },
    onBeforeSubmit: async (variables) => {
      const result = await mollie?.createToken()

      if (!result?.token || result?.error) {
        throw Error(`Error while requesting token`)
      }

      return { ...variables, token: result.token }
    },
  })

  const { handleSubmit, formState } = form

  const submit = handleSubmit(() => {})

  useFormCompose({ form, step, submit, key: `PaymentMethodOptions_${code}` })

  useEffect(() => {
    // @ts-expect-error window.Mollie is not defined in TS
    if (!window.Mollie || mollie) return

    // @ts-expect-error window.Mollie is not defined in TS
    const mollieInstance = (window.Mollie as Mollie)('pfl_Ah5xUV4c6z', {
      locale: conf.data?.storeConfig?.locale ?? 'en_US',
      testmode: true,
    })

    setMollie({
      ...mollieInstance,
      cardHolder: mollieInstance.createComponent('cardHolder'),
      cardNumber: mollieInstance.createComponent('cardNumber'),
      expiryDate: mollieInstance.createComponent('expiryDate'),
      verificationCode: mollieInstance.createComponent('verificationCode'),
    })
  }, [conf.data?.storeConfig?.locale, loaded, mollie])

  return (
    <Container>
      <Script src='https://js.mollie.com/v1/mollie.js' onLoad={() => setLoaded(true)} />
      <mollieContext.Provider value={mollie}>
        <form onSubmit={submit} noValidate>
          <FormRow>
            <MollieField
              name='cardNumber'
              variant='outlined'
              label='Card number'
              isSubmitted={formState.isSubmitted}
            />
          </FormRow>
          <FormRow>
            <MollieField
              name='cardHolder'
              variant='outlined'
              label='Card holder'
              isSubmitted={formState.isSubmitted}
            />
          </FormRow>
          <FormRow>
            <MollieField
              name='expiryDate'
              variant='outlined'
              label='Expiry date'
              isSubmitted={formState.isSubmitted}
            />
            <MollieField
              name='verificationCode'
              variant='outlined'
              label='Verification code'
              isSubmitted={formState.isSubmitted}
            />
          </FormRow>

          {formState.submitCount === 0 && (
            <Alert severity='warning' variant='filled'>
              Todo: form needs to be submitted twice
            </Alert>
          )}
        </form>
      </mollieContext.Provider>
    </Container>
  )
}
