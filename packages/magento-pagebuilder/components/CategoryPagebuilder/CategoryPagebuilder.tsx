import type { CategoryDescriptionProps } from '@graphcommerce/magento-category'
import { CategoryDescription } from '@graphcommerce/magento-category'
import { Pagebuilder } from '../Pagebuilder/Pagebuilder'

export function CategoryPagebuilder(props: CategoryDescriptionProps) {
  const { pagebuilder, ...otherProps } = props

  return (
    <Pagebuilder pagebuilder={pagebuilder}>
      <CategoryDescription {...otherProps} />
    </Pagebuilder>
  )
}
