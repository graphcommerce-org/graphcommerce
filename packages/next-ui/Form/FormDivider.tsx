import { styled } from '@mui/material'

export const FormDivider = styled('div', { name: 'FormDivider' })(({ theme }) =>
  theme.unstable_sx({
    background: theme.palette.divider,
    height: 1,
    width: '100%',
    marginTop: theme.spacings.xxs,
    marginBottom: theme.spacings.xxs,
  }),
)
