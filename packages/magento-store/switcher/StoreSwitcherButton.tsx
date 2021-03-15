import { useQuery } from '@apollo/client'
import { makeStyles } from '@material-ui/core'
import Button from '@reachdigital/next-ui/Button'
import FlagAvatar from '@reachdigital/next-ui/FlagAvatar'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import React from 'react'
import { StoreConfigDocument } from '../StoreConfig.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    avatar: {
      height: 25,
      width: 25,
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
    <PageLink href='/switch-stores'>
      <Button variant='pill' size='medium'>
        <FlagAvatar country={country} classes={{ root: classes.avatar }} />
        {config.data?.storeConfig?.store_name} - {config.data?.storeConfig?.base_currency_code}
      </Button>
    </PageLink>
  )
}
