import { useQuery } from '@graphcommerce/graphql'
import { responsiveVal, Row, SectionContainer, extendableComponent } from '@graphcommerce/next-ui'
import { Box, SxProps, Theme } from '@mui/material'
import { ProductSpecsFragment } from './ProductSpecs.gql'
import { ProductSpecsTypesDocument } from './ProductSpecsTypes.gql'

export type ProductSpecsProps = {
  title?: string
  sx?: SxProps<Theme>
  children?: React.ReactNode
  product: ProductSpecsFragment
}

const name = 'ProductSpecs'
const parts = ['root', 'specs', 'options'] as const
const { classes } = extendableComponent(name, parts)

export function ProductSpecs(props: ProductSpecsProps) {
  const { title, children, sx = [], product } = props

  const specs = product.custom_attributesV2?.items
  const productSpecsTypes = useQuery(ProductSpecsTypesDocument)

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
          {specs?.map((item) => (
            <li key={item?.code}>
              <div>
                {
                  productSpecsTypes?.data?.attributesList?.items?.find(
                    (type) => type?.code === item?.code,
                  )?.label
                }
              </div>
              <Box className={classes.options} sx={{ display: 'grid', gridAutoFlow: 'row' }}>
                {item?.__typename === 'AttributeSelectedOptions' && (
                  <>
                    {item?.selected_options?.map((option) => (
                      <span key={option?.value}>
                        {option?.label === '1' ? 'Yes' : option?.label}
                      </span>
                    ))}
                  </>
                )}
                {item?.__typename === 'AttributeValue' && (
                  <span key={item?.value}>{item.value}</span>
                )}
              </Box>
            </li>
          ))}
        </Box>
        {children}
      </SectionContainer>
    </Row>
  )
}
