import { responsiveVal, Row, SectionContainer, extendableComponent } from '@graphcommerce/next-ui'
import { Box, SxProps, Theme } from '@mui/material'
import { ProductSpecsFragment } from './ProductSpecs.gql'

export type ProductSpecsProps = ProductSpecsFragment & { title?: string; sx?: SxProps<Theme> }

const name = 'ProductSpecs' as const
const parts = ['root', 'specs', 'options'] as const
const { classes } = extendableComponent(name, parts)

export function ProductSpecs(props: ProductSpecsProps) {
  const { aggregations, title, sx = [] } = props
  const filter = ['price', 'category_id', 'size', 'new', 'sale', 'color']
  const specs = aggregations?.filter(
    (attr) => !filter.includes(attr?.attribute_code ?? '') && attr?.options?.[0]?.value !== '0',
  )

  if (specs?.length === 0) return null

  return (
    <Row
      className={classes.root}
      sx={[{ typography: 'subtitle1' }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <SectionContainer
        labelLeft={title}
        sx={(theme) => ({ '& .SectionHeader-root': { marginBottom: theme.spacings.md } })}
      >
        <Box
          component='ul'
          className={classes.specs}
          sx={(theme) => ({
            display: 'grid',
            justifyContent: 'start',
            margin: 0,
            padding: 0,
            gap: theme.spacings.xs,
            '& > *': {
              display: 'grid',
              gridTemplateColumns: `minmax(${responsiveVal(150, 200)}, 1fr) 1fr`,
              gap: theme.spacings.xs,
            },
          })}
        >
          {specs?.map((aggregation) => (
            <li key={aggregation?.attribute_code}>
              <div>{aggregation?.label}</div>
              <Box className={classes.options} sx={{ display: 'grid', gridAutoFlow: 'row' }}>
                {aggregation?.options?.map((option) => (
                  <span key={option?.value}>{option?.label === '1' ? 'Yes' : option?.label}</span>
                ))}
              </Box>
            </li>
          ))}
        </Box>
      </SectionContainer>
    </Row>
  )
}
