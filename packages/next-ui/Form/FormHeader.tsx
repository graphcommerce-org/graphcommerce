import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

export const FormHeader = styled(Typography, { name: 'FormHeader' })(({ theme }) => ({
  marginBottom: `calc(${theme.spacings.xxs} * -1)`,
  marginTop: theme.spacings.xxs,
}))
