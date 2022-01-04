import { styled } from '@mui/material'

const FormDivider = styled('div')(
  ({ theme }) => ({
    background: theme.palette.divider,
    height: 1,
    width: '100%',
    marginTop: theme.spacings.xxs,
    marginBottom: theme.spacings.xxs,
  }),
  { name: 'FormDivider' },
)

export default FormDivider
