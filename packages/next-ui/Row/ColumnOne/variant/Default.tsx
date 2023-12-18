// import { RichText } from '@graphcommerce/graphcms-ui'
import { Container, styled } from '@mui/material'
import { RowColumnOneProps } from '../type'

export const ColumnOne = styled(Container, { name: 'ColumnOne' })(({ theme }) => ({
  maxWidth: 820,
  marginBottom: theme.spacings.lg,
}))

export function Default(props: RowColumnOneProps) {
  const { copy } = props

  return (
    // <ColumnOne>
    //   {/* <RichText {...copy} /> */}
    // </ColumnOne>
    <p>kalaka</p>
  )
}
