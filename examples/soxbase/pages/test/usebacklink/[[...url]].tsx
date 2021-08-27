import { Link } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import useBackLink from '@reachdigital/framer-next-pages/hooks/useBackLink'
import PageLink from 'next/link'
import React from 'react'
import MinimalPageShell, {
  MinimalPageShellProps,
} from '../../../components/AppShell/MinimalPageShell'

function useBackLinkDemo() {
  const { href, onClick } = useBackLink({ href: '/test/usebacklink' })

  return (
    <>
      <PageLink href={href} passHref>
        <Link onClick={onClick} color='primary'>
          Link
        </Link>
      </PageLink>
      <PageLink href='/test/usebacklink/navigated' passHref>
        <Link color='primary'>Navigate</Link>
      </PageLink>
    </>
  )
}

const pageOptions: PageOptions<MinimalPageShellProps> = {
  SharedComponent: MinimalPageShell,
}
useBackLinkDemo.pageOptions = pageOptions

export default useBackLinkDemo
