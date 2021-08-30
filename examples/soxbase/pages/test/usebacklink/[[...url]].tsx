import { Link } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import useBackLink from '@reachdigital/framer-next-pages/hooks/useBackLink'
import PageLink from 'next/link'
import React from 'react'
import MinimalPageShell, {
  MinimalPageShellProps,
} from '../../../components/AppShell/MinimalPageShell'

function useBackLinkDemo() {
  const { href: hrefa, onClick: onClickA } = useBackLink({ href: '/test/usebacklink/cart' })
  const { href: hrefb, onClick: onClickB } = useBackLink({ href: '/test/usebacklink/shipping' })

  return (
    <>
      <div>
        <PageLink href={hrefa} passHref>
          <Link onClick={onClickA} color='primary'>
            Cart
          </Link>
        </PageLink>
      </div>
      <div>
        <PageLink href={hrefb} passHref>
          <Link color='primary' onClick={onClickB}>
            Shipping
          </Link>
        </PageLink>
      </div>
    </>
  )
}

const pageOptions: PageOptions<MinimalPageShellProps> = {
  SharedComponent: MinimalPageShell,
}
useBackLinkDemo.pageOptions = pageOptions

export default useBackLinkDemo
