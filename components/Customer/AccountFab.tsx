import { Badge, Fab, NoSsr } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/PersonOutline'
import useNavigationSection from 'components/useNavigationSection'
import { useCustomerQuery } from 'generated/apollo'
import React from 'react'

export default function CustomerFab() {
  const { isInSection, toggleSection } = useNavigationSection('/account')
  const { data } = useCustomerQuery({ fetchPolicy: 'cache-only' })

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
        badgeContent={data?.customer?.firstname?.slice(0, 1) || 0}
        color='primary'
        overlap='circle'
        variant='dot'
      >
        {fab}
      </Badge>
    </NoSsr>
  )
}
