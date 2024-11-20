import { flushMeasurePerf } from '@graphcommerce/graphql'
import { GetServerSideProps } from '@graphcommerce/next-ui'
import { LayoutNavigationProps } from '../../components'
import CategoryPage, { getStaticProps, CategoryProps, CategoryRoute } from '../[...url]'

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
