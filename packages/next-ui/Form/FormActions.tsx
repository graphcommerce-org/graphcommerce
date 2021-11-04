import { styled } from '@material-ui/core'

const FormActions = styled('div')(
  ({ theme }) => ({
    paddingTop: theme.spacings.md,
    paddingBottom: theme.spacings.lg,
    justifyContent: 'center',
    display: 'grid',
    gridAutoFlow: 'column',
    gap: `calc(${theme.spacings.xxs} * 2)`,
  }),
  { name: 'FormActions' },
)

export default FormActions
