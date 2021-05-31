import { styled } from '@material-ui/core'

const FormRow = styled('div')(
  ({ theme }) => ({
    paddingTop: theme.spacings.xxs,
    paddingBottom: theme.spacings.xxs,
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
    gap: `calc(${theme.spacings.xxs} * 2)`,
  }),
  { name: 'FormRow' },
)

export default FormRow
