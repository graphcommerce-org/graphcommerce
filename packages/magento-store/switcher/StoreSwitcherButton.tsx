import { useQuery } from '@apollo/client'
import { Button, makeStyles } from '@material-ui/core'
import FlagAvatar from '@reachdigital/next-ui/FlagAvatar'
import PageLink from 'next/link'
import React from 'react'
import { StoreConfigDocument } from '../StoreConfig.gql'

const useStyles = makeStyles(
  () => ({
    avatar: {
      height: 20,
      width: 20,
      marginRight: 10,
    },
  }),
  { name: 'StoreSwitcherButton' },
)

export default function StoreSwitcherButton() {
  const config = useQuery(StoreConfigDocument)
  const country = config.data?.storeConfig?.locale?.split('_')?.[1].toLowerCase() ?? ''
  const classes = useStyles()
  return (
    <PageLink href='/switch-stores' passHref>
      <Button variant='text' size='medium'>
        <FlagAvatar country={country} classes={{ root: classes.avatar }} />
        {config.data?.storeConfig?.store_name} - {config.data?.storeConfig?.base_currency_code}
      </Button>
    </PageLink>
  )
}
