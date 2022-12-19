import { ProductPageDescriptionProps } from '@graphcommerce/magento-product'
import type { PluginProps } from '@graphcommerce/next-config'
import { Pagebuilder } from '../components/Pagebuilder/Pagebuilder'

export const component = 'CmsPageContent'
export const exported = '@graphcommerce/magento-product'

function PagebuilderCategoryDescription(props: PluginProps<ProductPageDescriptionProps>) {
  const { Prev, description, ...rest } = props
  return (
    <Pagebuilder pagebuilder={description?.pagebuilder}>
      <Prev {...rest} />
    </Pagebuilder>
  )
}

export const Plugin = PagebuilderCategoryDescription
