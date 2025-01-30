import React from 'react'
import type { LayoutHeaderProps, TitleProps } from '../../Layout'
import { LayoutTitle } from '../../Layout'
import { LayoutHeaderClose } from '../../Layout/components/LayoutHeaderClose'
import { LayoutOverlayHeader } from '../../LayoutOverlay/components/LayoutOverlayHeader'

export type OverlayHeaderProps = Omit<LayoutHeaderProps, 'hideBackButton' | 'switchPoint'> &
  Pick<TitleProps, 'icon'> & { onClose: () => void }

/** @public */
export function OverlayHeader(props: OverlayHeaderProps) {
  const { children, onClose, sx = [], icon, primary, secondary, ...rest } = props

  return (
    <LayoutOverlayHeader
      noAlign
      sx={[{ '&.noAlign': { mb: 0 } }, ...(Array.isArray(sx) ? sx : [sx])]}
      switchPoint={-10000}
      size='responsive'
      hideBackButton
      primary={primary ?? <LayoutHeaderClose onClose={onClose} />}
      secondary={primary ? <LayoutHeaderClose onClose={onClose} /> : secondary}
      {...rest}
    >
      <LayoutTitle size='small' component='span' icon={icon}>
        {children}
      </LayoutTitle>
    </LayoutOverlayHeader>
  )
}
