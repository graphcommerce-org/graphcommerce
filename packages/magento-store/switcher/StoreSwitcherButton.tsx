import { useQuery } from '@apollo/client'
import { Avatar, makeStyles, Theme } from '@material-ui/core'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import React, { useEffect, useState } from 'react'
import { StoreConfigDocument } from '../StoreConfig.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      display: 'inline-block',
      marginRight: theme.spacing(1),
      position: 'relative',
      top: '6px',
    },
  }),
  { name: 'CountryFlag' },
)

export default function StoreSwitcherButton() {
  const [userLanguage, setUserLanguage] = useState('eu')
  const config = useQuery(StoreConfigDocument)
  const classes = useStyles()

  useEffect(() => {
    // Base the store language off of the browser language of the user or from account settings?
    const lang =
      config.data?.storeConfig?.locale || navigator.language || (navigator.languages || ['eu'])[0]
    setUserLanguage(lang.substring(3, 5).toLowerCase())
  }, [])

  return (
    <PageLink href='/switch-stores'>
      <span>
        <Avatar
          className={classes.small}
          alt={userLanguage}
          src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/${userLanguage}.svg`}
        />
        {config.data?.storeConfig?.store_name} - {config.data?.storeConfig?.base_currency_code}
      </span>
    </PageLink>
  )
}
