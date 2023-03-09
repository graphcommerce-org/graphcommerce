import { ButtonBase, ButtonBaseProps, SxProps, Theme } from '@mui/material'
import { extendableComponent } from '../../Styles'
import { NextLink } from '../../Theme'

export type RowLinkProps = {
  url: string
  sx?: SxProps<Theme>
} & Omit<ButtonBaseProps<typeof NextLink>, 'href'>

const compName = 'RowLink' as const
const parts = ['root'] as const
const { classes } = extendableComponent(compName, parts)

export function RowLink(props: RowLinkProps) {
  const { children, url, sx = [], ...buttonBaseProps } = props

  return (
    <ButtonBase
      component={NextLink}
      href={url}
      className={classes.root}
      sx={[{ '& img': { display: 'block' } }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...buttonBaseProps}
    >
      {children}
    </ButtonBase>
  )
}
