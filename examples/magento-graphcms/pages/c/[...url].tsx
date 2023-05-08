import { enhanceServerSideProps } from '@graphcommerce/next-ui/server'
import { LayoutNavigationProps } from '../../components'
import CategoryPageData, { getStaticProps, CategoryProps, CategoryRoute } from '../[...url]'

export default CategoryPageData

export const getServerSideProps = enhanceServerSideProps<
  LayoutNavigationProps,
  CategoryProps,
  CategoryRoute
>(async (context) => {
  const result = await getStaticProps(context)
  delete result.revalidate

  context.res.setHeader(
    'Cache-Control',
    `public, s-maxage=${10 * 60}, stale-while-revalidate=${20 * 60}`,
  )

  return result
})
