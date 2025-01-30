import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { useHistoryLink } from '@graphcommerce/framer-next-pages'
import { Link } from '@mui/material'
import type { LayoutMinimalProps } from '../../../components'
import { LayoutMinimal } from '../../../components'

function BackLinkDemo() {
  const { href, onClick } = useHistoryLink({ href: '/test/usebacklink/cart' })
  const { href: hrefb, onClick: onClickB } = useHistoryLink({ href: '/test/usebacklink/shipping' })

  return (
    <>
      <div>
        <Link href={href} onClick={onClick} color='primary' underline='hover'>
          Cart
        </Link>
      </div>
      <div>
        <Link href={hrefb} color='primary' onClick={onClickB} underline='hover'>
          Shipping
        </Link>
      </div>
    </>
  )
}

const pageOptions: PageOptions<LayoutMinimalProps> = {
  Layout: LayoutMinimal,
}
BackLinkDemo.pageOptions = pageOptions

export default BackLinkDemo
