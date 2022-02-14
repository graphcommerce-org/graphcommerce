import {
  ColumnTwoWithTop,
  ColumnTwoWithTopProps,
  extendableComponent,
} from '@graphcommerce/next-ui'
import { Box, SxProps, Theme, Typography } from '@mui/material'
import { ProductPageDescriptionFragment } from './ProductPageDescription.gql'

export type ProductPageDescriptionProps = ProductPageDescriptionFragment &
  Omit<ColumnTwoWithTopProps, 'top' | 'left'> & { sx?: SxProps<Theme> }

const { classes } = extendableComponent('ProductPageDescription', ['root', 'description'] as const)

export default function ProductPageDescription(props: ProductPageDescriptionProps) {
  const { description, name, right, sx = [] } = props

  return (
    <ColumnTwoWithTop
      className={classes.root}
      sx={sx}
      top={
        <Typography variant='h1' component='h2'>
          {name}
        </Typography>
      }
      left={
        description && (
          <Box
            className={classes.description}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: description.html }}
            sx={(theme) => ({
              '& p:first-of-type': {
                marginTop: 0,
              },
              '& p, & li': {
                typography: 'body1',
                fontWeight: 400,
                [theme.breakpoints.up('md')]: {
                  typography: 'h3',
                  fontWeight: 400,
                  '@supports (font-variation-settings: normal)': {
                    fontVariationSettings: "'wght' 420",
                  },
                },
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
            })}
          />
        )
      }
      right={right}
    />
  )
}
