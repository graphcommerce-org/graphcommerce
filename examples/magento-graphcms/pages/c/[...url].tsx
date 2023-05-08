import { enhanceServerSideProps, hasProps } from '@graphcommerce/next-ui/server'
import { GetServerSidePropsContext } from 'next'
import CategoryPageData, { getStaticProps, CategoryRoute } from '../[...url]'

export default CategoryPageData

export const getServerSideProps = enhanceServerSideProps(
  async (context: GetServerSidePropsContext<CategoryRoute>) => {
    const result = await getStaticProps(context)

    if (hasProps(result)) return { props: result.props }

    context.res.setHeader(
      'Cache-Control',
      `public, s-maxage=${10 * 60}, stale-while-revalidate=${20 * 60}`,
    )
    return result
  },
)
