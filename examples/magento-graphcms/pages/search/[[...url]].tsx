import { PageOptions } from '@graphcommerce/framer-next-pages'
import { PrivateQueryMaskProvider, cacheFirst, flushMeasurePerf } from '@graphcommerce/graphql'
import { MenuQueryFragment } from '@graphcommerce/magento-category'
import {
  ProductListDocument,
  extractUrlQuery,
  parseParams,
  FilterTypes,
  ProductListParams,
  getFilterTypes,
  ProductFiltersDocument,
  ProductListQuery,
  ProductFiltersQuery,
  hasUserFilterActive,
} from '@graphcommerce/magento-product'
import {
  SearchField,
  productListApplySearchDefaults,
  searchDefaultsToProductListFilters,
  useProductList,
} from '@graphcommerce/magento-search'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, LayoutHeader } from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import {
  ProductListLayoutClassic,
  ProductListLayoutDefault,
  ProductListLayoutSidebar,
  LayoutDocument,
  LayoutNavigation,
  LayoutNavigationProps,
} from '../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'
import { productFiltersPro, productFiltersLayout } from '@graphcommerce/next-config/config'

type SearchResultProps = MenuQueryFragment &
  ProductListQuery &
  ProductFiltersQuery & { filterTypes: FilterTypes; params: ProductListParams }
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
      <PageMeta
        title={search ? t`Results for ‘${search}’` : t`Search`}
        metaRobots={['noindex']}
        canonical='/search'
      />
      <LayoutHeader floatingMd switchPoint={0} hideMd>
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

  const filters = hasUserFilterActive(productListParams)
    ? staticClient.query({
        query: ProductFiltersDocument,
        variables: searchDefaultsToProductListFilters(
          productListApplySearchDefaults(productListParams, (await conf).data),
        ),
      })
    : undefined

  const products = staticClient.query({
    query: ProductListDocument,
    variables: productListApplySearchDefaults(productListParams, (await conf).data),
  })

  const result = {
    props: {
      ...(await products).data,
      ...(await filters)?.data,
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
