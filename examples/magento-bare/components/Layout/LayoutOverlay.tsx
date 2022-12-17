import { LayoutOverlayProps as LayoutOverlayBaseProps } from '@graphcommerce/next-ui'

export { LayoutOverlay } from '@graphcommerce/next-ui'

export type LayoutOverlayProps = Omit<LayoutOverlayBaseProps, 'classes' | 'className'>
