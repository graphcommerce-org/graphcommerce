import { enhanceServerSideProps } from '@graphcommerce/next-ui/server'
import { LayoutNavigationProps } from '../../components/Layout/LayoutNavigation'
import SearchResultPage, { getStaticProps, SearchResultProps, RouteProps } from './index'

export default SearchResultPage

export const getServerSideProps = enhanceServerSideProps<
  LayoutNavigationProps,
  SearchResultProps,
  RouteProps
>(async (context) => {
  const result = await getStaticProps(context)
  delete result.revalidate
  return result
})
