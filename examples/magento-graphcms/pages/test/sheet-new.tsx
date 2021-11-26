import { PageOptions } from '@graphcommerce/framer-next-pages'
import { AppBar, AppShellTitle, Title } from '@graphcommerce/next-ui'
import { Box, Container } from '@material-ui/core'
import React from 'react'
import { MinimalPageShellProps } from '../../components/AppShell/MinimalPageShell'
import SheetShell from '../../components/AppShell/SheetShell'

export default function SheetNew() {
  return (
    <>
      <AppBar floatingMd={false}>
        <Title size='small'>New sheet</Title>
      </AppBar>

      <AppShellTitle>New Sheet</AppShellTitle>
      <Container maxWidth='md'>
        <Box width='100%' height='2000px' bgcolor='#efefef'></Box>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<MinimalPageShellProps> = {
  SharedComponent: SheetShell,
}

SheetNew.pageOptions = pageOptions
