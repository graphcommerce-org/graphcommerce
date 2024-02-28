import { CategoryQueryFragment, useCategoryTree } from '@graphcommerce/magento-category'
import { ActionCard, ActionCardAccordion, ActionCardList } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { useRouter } from 'next/router'
import { ProductListParams } from '../ProductListItems/filterTypes'

export type ProductFiltersCategorySectionProps = CategoryQueryFragment & {
  params?: ProductListParams
}

export function ProductFiltersProCategorySection(props: ProductFiltersCategorySectionProps) {
  const { categories, params } = props
  const router = useRouter()
  const CategoryTree = useCategoryTree({ categories, params })

  if (!CategoryTree) return null

  return (
    <ActionCardAccordion
      defaultExpanded={false}
      summary={<Trans id='Categories' />}
      details={
        <ActionCardList value='Categories' variant='default'>
          {CategoryTree.map((item) => (
            <ActionCard
              {...item}
              key={item.value ?? ''}
              value={item.value}
              selected={item.active}
              onClick={() => router.push(item.value)}
            />
          ))}
        </ActionCardList>
      }
      right={undefined}
    />
  )
}
