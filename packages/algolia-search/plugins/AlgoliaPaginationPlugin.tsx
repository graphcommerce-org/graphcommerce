import { ProductPaginationProps } from '@graphcommerce/magento-product'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { Pagination } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { usePagination } from 'react-instantsearch-hooks'

export const component = 'ProductListPagination'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'demoMode'

function AlgoliaPagination({ page_info, params, ...paginationProps }: ProductPaginationProps) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { nbPages, refine, currentRefinement } = usePagination()
  const router = useRouter()

  const handlePagination = (destinationPage: number) => {
    const path = router.route.split('/')[1]
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push(`/${path}/page/${destinationPage}`, undefined, {
      shallow: true,
    })
    refine(destinationPage - 1)
  }

  return (
    <Pagination
      count={nbPages ?? 0}
      page={currentRefinement + 1}
      renderLink={(page, icon, btnProps) => (
        <Box {...btnProps} color='inherit' onClick={() => handlePagination(page)}>
          {icon}
        </Box>
      )}
      {...paginationProps}
    />
  )
}

/**
 * Example plugin to enable algolia search if the `demoMode` config is set to true
 *
 * You might want to:
 *
 * - Remove the `ifConfig` to always enable this.
 * - Create your own plugins https://www.graphcommerce.org/docs/framework/plugins-react
 */
function AlgoliaPaginationPlugin(props: PluginProps<ProductPaginationProps>) {
  const { Prev } = props
  const router = useRouter()
  if (!router.asPath.includes('/search')) return <Prev {...props} />

  return <AlgoliaPagination {...props} />
}

export const Plugin = AlgoliaPaginationPlugin
