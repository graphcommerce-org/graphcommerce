import type { Theme } from '@mui/material'
import { styled } from '@mui/material'
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
      padding: `${theme.spacings.xxs} 0`,
    },
    background === 'default' && {
      background: theme.darken(theme.vars.palette.background.default, 0.03),
      ...theme.applyStyles('dark', {
        background: theme.lighten(theme.vars.palette.background.default, 0.1),
      }),
    },
    background === 'secondary' && {
      background: theme.vars.palette.secondary.light,
    },
    contained && {
      padding: `${theme.spacings.xxs} ${theme.spacings.sm}`,
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
