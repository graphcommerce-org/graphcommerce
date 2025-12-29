import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst, flushMeasurePerf, PrivateQueryMaskProvider } from '@graphcommerce/graphql'
import type { MenuQueryFragment } from '@graphcommerce/magento-category'
import type {
  FilterTypes,
  ProductFiltersQuery,
  ProductListParams,
  ProductListQuery,
} from '@graphcommerce/magento-product'
import {
  extractUrlQuery,
  getFilterTypes,
  hasUserFilterActive,
  parseParams,
  ProductFiltersDocument,
  ProductListDocument,
} from '@graphcommerce/magento-product'
import type { CategorySearchQuery } from '@graphcommerce/magento-search'
import {
  categoriesApplySearchDefaults,
  CategorySearchDocument,
  productListApplySearchDefaults,
  searchDefaultsToProductListFilters,
  SearchField,
  useProductList,
} from '@graphcommerce/magento-search'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { productFiltersLayout, productFiltersPro } from '@graphcommerce/next-config/config'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { LayoutHeader } from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import type { LayoutNavigationProps } from '../../components'
import {
  LayoutDocument,
  LayoutNavigation,
  ProductListLayoutClassic,
  ProductListLayoutDefault,
  ProductListLayoutSidebar,
} from '../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

type SearchResultProps = MenuQueryFragment &
  ProductListQuery &
  ProductFiltersQuery &
  CategorySearchQuery & { filterTypes: FilterTypes; params: ProductListParams }
type RouteProps = { url: string[] }
export type GetPageStaticProps = GetStaticProps<
  LayoutNavigationProps,
  SearchResultProps,
  RouteProps
>

function SearchResultPage(props: SearchResultProps) {
  const { mask, ...productList } = useProductList(props)
  const { params, menu } = productList
  const search = params.url.split('/')[1]

  return (
    <>
      <PageMeta title={search ? t`Results for ‘${search}’` : t`Search`} metaRobots={['noindex']} />
      <LayoutHeader floatingMd switchPoint={0}>
        <SearchField size='small' formControl={{ sx: { width: '81vw' } }} />
      </LayoutHeader>

      <PrivateQueryMaskProvider mask={mask}>
        {productFiltersPro && productFiltersLayout === 'SIDEBAR' && (
          <ProductListLayoutSidebar {...productList} menu={menu} />
        )}
        {productFiltersPro && productFiltersLayout !== 'SIDEBAR' && (
          <ProductListLayoutDefault {...productList} menu={menu} />
        )}
        {!productFiltersPro && <ProductListLayoutClassic {...productList} menu={menu} />}
      </PrivateQueryMaskProvider>
    </>
  )
}

const pageOptions: PageOptions<LayoutNavigationProps> = {
  Layout: LayoutNavigation,
}

SearchResultPage.pageOptions = pageOptions

export default SearchResultPage

export const getServerSideProps: GetPageStaticProps = async (context) => {
  const { params } = context
  const [searchShort = '', query = []] = extractUrlQuery(params)
  const search = searchShort.length >= 3 ? searchShort : ''

  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const filterTypes = getFilterTypes(client, true)

  const staticClient = graphqlSsrClient(context)
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const productListParams = parseParams(
    search ? `search/${search}` : 'search',
    query,
    await filterTypes,
    search,
  )

  if (!productListParams) return { notFound: true }

  const confData = (await conf).data
  if (!confData) return { notFound: true }

  const filters = hasUserFilterActive(productListParams)
    ? staticClient.query({
        query: ProductFiltersDocument,
        variables: searchDefaultsToProductListFilters(
          productListApplySearchDefaults(productListParams, confData),
        ),
      })
    : undefined

  const products = staticClient.query({
    query: ProductListDocument,
    variables: productListApplySearchDefaults(productListParams, confData),
  })

  // Category search is disabled - keeping code for potential future use
  const categories = undefined as
    | Awaited<ReturnType<typeof staticClient.query<CategorySearchQuery>>>
    | undefined

  const result = {
    props: {
      ...(await products).data,
      ...(await filters)?.data,
      ...(await categories)?.data,
      ...(await layout)?.data,
      filterTypes: await filterTypes,
      params: productListParams,
      up: { href: '/', title: t`Home` },
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
  flushMeasurePerf()
  return result
}
