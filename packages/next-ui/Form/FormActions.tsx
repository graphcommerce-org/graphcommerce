import { styled } from '@mui/material'

export const FormActions = styled('div', { name: 'FormActions' })(({ theme }) =>
  theme.unstable_sx({
    paddingTop: theme.spacings.md,
    paddingBottom: theme.spacings.lg,
    justifyContent: 'center',
    display: 'grid',
    gridAutoFlow: 'column',
    gap: theme.spacings.sm,
  }),
)
