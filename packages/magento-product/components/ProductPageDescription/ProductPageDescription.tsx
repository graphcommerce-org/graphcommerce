import {
  ColumnTwoWithTop,
  ColumnTwoWithTopProps,
  extendableComponent,
  breakpointVal,
  LazyHydrate,
} from '@graphcommerce/next-ui'
import { Box, SxProps, Theme, Typography } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import { ProductPageName } from '../ProductPageName'
import { ProductPageDescriptionFragment } from './ProductPageDescription.gql'

export type ProductPageDescriptionProps = ProductPageDescriptionFragment &
  Omit<ColumnTwoWithTopProps, 'top' | 'left'> & {
    sx?: SxProps<Theme>
    fontSize?: 'responsive' | Variant
    product: ProductPageDescriptionFragment
  }

const componentName = 'ProductPageDescription'
const parts = ['root', 'description'] as const

const { classes } = extendableComponent(componentName, parts)

export function ProductPageDescription(props: ProductPageDescriptionProps) {
  const { product, right, fontSize = 'subtitle1', maxWidth = 'lg', sx = [] } = props

  return (
    <LazyHydrate height={500}>
      <ColumnTwoWithTop
        maxWidth={maxWidth}
        className={classes.root}
        sx={sx}
        top={
          <Typography variant='h1' component='h1'>
            <ProductPageName product={product} />
          </Typography>
        }
        left={
          product.description && (
            <Box
              className={classes.description}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: product.description.html }}
              sx={[
                {
                  '& p:first-of-type': {
                    marginTop: 0,
                  },
                  '& ul': {
                    padding: 0,
                    margin: 0,
                    display: 'inline',
                    listStyleType: 'none',
                  },
                  '& li': {
                    display: 'inline',
                  },
                },
                fontSize === 'responsive' &&
                  ((theme) => ({
                    '& p, & li': {
                      ...breakpointVal('fontSize', 16, 30, theme.breakpoints.values),
                    },
                  })),
                fontSize !== 'responsive' && {
                  '& p, & li': {
                    fontSize,
                  },
                },
              ]}
            />
          )
        }
        right={right}
      />
    </LazyHydrate>
  )
}
