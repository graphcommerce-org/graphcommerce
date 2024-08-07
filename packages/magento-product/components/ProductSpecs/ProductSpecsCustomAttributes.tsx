import { useQuery } from '@graphcommerce/graphql'
import { extendableComponent } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { ProductSpecsCustomAttributesFragment } from './ProductSpecs.gql'
import { ProductSpecsTypesDocument } from './ProductSpecsTypes.gql'

const name = 'ProductSpecs'
const parts = ['root', 'specs', 'options'] as const
const { classes } = extendableComponent(name, parts)

export type ProductSpecsCustomAttributesProps = {
  product: ProductSpecsCustomAttributesFragment
}

export function ProductSpecs(props: ProductSpecsCustomAttributesProps) {
  const { product } = props
  const specs = product.custom_attributesV2?.items
  const productSpecsTypes = useQuery(ProductSpecsTypesDocument)

  return (
    <>
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
                  <span key={option?.value}>{option?.label === '1' ? 'Yes' : option?.label}</span>
                ))}
              </>
            )}
            {item?.__typename === 'AttributeValue' && <span key={item?.value}>{item.value}</span>}
          </Box>
        </li>
      ))}
    </>
  )
}
