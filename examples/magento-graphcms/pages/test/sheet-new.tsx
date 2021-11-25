import { Sheet } from '@graphcommerce/framer-scroller-sheet'
import React from 'react'
import { AppBar, AppShellTitle, Title } from '@graphcommerce/next-ui'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { MinimalPageShellProps } from '../../components/AppShell/MinimalPageShell'
import SheetShell from '../../components/AppShell/SheetShell'
import { Box, Container } from '@material-ui/core'

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
