import { Link } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import PageLink from 'next/link'
import React from 'react'
import useBackLink from '../../../../../packages/framer-next-pages/hooks/useBackLink'
import MinimalPageShell, {
  MinimalPageShellProps,
} from '../../../components/AppShell/MinimalPageShell'

function useBackLinkDemo() {
  const pageLink = useBackLink({ href: '/test/usebacklink' })

  return (
    <PageLink {...pageLink} passHref>
      <Link color='primary'>Link</Link>
    </PageLink>
  )
}

const pageOptions: PageOptions<MinimalPageShellProps> = {
  SharedComponent: MinimalPageShell,
}
useBackLinkDemo.pageOptions = pageOptions

export default useBackLinkDemo
