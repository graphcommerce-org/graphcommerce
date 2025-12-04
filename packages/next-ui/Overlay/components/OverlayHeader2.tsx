import { LayoutTitle, type TitleProps } from '../../Layout'
import { LayoutHeaderClose } from '../../Layout/components/LayoutHeaderClose'
import { LayoutOverlayHeader2, type LayoutOverlayHeader2Props } from '../../LayoutOverlay'

export type OverlayHeader2Props = Omit<LayoutOverlayHeader2Props, 'hideBackButton'> & {
  onClose: () => void
  icon?: TitleProps['icon']
}

export function OverlayHeader2(props: OverlayHeader2Props) {
  const { children, onClose, primary, secondary, icon, ...rest } = props

  return (
    <LayoutOverlayHeader2
      hideBackButton
      size='small'
      primary={primary ?? <LayoutHeaderClose onClose={onClose} size='small' />}
      secondary={primary ? <LayoutHeaderClose onClose={onClose} size='small' /> : secondary}
      {...rest}
    >
      <LayoutTitle size='small' component='span' icon={icon}>
        {children}
      </LayoutTitle>
    </LayoutOverlayHeader2>
  )
}
