import { Box, darken, lighten, styled, experimental_sx, Theme } from '@mui/material'
import { responsiveVal } from '../Styles/responsiveVal'

type FormStyleProps = {
  contained?: boolean
  background?: 'secondary' | 'default'
}

const styles = ({
  theme,
  contained = false,
  background = 'default',
}: { theme: Theme } & FormStyleProps) =>
  experimental_sx([
    {
      display: 'grid',
      alignItems: 'center',
      padding: `${theme.spacings.xxs} 0`,
      background:
        theme.palette.mode === 'light'
          ? darken(theme.palette.background.default, 0.03)
          : lighten(theme.palette.background.default, 0.1),
    },
    background === 'secondary' && {
      background: theme.palette.secondary.light,
    },
    contained && {
      padding: `${theme.spacings.xxs} ${theme.spacings.sm}`,
      // paddingTop: theme.spacings.md,
      overflow: 'hidden',
      borderRadius: responsiveVal(theme.shape.borderRadius * 3, theme.shape.borderRadius * 4),
    },
  ])

export const Form = styled('form')<FormStyleProps>(styles)

export const FormDiv = styled('div')<FormStyleProps>(styles)
