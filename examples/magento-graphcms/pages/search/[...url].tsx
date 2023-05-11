import { hasProps } from '@graphcommerce/next-ui/server'
import { GetServerSideProps } from 'next'
import SearchResultPage, { getStaticProps } from './index'

export default SearchResultPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const result = await getStaticProps(context)
  if (hasProps(result)) return { props: result.props }
  return result
}
