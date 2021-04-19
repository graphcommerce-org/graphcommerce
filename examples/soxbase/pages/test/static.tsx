import { Button, Container } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import PageLink from 'next/link'
import React from 'react'
import FullPageShell, { FullPageShellProps } from '../../components/AppShell/FullPageShell'

function TestStatic() {
  const title = `Testpage no GSP`

  return (
    <Container>
      <PageLink href='/test/index' passHref>
        <Button variant='outlined' color='secondary'>
          Index
        </Button>
      </PageLink>

      <PageLink href='/test/overlay/static' passHref>
        <Button variant='outlined' color='secondary'>
          Overlay static
        </Button>
      </PageLink>
    </Container>
  )
}

TestStatic.pageOptions = {
  SharedComponent: FullPageShell,
  sharedKey: () => 'page',
} as PageOptions

export default TestStatic
