import { GetStaticProps } from 'next'
import CmsPage, { getStaticProps as getCmsPageStaticProps } from 'pages/page/[url]'

export default CmsPage

export const getStaticProps: GetStaticProps = async () => {
  return getCmsPageStaticProps({ params: { url: '/' } })
}
