import CmsPage, { GetPageStaticProps, getStaticProps as getCmsPageStaticProps } from './page/[url]'

export default CmsPage

export const getStaticProps: GetPageStaticProps = async ({ locale, ...rest }) =>
  getCmsPageStaticProps({ params: { url: 'home' }, locale, ...rest })
