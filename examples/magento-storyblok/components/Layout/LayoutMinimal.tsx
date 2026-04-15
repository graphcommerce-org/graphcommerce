import type { LayoutDefaultProps } from '@graphcommerce/next-ui'
import { LayoutDefault } from '@graphcommerce/next-ui'
import { GlobalConfigProvider } from '../Storyblok/GlobalConfigProvider'
import type { StoryblokGlobalConfig } from '../Storyblok/types'
import { Footer } from './Footer'
import type { LayoutQuery } from './Layout.gql'
import { Logo } from './Logo'

export type LayoutMinimalProps = LayoutQuery &
  Omit<LayoutDefaultProps, 'header' | 'footer' | 'cartFab' | 'noSticky'> & {
    globalConfig?: StoryblokGlobalConfig | null
  }

export function LayoutMinimal(props: LayoutMinimalProps) {
  const { menu, children, cmsBlocks, globalConfig, ...uiProps } = props

  return (
    <GlobalConfigProvider value={globalConfig}>
      <LayoutDefault
        {...uiProps}
        header={<Logo />}
        footer={<Footer />}
        sx={(theme) => ({ background: theme.vars.palette.background.paper })}
      >
        {children}
      </LayoutDefault>
    </GlobalConfigProvider>
  )
}
