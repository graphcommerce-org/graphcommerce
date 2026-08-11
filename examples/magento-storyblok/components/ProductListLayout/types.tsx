import type { MenuQueryFragment } from '@graphcommerce/magento-category'
import type {
  CategoryDefaultFragment,
  ColumnsConfig,
  FilterTypes,
  ProductFiltersQuery,
  ProductListParams,
  ProductListQuery,
  useProductList,
} from '@graphcommerce/magento-product'
import { responsiveVal, useContainerSizing } from '@graphcommerce/next-ui'
import { useTheme } from '@mui/material'
import type { Breakpoint } from '@mui/material'
import type { CategoryPageQuery } from '../../graphql/CategoryPage.gql'

type BaseProps = MenuQueryFragment &
  ProductListQuery &
  ProductFiltersQuery & {
    filterTypes?: FilterTypes
    params?: ProductListParams
  }

type SearchLayoutProps = {
  id?: undefined
  title?: undefined
  category?: undefined
}

type CategoryLayoutProps = {
  id: string
  title: string
  category: CategoryDefaultFragment &
    NonNullable<NonNullable<CategoryPageQuery['categories']>['items']>[number]
}

type ProductListProps = Omit<ReturnType<typeof useProductList<BaseProps>>, 'mask'>

export type ProductListLayoutProps = ProductListProps & (SearchLayoutProps | CategoryLayoutProps)

type Configuration = {
  columnGap: { xs: string; xl: string }
  sidebarWidth: string
  columns: ColumnsConfig
}

export const useLayoutConfiguration = (hasSidebar: boolean): Configuration => {
  const { breakpoint } = useContainerSizing('content')
  const theme = useTheme()

  const sidebarWidths = hasSidebar
    ? {
        md: responsiveVal(200, 250, 960, 1920),
        lg: responsiveVal(200, 250, 960, 1920),
        xl: responsiveVal(200, 350, 960, 1920),
      }
    : {
        md: '0px',
        lg: '0px',
        xl: '0px',
      }

  const maxWidth = (bp: Breakpoint) =>
    `calc(${theme.breakpoints.values[bp]}px - ${sidebarWidths[bp]})`

  const configurations: Record<string, Configuration> = {
    md: {
      columnGap: { xs: theme.spacings.md, xl: theme.spacings.md },
      sidebarWidth: sidebarWidths.md,
      columns: {
        xs: { count: 2 },
      },
    },
    lg: {
      columnGap: { xs: theme.spacings.md, xl: theme.spacings.lg },
      sidebarWidth: sidebarWidths.lg,
      columns: {
        xs: { count: 2 },
        md: { count: 3, maxWidth: maxWidth('lg') },
        lg: { count: 4, maxWidth: maxWidth('lg') },
      },
    },
    xl: {
      columnGap: { xs: theme.spacings.md, xl: theme.spacings.xl },
      sidebarWidth: sidebarWidths.xl,
      columns: {
        xs: { count: 2 },
        md: { count: 3, maxWidth: maxWidth('xl') },
        lg: { count: 4, maxWidth: maxWidth('xl') },
      },
    },
    fullWidth: {
      columnGap: { xs: theme.spacings.md, xl: theme.spacings.xxl },
      sidebarWidth: sidebarWidths.xl,
      columns: { xs: { count: 2 }, md: { count: 3 }, lg: { count: 4 } },
    },
  }

  return configurations[breakpoint || 'fullWidth']
}
