import { extendableComponent } from '@graphcommerce/next-ui'
import Typography from '@mui/material/Typography'
import { SxProps, Theme } from '@mui/material/styles'
import { ProductShortDescriptionFragment } from './ProductShortDescription.gql'

type ProductShortDescriptionProps = ProductShortDescriptionFragment & { sx?: SxProps<Theme> }

const { classes } = extendableComponent('ProductShortDescription', ['description'] as const)

export function ProductShortDescription(props: ProductShortDescriptionProps) {
  const { short_description, sx = [] } = props

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
