import { renderToString } from 'react-dom/server'
import { expect, it, vi } from 'vitest'
import { productListLink } from '../../hooks/useProductListLink'
import { useRouterFilterParams } from './filteredProductList'

vi.mock('next/router', () => ({ useRouter: () => ({ asPath: '/shoes?gclid=abc' }) }))

function PageTwoLink() {
  const { params } = useRouterFilterParams({ filterTypes: {} })
  return params ? productListLink({ ...params, currentPage: 2 }) : null
}

it('leaves the query string of the request out of the pagination links', () => {
  expect(renderToString(<PageTwoLink />)).toBe('/shoes/page/2')
})
