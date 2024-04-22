import { ActionCard, ActionCardAccordion, ActionCardListForm, Button } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { CategoryDefaultFragment } from '../ProductListItems/CategoryDefault.gql'
import { ProductListSortFragment } from '../ProductListSort/ProductListSort.gql'
import { useProductFiltersPro } from './ProductFiltersPro'
import { useProductFiltersProSort } from './useProductFiltersProSort'

export type ProductFiltersProSortSectionProps = ProductListSortFragment & {
  category?: CategoryDefaultFragment
}

export function ProductFiltersProSortSection(props: ProductFiltersProSortSectionProps) {
  const { form } = useProductFiltersPro()
  const { options, showReset, selected } = useProductFiltersProSort(props)

  return (
    <ActionCardAccordion
      defaultExpanded={selected}
      summary={<Trans id='Sort By' />}
      details={
        <ActionCardListForm
          control={form.control}
          name='sort'
          layout='list'
          variant='default'
          size='medium'
          render={ActionCard}
          items={options}
        />
      }
      right={
        showReset ? (
          <Button
            color='primary'
            onClick={(e) => {
              e.stopPropagation()
              form.setValue('sort', null)
              form.setValue('dir', null)
              form.setValue('currentPage', 1)
            }}
          >
            <Trans id='Clear' />
          </Button>
        ) : undefined
      }
    />
  )
}
