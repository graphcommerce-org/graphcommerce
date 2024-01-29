import { CmsPageContent } from '@graphcommerce/magento-cms'
import type { ReactPlugin } from '@graphcommerce/next-config'
import { Pagebuilder } from '../components/Pagebuilder/Pagebuilder'

export const component = 'CmsPageContent'
export const exported = '@graphcommerce/magento-cms'

const PagebuilderCmsPageContent: ReactPlugin<typeof CmsPageContent> = (props) => {
  const { Prev, pagebuilder, ...rest } = props
  return (
    <Pagebuilder pagebuilder={pagebuilder}>
      <Prev {...rest} />
    </Pagebuilder>
  )
}

export const Plugin = PagebuilderCmsPageContent
