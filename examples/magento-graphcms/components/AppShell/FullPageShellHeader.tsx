import {
  FullPageShellHeader as FullPageShellHeaderBase,
  FullPageShellHeaderProps as PageShellHeaderPropsBase,
} from '@graphcommerce/next-ui'
import Logo from './Logo'

type FullPageShellHeaderProps = Omit<PageShellHeaderPropsBase, 'logo'>

export default function FullPageShellHeader(props: FullPageShellHeaderProps) {
  return <FullPageShellHeaderBase logo={<Logo alwaysShow />} fill='mobile-only' {...props} />
}
