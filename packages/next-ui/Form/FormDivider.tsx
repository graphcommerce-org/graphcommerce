import { styled } from '@mui/material/styles'

export const FormDivider = styled('div', { name: 'FormDivider' })(({ theme }) => ({
  background: theme.palette.divider,
  height: 1,
  width: '100%',
  marginTop: theme.spacings.xxs,
  marginBottom: theme.spacings.xxs,
}))
