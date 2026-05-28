import { CartFab } from '@graphcommerce/magento-cart'
import { CmsBlock } from '@graphcommerce/magento-cms'
import { NavigationFab, useNavigationSelection } from '@graphcommerce/next-ui'
import { useRouter } from 'next/router'
import { productListRenderer } from '../ProductListItems/productListRenderer'
import { Footer } from './Footer'
import { Header } from './Header'
import type { LayoutQuery } from './Layout.gql'
import { LayoutDefault, type LayoutDefaultProps } from './LayoutDefault'
import { MenuOverlay } from './MenuOverlay'

export type LayoutNavigationProps = LayoutQuery &
  Omit<LayoutDefaultProps, 'footer' | 'header' | 'cartFab' | 'menuFab'>

export function LayoutNavigation(props: LayoutNavigationProps) {
  const { menu, children, cmsBlocks, ...uiProps } = props

  const selection = useNavigationSelection()
  const router = useRouter()

  const footerBlock = cmsBlocks?.items?.find((item) => item?.identifier === 'footer_links_block')

  return (
    <>
      <MenuOverlay menu={menu} selection={selection} />

      <LayoutDefault
        {...uiProps}
        noSticky={router.asPath.split('?')[0] === '/'}
        header={<Header menu={menu} selection={selection} />}
        footer={
          <Footer
            socialLinks={
              footerBlock ? (
                <CmsBlock cmsBlock={footerBlock} productListRenderer={productListRenderer} />
              ) : (
                <div />
              )
            }
          />
        }
        cartFab={<CartFab BadgeProps={{ color: 'secondary' }} />}
        menuFab={<NavigationFab onClick={() => selection.set([])} />}
      >
        {children}
      </LayoutDefault>
    </>
  )
}
