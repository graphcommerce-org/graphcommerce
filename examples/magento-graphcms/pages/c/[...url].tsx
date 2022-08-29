import { flushMeasurePerf } from '@graphcommerce/graphql'
import CategoryPage, { getStaticProps, GetPageStaticProps } from '../[...url]'

export default CategoryPage

export const getServerSideProps: GetPageStaticProps = async (context) => {
  const result = await getStaticProps(context)
  delete result.revalidate
  flushMeasurePerf()
  return result
}
