import { IconButton, makeStyles, Theme } from '@material-ui/core'
import CustomerFab from '@reachdigital/magento-customer/AccountFab'
import SearchButton from '@reachdigital/magento-search/SearchButton'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    actions: {
      '& > *': {
        pointerEvents: 'all',
      },
      display: 'none',
      [theme.breakpoints.up('md')]: {
        alignItems: 'center',
        display: 'grid',
        gridAutoFlow: 'column',
        columnGap: responsiveVal(4, 16),
      },
    },
    spacer: {
      width: 48,
    },
  }),
  { name: 'HeaderActions' },
)

export default function HeaderActions() {
  const classes = useStyles()
  return (
    <div className={classes.actions}>
      <SearchButton />
      <PageLink href='/faq/index'>
        <IconButton aria-label='Account' color='inherit' size='medium'>
          <img
            src='/icons/desktop_customer_service.svg'
            alt='account'
            width={32}
            height={32}
            loading='eager'
          />
        </IconButton>
      </PageLink>

      <CustomerFab>
        <img
          src='/icons/desktop_account.svg'
          alt='account'
          width={32}
          height={32}
          loading='eager'
        />
      </CustomerFab>
      <div className={classes.spacer} />
    </div>
  )
}
