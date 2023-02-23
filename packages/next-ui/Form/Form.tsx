import { darken, lighten, styled, Theme } from '@mui/material'
import { breakpointVal } from '../Styles/breakpointVal'

type FormStyleProps = {
  contained?: boolean
  background?: 'secondary' | 'default'
}

const styles = ({ theme, contained = false, background }: { theme: Theme } & FormStyleProps) =>
  theme.unstable_sx([
    {
      display: 'grid',
      alignItems: 'center',
      py: theme.spacings.xxs,
      px: 0,
    },
    background === 'default' && {
      background:
        theme.palette.mode === 'light'
          ? darken(theme.palette.background.default, 0.03)
          : lighten(theme.palette.background.default, 0.1),
    },
    background === 'secondary' && {
      background: theme.palette.secondary.light,
    },
    contained && {
      py: theme.spacings.xxs,
      px: theme.spacings.sm,
      // paddingTop: theme.spacings.md,
      overflow: 'hidden',
      ...breakpointVal(
        'borderRadius',
        theme.shape.borderRadius * 3,
        theme.shape.borderRadius * 4,
        theme.breakpoints.values,
      ),
    },
  ])

export const Form = styled('form', {
  shouldForwardProp: (prop) => prop !== 'contained' && prop !== 'sx',
})<FormStyleProps>(styles)

export const FormDiv = styled('div', {
  shouldForwardProp: (prop) => prop !== 'contained' && prop !== 'sx',
})<FormStyleProps>(styles)
