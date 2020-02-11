import { GraphCmsPage, PageMeta, Breadcrumbs, Language } from '../graphcms'

const WebsiteLayout: GraphCmsPage['getLayout'] = (page, props) => {
  return (
    <>
      <PageMeta {...props} />
      <Breadcrumbs {...props} />
      <Language {...props} />
      {page}
    </>
  )
}
export { WebsiteLayout }
