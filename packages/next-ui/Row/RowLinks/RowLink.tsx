import { ButtonBase, ButtonBaseProps, SxProps, Theme } from '@mui/material'
import { NextLink } from '../../Theme'

export type Props = {
  url: string
  sx?: SxProps<Theme>
} & Omit<ButtonBaseProps<typeof NextLink>, 'href'>

export function RowLink(props: Props) {
  const { children, url, sx = [], ...buttonBaseProps } = props

  return (
    <ButtonBase
      component={NextLink}
      href={url}
      sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
      {...buttonBaseProps}
    >
      {children}
    </ButtonBase>
  )
}
