import { useQuery } from '@apollo/client'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIosSharp'
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill'
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined'
import { ToggleButton } from '@material-ui/lab'
import { CustomerTokenDocument } from '@reachdigital/magento-customer/CustomerToken.gql'
import Money from '@reachdigital/magento-store/Money'
import useFormStyles from '@reachdigital/next-ui/AnimatedForm/useFormStyles'
import Button from '@reachdigital/next-ui/Button'
import ToggleButtonGroup from '@reachdigital/next-ui/ToggleButtonGroup'
import { Controller, useMutationForm } from '@reachdigital/next-ui/useMutationForm'
import React, { useMemo, useRef, useState } from 'react'
import { CartDocument } from '../Cart.gql'
import { ShippingMethodFormDocument } from './operation/ShippingMethodForm.gql'

export default function ShippingMethodForm() {
  const classes = useFormStyles()
  const { data: cartQuery } = useQuery(CartDocument)

  const currentAddress = cartQuery?.cart?.shipping_addresses?.[0]
  const available = currentAddress?.available_shipping_methods
  const selected = currentAddress?.selected_shipping_method
  const defaultCarrier = selected?.carrier_code ?? available?.[0]?.carrier_code
  const defaultMethod = selected?.method_code ?? available?.[0]?.method_code ?? undefined
  const carrierMethod =
    defaultCarrier && defaultMethod ? `${defaultCarrier}-${defaultMethod}` : undefined

  const mutationForm = useMutationForm(ShippingMethodFormDocument, {
    defaultValues: {
      cartId: cartQuery?.cart?.id,
      method: carrierMethod,
    },
    onBeforeSubmit: (variables) => {
      const [carrier, method] = variables.method.split('-')
      return { ...variables, carrier, method }
    },
  })
  const { register, errors, handleSubmit, Field, control, formState, watch } = mutationForm

  if (!currentAddress) return null

  return (
    <form onSubmit={handleSubmit} noValidate className={classes.form}>
      <div className={classes.formRow}>
        <Field
          Component={Controller}
          control={control}
          name='method'
          rules={{ required: true }}
          render={({ onChange, name, value, onBlur }) => {
            return (
              <ToggleButtonGroup
                aria-label='text formatting'
                onChange={(_, val) => onChange(val)}
                onBlur={onBlur}
                value={value}
                defaultValue={carrierMethod}
                exclusive
                size='large'
              >
                {currentAddress.available_shipping_methods?.map((m) => (
                  <ToggleButton
                    key={`${m?.carrier_code}-${m?.method_code}`}
                    value={`${m?.carrier_code}-${m?.method_code}`}
                  >
                    {m?.carrier_title} - {m?.method_title}
                    {m?.amount.value === 0 ? 'FREE' : <Money {...m?.amount} />}
                  </ToggleButton>
                ))}
                <ToggleButton value='bold' aria-label='bold'>
                  <FormatColorFillIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            )
          }}
        />
      </div>
      <Button
        type='submit'
        disabled={formState.isSubmitting}
        color='secondary'
        variant='pill'
        size='large'
      >
        Next <ArrowForwardIos fontSize='inherit' />
      </Button>
      {errors.submission?.message}
    </form>
  )
}
