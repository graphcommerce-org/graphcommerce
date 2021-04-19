import CmsPage, { getStaticProps as getCmsPageStaticProps } from './page/[url]'

export default CmsPage

export const getStaticProps = () => getCmsPageStaticProps({ params: { url: 'no-route' } })
