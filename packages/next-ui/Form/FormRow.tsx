import { styled } from '@mui/material/styles'

export const FormRow = styled('div', { name: 'FormRow' })(({ theme }) => ({
  paddingTop: theme.spacings.xxs,
  paddingBottom: theme.spacings.xxs,
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
  gap: `calc(${theme.spacings.xxs} * 2)`,
}))
