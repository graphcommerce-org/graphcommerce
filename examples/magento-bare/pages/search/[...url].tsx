import SearchResultPage, { getStaticProps, GetPageStaticProps } from './index'

export default SearchResultPage

export const getServerSideProps: GetPageStaticProps = async (context) => {
  const result = await getStaticProps(context)
  delete result.revalidate
  return result
}
