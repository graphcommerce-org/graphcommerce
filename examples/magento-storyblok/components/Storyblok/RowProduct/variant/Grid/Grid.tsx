import { ContainerWithHeader } from '@graphcommerce/next-ui'
import { multilinkHref } from '@graphcommerce/storyblok-ui'
import { Link } from '@mui/material'
import { ProductListItems } from '../../../../ProductListItems/ProductListItems'
import type { RowProductVariantProps } from '../../RowProduct'

export function Grid(props: RowProductVariantProps) {
  const { blok, items } = props

  return (
    <ContainerWithHeader
      title={blok.title ?? ''}
      rightArea={blok.page_links?.map((pageLink) => (
        <Link
          color='inherit'
          href={multilinkHref(pageLink.url)}
          key={pageLink._uid}
          underline='always'
        >
          {pageLink.title}
        </Link>
      ))}
    >
      <ProductListItems title={blok.title ?? ''} items={items} size='small' titleComponent='h3' />
    </ContainerWithHeader>
  )
}
