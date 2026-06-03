import { CartFab } from '@graphcommerce/magento-cart'
import { NavigationFab, useNavigationSelection } from '@graphcommerce/next-ui'
import { useRouter } from 'next/router'
import { Footer } from './Footer'
import { Header } from './Header'
import type { LayoutQuery } from './Layout.gql'
import { LayoutDefault, type LayoutDefaultProps } from './LayoutDefault'
import { MenuOverlay } from './MenuOverlay'

export type LayoutNavigationProps = LayoutQuery &
  Omit<LayoutDefaultProps, 'footer' | 'header' | 'cartFab' | 'menuFab'>

export function LayoutNavigation(props: LayoutNavigationProps) {
  const { footer, menu, children, ...uiProps } = props

  const selection = useNavigationSelection()
  const router = useRouter()

  return (
    <>
      <MenuOverlay menu={menu} selection={selection} />

      <LayoutDefault
        {...uiProps}
        noSticky={router.asPath.split('?')[0] === '/'}
        header={<Header menu={menu} selection={selection} />}
        footer={<Footer footer={footer} />}
        cartFab={<CartFab />}
        menuFab={<NavigationFab onClick={() => selection.set([])} />}
      >
        {children}
      </LayoutDefault>
    </>
  )
}
