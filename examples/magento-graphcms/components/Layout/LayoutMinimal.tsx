import { Footer } from './Footer'
import { HeaderContainer } from './HeaderContainer'
import { LayoutQuery } from './Layout.gql'
import { LayoutDefault, type LayoutDefaultProps } from './LayoutDefault'
import { Logo } from './Logo'

export type LayoutMinimalProps = LayoutQuery &
  Omit<LayoutDefaultProps, 'header' | 'footer' | 'cartFab' | 'noSticky'>

export function LayoutMinimal(props: LayoutMinimalProps) {
  const { footer, menu, children, ...uiProps } = props

  return (
    <LayoutDefault
      {...uiProps}
      header={
        <HeaderContainer>
          <Logo />
        </HeaderContainer>
      }
      footer={<Footer footer={footer} />}
      sx={(theme) => ({ background: theme.vars.palette.background.paper })}
    >
      {children}
    </LayoutDefault>
  )
}
