import { extendableComponent } from '@graphcommerce/next-ui'
import { SxProps, Theme, Typography } from '@mui/material'
import { ProductShortDescriptionFragment } from './ProductShortDescription.gql'

export type ProductShortDescriptionProps = {
  product: ProductShortDescriptionFragment
  sx?: SxProps<Theme>
}

const { classes } = extendableComponent('ProductShortDescription', ['description'] as const)

export function ProductShortDescription(props: ProductShortDescriptionProps) {
  const { product, sx = [] } = props
  const { short_description } = product

  return (
    <Typography
      variant='body1'
      component='div'
      className={classes.description}
      dangerouslySetInnerHTML={{ __html: short_description?.html ?? '' }}
      sx={[
        {
          '& > p:first-of-type': { marginTop: 0 },
          '& > p:last-of-type': { marginBottom: 0 },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )
}
