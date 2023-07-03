import { ProductPageDescriptionFragment } from '@graphcommerce/magento-product/components/ProductPageDescription/ProductPageDescription.gql'
import {
  ColumnTwoWithTop,
  ColumnTwoWithTopProps,
  extendableComponent,
  breakpointVal,
} from '@graphcommerce/next-ui'
import { Box, SxProps, Theme, Typography } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import { useConfigurableOptionsSelection } from '../../hooks'

export type ConfigurableProductPageDescriptionProps = ProductPageDescriptionFragment &
  Omit<ColumnTwoWithTopProps, 'top' | 'left'> & {
    sx?: SxProps<Theme>
    fontSize?: 'responsive' | Variant
    url_key?: string | null
    index?: number
  }

const componentName = 'ProductPageDescription'
const parts = ['root', 'description'] as const

const { classes } = extendableComponent(componentName, parts)

export function ConfigurableProductPageDescription(props: ConfigurableProductPageDescriptionProps) {
  const { description, name, right, url_key, fontSize = 'subtitle1', index = 0, sx = [] } = props
  const { configured } = useConfigurableOptionsSelection({ url_key, index })

  const simpleProduct = configured?.configurable_product_options_selection?.variant
  const configurableDescription = simpleProduct?.description?.html.length
    ? simpleProduct?.description
    : description

  return (
    <ColumnTwoWithTop
      className={classes.root}
      sx={sx}
      top={
        <Typography variant='h1' component='h1'>
          {simpleProduct?.name ?? name}
        </Typography>
      }
      left={
        configurableDescription && (
          <Box
            className={classes.description}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: configurableDescription.html,
            }}
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
  )
}
