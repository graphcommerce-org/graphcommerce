import { styled } from '@mui/material'

const FormActions = styled('div')(
  ({ theme }) => ({
    paddingTop: theme.spacings.xxs,
    paddingBottom: theme.spacings.md,
    justifyContent: 'center',
    display: 'grid',
    gridAutoFlow: 'column',
    gap: `calc(${theme.spacings.xxs} * 2)`,
  }),
  { name: 'FormActions' },
)

export default FormActions
