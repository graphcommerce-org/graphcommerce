import { GlobalConfigProvider } from '../Storyblok/GlobalConfigProvider'
import type { StoryblokGlobalConfig } from '../Storyblok/types'
import { Footer } from './Footer'
import { HeaderContainer } from './HeaderContainer'
import type { LayoutQuery } from './Layout.gql'
import { LayoutDefault, type LayoutDefaultProps } from './LayoutDefault'
import { Logo } from './Logo'

export type LayoutMinimalProps = LayoutQuery &
  Omit<LayoutDefaultProps, 'header' | 'footer' | 'cartFab' | 'noSticky'> & {
    globalConfig?: StoryblokGlobalConfig | null
  }

export function LayoutMinimal(props: LayoutMinimalProps) {
  const { menu, children, globalConfig, ...uiProps } = props

  return (
    <GlobalConfigProvider value={globalConfig}>
      <LayoutDefault
        {...uiProps}
        header={
          <HeaderContainer>
            <Logo />
          </HeaderContainer>
        }
        footer={<Footer />}
        sx={(theme) => ({ background: theme.vars.palette.background.paper })}
      >
        {children}
      </LayoutDefault>
    </GlobalConfigProvider>
  )
}
