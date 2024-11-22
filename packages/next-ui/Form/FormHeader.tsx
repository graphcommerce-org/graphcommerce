import { Typography, styled } from '@mui/material'

export const FormHeader = styled(Typography, { name: 'FormHeader' })(({ theme }) => ({
  marginBottom: `calc(${theme.spacings.xxs} * -1)`,
  marginTop: theme.spacings.xxs,
}))
