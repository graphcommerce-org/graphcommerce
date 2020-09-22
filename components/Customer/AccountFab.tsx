import { Badge, Fab, makeStyles, NoSsr, Theme } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/PersonOutline'
import useNavigationSection from 'components/useNavigationSection'
import { useCustomerTokenQuery } from 'generated/apollo'
import React from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  colorError: {
    backgroundColor: theme.palette.grey['500'],
  },
}))

export default function CustomerFab() {
  const classes = useStyles()
  const { isInSection, toggleSection } = useNavigationSection('/account')
  const { data } = useCustomerTokenQuery()

  const fab = (
    <Fab
      aria-label={isInSection ? 'Close Account' : 'Open Account'}
      size='medium'
      onClick={toggleSection}
    >
      <PersonIcon />
    </Fab>
  )

  return (
    <NoSsr fallback={fab}>
      <Badge
        badgeContent={data?.customerToken?.token ? 1 : 0}
        color={data?.customerToken?.valid ? 'primary' : 'error'}
        overlap='circle'
        variant='dot'
        classes={classes}
      >
        {fab}
      </Badge>
    </NoSsr>
  )
}
