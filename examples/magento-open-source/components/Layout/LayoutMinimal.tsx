import type { LayoutDefaultProps } from '@graphcommerce/next-ui'
import { LayoutDefault } from '@graphcommerce/next-ui'
import { Footer } from './Footer'
import type { LayoutQuery } from './Layout.gql'
import { Logo } from './Logo'

export type LayoutMinimalProps = LayoutQuery &
  Omit<LayoutDefaultProps, 'header' | 'footer' | 'cartFab' | 'noSticky'>

export function LayoutMinimal(props: LayoutMinimalProps) {
  const { menu, children, ...uiProps } = props

  return (
    <LayoutDefault
      {...uiProps}
      header={<Logo />}
      footer={<Footer />}
      sx={{ background: (theme) => theme.palette.background.paper }}
    >
      {children}
    </LayoutDefault>
  )
}
