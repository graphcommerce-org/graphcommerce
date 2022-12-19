import { CategoryDescriptionProps } from '@graphcommerce/magento-category'
import type { PluginProps } from '@graphcommerce/next-config'
import { Pagebuilder } from '../components/Pagebuilder/Pagebuilder'

export const component = 'CategoryDescription'
export const exported = '@graphcommerce/magento-category'

function PagebuilderCategoryDescription(props: PluginProps<CategoryDescriptionProps>) {
  const { Prev, pagebuilder, ...rest } = props
  return (
    <Pagebuilder pagebuilder={pagebuilder}>
      <Prev {...rest} />
    </Pagebuilder>
  )
}

export const Plugin = PagebuilderCategoryDescription
