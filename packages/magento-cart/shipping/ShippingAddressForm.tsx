import { useQuery } from '@apollo/client'
import { Button } from '@material-ui/core'
import { CustomerDocument } from '@reachdigital/magento-customer/Customer.gql'
import { CustomerTokenDocument } from '@reachdigital/magento-customer/CustomerToken.gql'
import { IsEmailAvailableDocument } from '@reachdigital/magento-customer/IsEmailAvailable.gql'
import AnimatedRow from '@reachdigital/next-ui/AnimatedForm/AnimatedRow'
import useFormStyles from '@reachdigital/next-ui/AnimatedForm/useFormStyles'
import { useMutationForm } from '@reachdigital/next-ui/useMutationForm'
import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { CartDocument } from '../Cart.gql'
import { ShippingAddressFormDocument } from './ShippingAddressForm.gql'

export default function ShippingAddressForm() {
  const [expand, setExpand] = useState(false)
  const classes = useFormStyles()
  const { data: cartQuery } = useQuery(CartDocument)
  const { data: tokenQuery } = useQuery(CustomerTokenDocument)
  const { data: customerQuery } = useQuery(CustomerDocument, { fetchPolicy: 'cache-only' })
  const { data: emailQuery } = useQuery(IsEmailAvailableDocument, {
    fetchPolicy: 'cache-only',
    variables: { email: cartQuery?.cart?.email ?? '' },
  })
  const isCustomer = !!customerQuery?.customer

  const {
    register,
    errors,
    handleSubmit: onSubmit,
    required,
    loading,
    watch,
    formState,
  } = useMutationForm(ShippingAddressFormDocument)

  return (
    <>
      <AnimatedRow key='email' className={clsx(classes.form)}>
        <AnimatePresence>
          <AnimatedRow key='guest-email-form'>
            <div className={classes.formRow}>hoi</div>
          </AnimatedRow>
        </AnimatePresence>
      </AnimatedRow>
    </>
  )
}
