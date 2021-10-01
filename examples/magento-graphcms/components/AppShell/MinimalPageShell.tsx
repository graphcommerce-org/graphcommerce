import { useQuery } from '@apollo/client'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { FullPageShellBaseProps } from '@graphcommerce/next-ui'
import MinimalPageShellBase from '@graphcommerce/next-ui/AppShell/MinimalPageShellBase'
import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react'
import { DefaultPageQuery } from '../GraphQL/DefaultPage.gql'
import Footer from './Footer'
import Logo from './Logo'

export type MinimalPageShellProps = Omit<DefaultPageQuery, 'pages'> &
  Omit<
    FullPageShellBaseProps,
    'menu' | 'logo' | 'actions' | 'classes' | 'name' | 'header' | 'footer'
  >

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
      footer={<Footer footer={footer} disableMargin />}
    >
      {children}
    </MinimalPageShellBase>
  )
}
