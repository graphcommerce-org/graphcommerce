import { styled } from '@mui/material'

export const FormDivider = styled('div', { name: 'FormDivider' })(({ theme }) => ({
  background: theme.vars.palette.divider,
  height: 1,
  width: '100%',
  marginTop: theme.spacings.xxs,
  marginBottom: theme.spacings.xxs,
}))
