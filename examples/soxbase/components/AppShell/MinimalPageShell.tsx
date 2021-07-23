import { useQuery } from '@apollo/client'
import { makeStyles, Theme } from '@material-ui/core'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import { AppShellProvider, FullPageShellBaseProps } from '@reachdigital/next-ui'
import MinimalPageShellBase from '@reachdigital/next-ui/AppShell/FullPageShellBase'
import React from 'react'
import { DefaultPageQuery } from '../GraphQL/DefaultPage.gql'
import Logo from './Logo'

export type MinimalPageShellProps = Omit<DefaultPageQuery, 'pages'> &
  Omit<FullPageShellBaseProps, 'menu' | 'logo' | 'actions' | 'classes' | 'name'>

const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'unset',
    },
  },
}))

export default function MinimalPageShell(props: MinimalPageShellProps) {
  const { footer, menu, children, ...uiProps } = props
  const storeConfig = useQuery(StoreConfigDocument)
  const name = storeConfig.data?.storeConfig?.store_name ?? ''
  const classes = useStyles()

  return (
    <MinimalPageShellBase
      {...uiProps}
      name={name}
      header={<Logo classes={{ logo: classes.logo }} />}
    >
      {children}
      {/* <Footer footer={footer} /> */}
    </MinimalPageShellBase>
  )
}
