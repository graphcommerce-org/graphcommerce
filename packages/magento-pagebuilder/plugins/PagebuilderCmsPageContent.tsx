import { CmsPageContentProps } from '@graphcommerce/magento-cms'
import type { PluginProps } from '@graphcommerce/next-config'
import { Pagebuilder } from '../components/Pagebuilder/Pagebuilder'

export const component = 'CmsPageContent'
export const exported = '@graphcommerce/magento-cms'

function PagebuilderCategoryDescription(props: PluginProps<CmsPageContentProps>) {
  const { Prev, pagebuilder, ...rest } = props
  return (
    <Pagebuilder pagebuilder={pagebuilder}>
      <Prev {...rest} />
    </Pagebuilder>
  )
}

export const Plugin = PagebuilderCategoryDescription
