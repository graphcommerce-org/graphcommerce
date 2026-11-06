import { CartFab } from '@graphcommerce/magento-cart'
import { NavigationFab, useNavigationSelection } from '@graphcommerce/next-ui'
import { useRouter } from 'next/router'
import { GlobalConfigProvider } from '../Storyblok/GlobalConfigProvider'
import type { StoryblokGlobalConfig } from '../Storyblok/types'
import { Footer } from './Footer'
import { Header } from './Header'
import type { LayoutQuery } from './Layout.gql'
import { LayoutDefault, type LayoutDefaultProps } from './LayoutDefault'
import { MenuOverlay } from './MenuOverlay'

export type LayoutNavigationProps = LayoutQuery &
  Omit<LayoutDefaultProps, 'footer' | 'header' | 'cartFab' | 'menuFab'> & {
    globalConfig?: StoryblokGlobalConfig | null
  }

export function LayoutNavigation(props: LayoutNavigationProps) {
  const { menu, children, globalConfig, ...uiProps } = props

  const selection = useNavigationSelection()
  const router = useRouter()

  return (
    <GlobalConfigProvider value={globalConfig}>
      <MenuOverlay menu={menu} selection={selection} />

      <LayoutDefault
        {...uiProps}
        noSticky={router.asPath.split('?')[0] === '/'}
        header={<Header menu={menu} selection={selection} />}
        footer={<Footer />}
        cartFab={<CartFab BadgeProps={{ color: 'secondary' }} />}
        menuFab={<NavigationFab onClick={() => selection.set([])} />}
      >
        {children}
      </LayoutDefault>
    </GlobalConfigProvider>
  )
}
