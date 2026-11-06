import { flushMeasurePerf } from '@graphcommerce/graphql'
import type { GetServerSideProps } from '@graphcommerce/next-ui'
import type { LayoutNavigationProps } from '../../components'
import type { CategoryProps, CategoryRoute } from '../[...url]'
import CategoryPage, { getStaticProps } from '../[...url]'

export default CategoryPage

type GetSSP = GetServerSideProps<LayoutNavigationProps, CategoryProps, CategoryRoute>

export const getServerSideProps: GetSSP = async (context) => {
  const result = await getStaticProps(context)
  delete result.revalidate

  context.res.setHeader(
    'Cache-Control',
    `public, s-maxage=${10 * 60}, stale-while-revalidate=${20 * 60}`,
  )

  flushMeasurePerf()
  return result
}
