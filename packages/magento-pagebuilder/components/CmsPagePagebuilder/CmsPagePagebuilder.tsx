import type { CmsPageContentProps } from '@graphcommerce/magento-cms'
import { CmsPageContent } from '@graphcommerce/magento-cms'
import { Pagebuilder } from '../Pagebuilder/Pagebuilder'

export function CmsPagePagebuilder(props: CmsPageContentProps) {
  const { pagebuilder, ...contentProps } = props
  return (
    <Pagebuilder pagebuilder={pagebuilder}>
      <CmsPageContent {...contentProps} />
    </Pagebuilder>
  )
}
