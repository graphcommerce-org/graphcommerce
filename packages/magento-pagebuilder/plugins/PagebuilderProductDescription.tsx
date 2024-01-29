import { ProductPageDescription } from '@graphcommerce/magento-product'
import type { ReactPlugin } from '@graphcommerce/next-config'
import { Pagebuilder } from '../components/Pagebuilder/Pagebuilder'

export const component = 'ProductPageDescription'
export const exported = '@graphcommerce/magento-product'

const PagebuilderProductPageDescription: ReactPlugin<typeof ProductPageDescription> = (props) => {
  const { Prev, pagebuilder, ...rest } = props
  return (
    <Pagebuilder pagebuilder={pagebuilder}>
      <Prev {...rest} />
    </Pagebuilder>
  )
}

export const Plugin = PagebuilderProductPageDescription
