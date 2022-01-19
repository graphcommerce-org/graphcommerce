import { LayoutDefault, LayoutDefaultProps } from '@graphcommerce/next-ui'
import { DefaultPageQuery } from '../../graphql/DefaultPage.gql'
import { Footer } from './Footer'
import { Logo } from './Logo'

export type LayoutMinimalProps = Omit<DefaultPageQuery, 'pages'> &
  Omit<LayoutDefaultProps, 'header' | 'footer' | 'cartFab' | 'noSticky'>

export function LayoutMinimal(props: LayoutMinimalProps) {
  const { footer, menu, children, ...uiProps } = props

  return (
    <LayoutDefault {...uiProps} header={<Logo />} footer={<Footer footer={footer} />}>
      {children}
    </LayoutDefault>
  )
}
