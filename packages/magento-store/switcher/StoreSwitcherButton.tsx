import { useQuery } from '@apollo/client'
import Button from '@reachdigital/next-ui/Button'
import FlagAvatar from '@reachdigital/next-ui/FlagAvatar'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import React from 'react'
import { StoreConfigDocument } from '../StoreConfig.gql'

export default function StoreSwitcherButton() {
  const config = useQuery(StoreConfigDocument)

  return (
    <PageLink href='/switch-stores'>
      <Button variant='pill' size='medium'>
        <FlagAvatar flagSrc={config.data?.storeConfig?.locale} />
        {config.data?.storeConfig?.store_name} - {config.data?.storeConfig?.base_currency_code}
      </Button>
    </PageLink>
  )
}
