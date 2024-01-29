import { CategoryDescription } from '@graphcommerce/magento-category'
import type { ReactPlugin } from '@graphcommerce/next-config'
import { Pagebuilder } from '../components/Pagebuilder/Pagebuilder'

export const component = 'CategoryDescription'
export const exported = '@graphcommerce/magento-category'

const PagebuilderProductPageDescription: ReactPlugin<typeof CategoryDescription> = (props) => {
  const { Prev, pagebuilder, ...rest } = props

  return (
    <Pagebuilder pagebuilder={pagebuilder}>
      <Prev {...rest} />
    </Pagebuilder>
  )
}

export const Plugin = PagebuilderProductPageDescription
