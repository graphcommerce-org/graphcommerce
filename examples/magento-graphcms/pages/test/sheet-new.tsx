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
      <Container maxWidth='md' style={{ paddingBottom: 20 }}>
        <Box
          width='100%'
          height='4000px'
          style={{
            backgroundImage:
              'linear-gradient(45deg, #cccccc 25%, transparent 25%), linear-gradient(-45deg, #cccccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #cccccc 75%), linear-gradient(-45deg, transparent 75%, #cccccc 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
          }}
        ></Box>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<MinimalPageShellProps> = {
  SharedComponent: SheetShell,
}

SheetNew.pageOptions = pageOptions
