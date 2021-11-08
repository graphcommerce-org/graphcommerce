import { useQuery } from '@apollo/client'
import { FlagAvatar, UseStyles } from '@graphcommerce/next-ui'
import { Button, makeStyles } from '@material-ui/core'
import PageLink from 'next/link'
import React from 'react'
import { StoreConfigDocument } from '../StoreConfig.graphql'

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

export type StoreSwitcherButtonProps = UseStyles<typeof useStyles>

export default function StoreSwitcherButton(props) {
  const config = useQuery(StoreConfigDocument)
  const country = config.data?.storeConfig?.store_code?.split('_')?.[1]?.toLowerCase() ?? ''

  const classes = useStyles(props)
  return (
    <PageLink href='/switch-stores' passHref>
      <Button variant='text' size='medium'>
        <FlagAvatar country={country} classes={{ root: classes.avatar }} />
        {config.data?.storeConfig?.store_name} - {config.data?.storeConfig?.base_currency_code}
      </Button>
    </PageLink>
  )
}
