import { GetStaticProps } from 'next'
import PageWithLayout, { getStaticProps as getCmsPageStaticProps } from 'pages/page/[url]'

export default PageWithLayout

export const getStaticProps: GetStaticProps = async () => {
  return getCmsPageStaticProps({ params: { url: '/' } })
}
