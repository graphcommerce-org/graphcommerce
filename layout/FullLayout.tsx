import Head from 'next/head'
import { GraphCmsPage, PageMeta, Breadcrumbs, Language } from '../graphcms'

const FullLayout: GraphCmsPage['layout'] = ({ children, ...props }) => {
  return (
    <>
      <Head>
        <meta name='theme-color' content='#efefef' />
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
      </Head>
      <PageMeta {...props} />
      <Breadcrumbs {...props} />
      <Language {...props} />
      {children}
    </>
  )
}
export { FullLayout }
