import { ProductListItemRenderer } from '@graphcommerce/magento-product'
import { LazyHydrate, RenderType, TypeRenderer } from '@graphcommerce/next-ui'
import { memo } from 'react'
import { RowBlogContent } from '../Blog'
import { PageContentQueryFragment } from './PageContentQueryFragment.gql'
import { RowButtonLinkList } from './RowButtonLinkList/RowButtonLinkList'
import { RowColumnOne } from './RowColumnOne/RowColumnOne'
import { RowColumnThree } from './RowColumnThree/RowColumnThree'
import { RowColumnTwo } from './RowColumnTwo/RowColumnTwo'
import { RowContentLinks } from './RowContentLinks/RowContentLinks'
import { RowHeroBanner } from './RowHeroBanner/RowHeroBanner'
import { RowLinks } from './RowLinks/RowLinks'
import { RowProduct } from './RowProduct/RowProduct'
import { RowQuote } from './RowQuote/RowQuote'
import { RowRendererFragment } from './RowRenderer.gql'
import { RowServiceOptions } from './RowServiceOptions/RowServiceOptions'
import { RowSpecialBanner } from './RowSpecialBanner/RowSpecialBanner'

export type ContentTypeRenderer = TypeRenderer<PageContentQueryFragment['pages'][0]['content'][0]>

export const defaultRenderer: { [key: string]: (props) => React.ReactElement } = {
  RowColumnOne,
  RowColumnTwo,
  RowColumnThree,
  RowHeroBanner,
  RowSpecialBanner,
  RowQuote,
  // RowBlogContent,
  RowButtonLinkList,
  RowServiceOptions,
  RowContentLinks,
  RowProduct,
  RowLinks,
}

export type PageProps = RowRendererFragment & {
  renderer?: Partial<ContentTypeRenderer>
  loadingEager?: number
  productListItemRenderer?: ProductListItemRenderer
}

export const RowRenderer = memo<PageProps>((props) => {
  const { content, renderer, productListItemRenderer, loadingEager = 2 } = props
  const mergedRenderer = { ...defaultRenderer, ...renderer } as ContentTypeRenderer

  return (
    <>
      {content?.map((item, index) => (
        <LazyHydrate key={item.id} hydrated={index < loadingEager ? true : undefined} height={500}>
          {item.__typename === 'RowProduct' && (
            <RenderType
              renderer={mergedRenderer}
              productListItemRenderer={productListItemRenderer}
              {...item}
            />
          )}
          {item.__typename !== 'RowProduct' && <RenderType renderer={mergedRenderer} {...item} />}
        </LazyHydrate>
      ))}
    </>
  )
})
