import type { ProductFiltersProContext } from '@graphcommerce/magento-product'
import { ProductFiltersPro, useProductFiltersPro } from '@graphcommerce/magento-product'
import { createTheme, ThemeProvider } from '@mui/material'
import { renderToString } from 'react-dom/server'
import { beforeEach, expect, it, vi } from 'vitest'
import type { ProductListParams } from '../ProductListItems/filterTypes'

const router = vi.hoisted(() => ({
  asPath: '',
  query: {},
  push: vi.fn(async () => true),
  replace: vi.fn(async () => true),
}))

vi.mock('next/router', () => ({ useRouter: () => router }))

const theme = { ...createTheme(), appShell: { headerHeightSm: '0px' } }

function renderFilters(params: Partial<ProductListParams>) {
  let context: ProductFiltersProContext | undefined

  function ReadContext() {
    context = useProductFiltersPro()
    return null
  }

  renderToString(
    <ThemeProvider theme={theme}>
      <ProductFiltersPro
        params={{ url: 'shoes', filters: {}, sort: {}, pageSize: null, search: null, ...params }}
        aggregations={[]}
        appliedAggregations={[]}
        filterTypes={{}}
      >
        <ReadContext />
      </ProductFiltersPro>
    </ThemeProvider>,
  )

  return context as ProductFiltersProContext
}

beforeEach(() => {
  router.push.mockClear()
})

it('stays on the page of the list when the filter fields add empty filters', async () => {
  router.asPath = '/shoes/page/2'
  const { form, submit } = renderFilters({ currentPage: 2 })

  form.setValue('filters.color', {})
  await submit()

  expect(router.push).not.toHaveBeenCalled()
})

it('keeps the query string of the request when the filter fields add empty filters', async () => {
  router.asPath = '/shoes?gclid=abc'
  const { form, submit } = renderFilters({ currentPage: 1 })

  form.setValue('filters.color', {})
  await submit()

  expect(router.push).not.toHaveBeenCalled()
})

it('goes to the first page of the list for a changed filter', async () => {
  router.asPath = '/shoes/page/2'
  const { form, submit } = renderFilters({ currentPage: 2 })

  form.setValue('filters.color', { in: ['red'] })
  await submit()

  expect(router.push).toHaveBeenCalledWith(
    '/c/shoes/q/color/red',
    '/c/shoes/q/color/red',
    expect.anything(),
  )
})
