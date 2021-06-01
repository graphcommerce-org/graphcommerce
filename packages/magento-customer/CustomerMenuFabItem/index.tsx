import { useQuery } from '@apollo/client'
import { Badge, makeStyles, NoSsr, Theme } from '@material-ui/core'
import MenuFabSecondaryItem from '@reachdigital/next-ui/AppShell/MenuFabSecondaryItem'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconPersonAlt } from '@reachdigital/next-ui/icons'
import React from 'react'
import { CustomerTokenDocument, CustomerTokenQuery } from '../CustomerToken.gql'

const useStyles = makeStyles((theme: Theme) => ({
  colorError: {
    backgroundColor: theme.palette.grey['500'],
  },
}))

type CustomerMenuFabItemProps = CustomerTokenQuery & {
  icon?: React.ReactNode
  children: React.ReactNode
  authHref: string
  guestHref: string
} & UseStyles<typeof useStyles>

function CustomerMenuFabItemContent(props: CustomerMenuFabItemProps) {
  const { customerToken, icon, children, guestHref, authHref } = props
  const classes = useStyles(props)
  const requireAuth = Boolean(!customerToken || !customerToken.valid)

  return (
    <MenuFabSecondaryItem
      icon={
        <Badge
          badgeContent={customerToken?.token ? 1 : 0}
          color={customerToken?.valid ? 'primary' : 'error'}
          variant='dot'
          classes={{ colorError: classes.colorError }}
        >
          {icon ?? <SvgImage src={iconPersonAlt} size='small' alt='Account' />}
        </Badge>
      }
      href={requireAuth ? guestHref : authHref}
    >
      {children}
    </MenuFabSecondaryItem>
  )
}

export default function CustomerMenuFabItem(props: CustomerMenuFabItemProps) {
  const { data } = useQuery(CustomerTokenDocument)

  return (
    <NoSsr fallback={<CustomerMenuFabItemContent {...props} />}>
      <CustomerMenuFabItemContent customerToken={data?.customerToken} {...props} />
    </NoSsr>
  )
}
