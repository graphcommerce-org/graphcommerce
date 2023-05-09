import { enhanceServerSideProps, hasProps } from '@graphcommerce/next-ui/server'
import { GetServerSidePropsContext } from 'next'
import SearchResultPage, { getStaticProps, RouteProps } from './index'

export default SearchResultPage

export const getServerSideProps = enhanceServerSideProps(
  async (context: GetServerSidePropsContext<RouteProps>) => {
    const result = await getStaticProps(context)

    if (hasProps(result)) return { props: result.props }

    return result
  },
)
