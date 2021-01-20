import { makeStyles, Theme } from '@material-ui/core'
import CustomerFab from '@reachdigital/magento-customer/AccountFab'
import SearchButton from '@reachdigital/magento-search/SearchButton'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    actions: {
      '& > *': {
        pointerEvents: 'all',
        // marginLeft: ,
      },
      display: 'none',
      [theme.breakpoints.up('md')]: {
        alignItems: 'center',
        display: 'grid',
        gridAutoFlow: 'column',
        columnGap: responsiveVal(8, 16),
      },
    },
    spacer: {
      width: 44,
    },
  }),
  { name: 'HeaderActions' },
)

export default function HeaderActions() {
  const classes = useStyles()
  return (
    <div className={classes.actions}>
      <SearchButton />
      <CustomerFab
        icon={<img src='/icons/account.svg' alt='account' width={20} height={20} loading='eager' />}
      />
      <div className={classes.spacer} />
    </div>
  )
}
