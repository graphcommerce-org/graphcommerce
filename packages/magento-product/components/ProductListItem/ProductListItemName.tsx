import { extendableComponent } from '@graphcommerce/next-ui'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { ProductListPrice, ProductListPriceProps } from '../ProductListPrice/ProductListPrice'

const { classes, selectors } = extendableComponent('ProductListItem', [
  'title',
  'titleContainer',
  'subtitle',
] as const)

export type ProductListItemNameProps = {
  name?: React.ReactNode
  subTitle?: React.ReactNode
  titleComponent?: React.ElementType
  children?: React.ReactNode
  price: ProductListPriceProps
}

export function ProductListItemName(props: ProductListItemNameProps) {
  const { name, subTitle, titleComponent = 'h2', children, price } = props

  return (
    <Box
      className={classes.titleContainer}
      sx={(theme) => ({
        display: 'grid',
        alignItems: 'baseline',
        marginTop: theme.spacings.xs,
        columnGap: 1,
        gridTemplateAreas: {
          xs: `"title title" "subtitle price"`,
          md: `"title subtitle price"`,
        },
        gridTemplateColumns: { xs: 'unset', md: 'auto auto 1fr' },
        justifyContent: 'space-between',
      })}
    >
      <Typography
        component={titleComponent}
        variant='subtitle1'
        sx={{
          display: 'inline',
          color: 'text.primary',
          overflowWrap: 'break-word',
          wordBreak: 'break-all',
          maxWidth: '100%',
          gridArea: 'title',
          fontWeight: 'fontWeightBold',
        }}
        className={classes.title}
      >
        {name}
      </Typography>
      <Box sx={{ gridArea: 'subtitle' }} className={classes.subtitle}>
        {subTitle}
      </Box>

      <ProductListPrice
        {...price}
        sx={{ gridArea: 'price', textAlign: 'right', justifySelf: { sm: 'flex-end' } }}
      />

      {children}
    </Box>
  )
}
