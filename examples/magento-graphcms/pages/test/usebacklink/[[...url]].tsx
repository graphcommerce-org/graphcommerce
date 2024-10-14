import { PageOptions, useHistoryLink } from '@graphcommerce/framer-next-pages'
import { Link } from '@mui/material'
import { LayoutMinimal, LayoutMinimalProps } from '../../../components'

function BackLinkDemo() {
  const { href, onClick } = useHistoryLink({ href: '/test/usebacklink/cart' })
  const { href: hrefb, onClick: onClickB } = useHistoryLink({ href: '/test/usebacklink/shipping' })

  return (
    <>
      <div>
        <Link href={href} onClick={onClick} underline='hover' sx={{ color: 'primary' }}>
          Cart
        </Link>
      </div>
      <div>
        <Link href={hrefb} onClick={onClickB} underline='hover' sx={{ color: 'primary' }}>
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
