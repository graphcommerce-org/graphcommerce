import { Typography } from '@material-ui/core'
import { ProductPageDescription, ProductPageDescriptionProps } from '@reachdigital/magento-product'
import ColumnTwoWithTop from '@reachdigital/next-ui/Row/ColumnTwoWithTop'
import React from 'react'

type RowProductDescriptionProps = ProductPageDescriptionProps & {
  right: React.ReactNode
}

export default function RowProductPageDescription(props: RowProductDescriptionProps) {
  const { right, name, description } = props

  return (
    <ColumnTwoWithTop
      top={
        <Typography variant='h1' component='h2'>
          {name}
        </Typography>
      }
      left={<ProductPageDescription description={description} />}
      right={right}
    />
  )
}
