import { styled } from '@mui/material'

export const FormRow = styled('div', { name: 'FormRow' })(({ theme }) =>
  theme.unstable_sx({
    paddingTop: theme.spacings.xxs,
    paddingBottom: theme.spacings.xxs,
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
    gap: theme.responsiveTemplate`calc(${theme.spacings.xxs} * 2)`,
  }),
)
