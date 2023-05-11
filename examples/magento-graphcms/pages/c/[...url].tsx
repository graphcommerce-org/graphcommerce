import { hasProps } from '@graphcommerce/next-ui/server'
import { GetServerSideProps } from 'next'
import CategoryPageData, { getStaticProps } from '../[...url]'

export default CategoryPageData

export const getServerSideProps: GetServerSideProps = async (context) => {
  const result = await getStaticProps(context)
  if (hasProps(result)) return { props: result.props }

  context.res.setHeader(
    'Cache-Control',
    `public, s-maxage=${10 * 60}, stale-while-revalidate=${20 * 60}`,
  )
  return result
}
