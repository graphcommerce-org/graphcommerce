import { PageOptions, useHistoryLink } from '@graphcommerce/framer-next-pages'
import { Link } from '@mui/material'
import PageLink from 'next/link'
import { LayoutMinimal, LayoutMinimalProps } from '../../../components'

function BackLinkDemo() {
  const { href, onClick } = useHistoryLink({ href: '/test/usebacklink/cart' })
  const { href: hrefb, onClick: onClickB } = useHistoryLink({ href: '/test/usebacklink/shipping' })

  return (
    <>
      <div>
        <PageLink href={href} passHref>
          <Link onClick={onClick} color='primary' underline='hover'>
            Cart
          </Link>
        </PageLink>
      </div>
      <div>
        <PageLink href={hrefb} passHref>
          <Link color='primary' onClick={onClickB} underline='hover'>
            Shipping
          </Link>
        </PageLink>
      </div>
    </>
  )
}

const pageOptions: PageOptions<LayoutMinimalProps> = {
  Layout: LayoutMinimal,
}
BackLinkDemo.pageOptions = pageOptions

export default BackLinkDemo
