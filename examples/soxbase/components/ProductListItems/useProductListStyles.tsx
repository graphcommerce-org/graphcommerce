import { makeStyles, Theme } from '@material-ui/core'
import { ProductListQuery } from '@reachdigital/magento-product-types/ProductList.gql'
import {
  FilterTypes,
  ProductListParams,
} from '@reachdigital/magento-product/ProductListItems/filterTypes'
import { CategoryPageQuery } from '../GraphQL/CategoryPage.gql'

type UseProductListStylesProps = CategoryPageQuery &
  ProductListQuery & {
    filterTypes: FilterTypes
    params: ProductListParams
  }

const useProductListStyles = makeStyles(
  (theme: Theme) => ({
    productList: (props: UseProductListStylesProps) => {
      let big = 3
      let index = 0
      let toggle = false
      let selector = ''
      const count = props.products?.items?.length ?? 0
      for (index = 0; index <= count; index++) {
        if (index === big) {
          selector += `& >:nth-child(${big}),`
          if (toggle === false) {
            big = index + 7
            toggle = !toggle
          } else {
            big = index + 11
            toggle = !toggle
          }
        }
      }
      selector = selector.slice(0, -1)
      return {
        [theme.breakpoints.up('xl')]: {
          [`${selector}`]: {
            gridColumn: 'span 2',
            gridRow: 'span 2;',
            '& > a > div': {
              paddingTop: `calc(100% + ${theme.spacings.lg} - 2px)`,
            },
          },
        },
      }
    },
  }),
  { name: 'ProductList' },
)

export default useProductListStyles
