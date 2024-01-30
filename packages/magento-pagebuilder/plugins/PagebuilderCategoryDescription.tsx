import { CategoryDescription } from '@graphcommerce/magento-category'
import type { ReactPlugin } from '@graphcommerce/next-config'
import { Pagebuilder } from '../components/Pagebuilder/Pagebuilder'

export const component = 'CategoryDescription'
export const exported = '@graphcommerce/magento-category'

const PagebuilderProductPageDescription: ReactPlugin<typeof CategoryDescription> = (props) => {
  const { Prev, category, ...rest } = props

  return (
    <Pagebuilder pagebuilder={category.pagebuilder}>
      <Prev category={category} {...rest} />
    </Pagebuilder>
  )
}

export const Plugin = PagebuilderProductPageDescription
