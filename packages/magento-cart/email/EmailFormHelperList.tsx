import { useQuery } from '@apollo/client'
import { CustomerTokenDocument } from '@reachdigital/magento-customer/CustomerToken.gql'
import AnimatedRow from '@reachdigital/next-ui/AnimatedRow'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import React from 'react'

export default function EmailFormHelperList() {
  const { data: tokenData } = useQuery(CustomerTokenDocument)
  const formClasses = useFormStyles()

  return (
    <>
      {!tokenData?.customerToken && (
        <AnimatedRow key='helper-list'>
          <ul className={formClasses.helperList} key='steps'>
            <li>E-mail address of existing customers will be recognized, sign in is optional.</li>
            <li>Fill in password fields to create an account.</li>
            <li>Leave passwords fields empty to order as guest.</li>
          </ul>
        </AnimatedRow>
      )}
    </>
  )
}
