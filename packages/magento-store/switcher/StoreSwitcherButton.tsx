import { useQuery } from '@apollo/client'
import { Avatar, makeStyles, Theme } from '@material-ui/core'
import Button from '@reachdigital/next-ui/Button'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import React from 'react'
import { StoreConfigDocument } from '../StoreConfig.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    avatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: theme.spacing(1),
    },
  }),
  { name: 'StoreSwitcherButton' },
)

export default function StoreSwitcherButton() {
  const config = useQuery(StoreConfigDocument)
  const classes = useStyles()

  const country = config.data?.storeConfig?.locale?.split('_')[1].toLowerCase()

  return (
    <PageLink href='/switch-stores'>
      <Button variant='pill' size='medium'>
        <Avatar
          className={classes.avatar}
          alt={country}
          src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/${country}.svg`}
        />
        {config.data?.storeConfig?.store_name} - {config.data?.storeConfig?.base_currency_code}
      </Button>
    </PageLink>
  )
}
