import { Typography } from '@mui/material'
import { ProductNameFragment } from './ProductName.gql'

export function ProductName(props: ProductNameFragment) {
  const { name } = props

  return (
    <Typography variant='h3' component='div' gutterBottom>
      {name}
    </Typography>
  )
}
