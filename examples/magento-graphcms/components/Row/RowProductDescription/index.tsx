import { ProductPageDescription, ProductPageDescriptionProps } from '@graphcommerce/magento-product'
import { ColumnTwoWithTop } from '@graphcommerce/next-ui'
import { Typography } from '@material-ui/core'
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
