import {
  ColumnTwoWithTop,
  ColumnTwoWithTopProps,
  extendableComponent,
  responsiveVal,
} from '@graphcommerce/next-ui'
import { Box, SxProps, Theme, Typography } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import { ProductPageDescriptionFragment } from './ProductPageDescription.gql'

export type ProductPageDescriptionProps = ProductPageDescriptionFragment &
  Omit<ColumnTwoWithTopProps, 'top' | 'left'> & {
    sx?: SxProps<Theme>
    fontSize?: 'responsive' | Variant
  }

const componentName = 'ProductPageDescription'
const parts = ['root', 'description'] as const

const { classes } = extendableComponent(componentName, parts)

export function ProductPageDescription(props: ProductPageDescriptionProps) {
  const { description, name, right, fontSize = 'subtitle1', sx = [] } = props

  return (
    <ColumnTwoWithTop
      className={classes.root}
      sx={sx}
      top={
        <Typography variant='h1' component='h1'>
          {name}
        </Typography>
      }
      left={
        description && (
          <Box
            className={classes.description}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: description.html }}
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
              fontSize === 'responsive' && {
                '& p, & li': {
                  fontSize: responsiveVal(16, 30),
                },
              },
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
  )
}
