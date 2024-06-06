import { useForm, useWatch } from '@graphcommerce/ecommerce-ui'
import { UseCategoryTreeProps, useCategoryTree } from '@graphcommerce/magento-category'
import {
  ActionCard,
  ActionCardListForm,
  ChipOverlayOrPopper,
  ChipOverlayOrPopperProps,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { useRouter } from 'next/router'

export type CategoryFilterProps = UseCategoryTreeProps &
  Omit<
    ChipOverlayOrPopperProps,
    'label' | 'selected' | 'selectedLabel' | 'onApply' | 'onReset' | 'onClose' | 'children'
  >

export function ProductFiltersProCategoryChip(props: CategoryFilterProps) {
  const { category, params, ...rest } = props
  const form = useForm()
  const router = useRouter()
  const activeCategory = useWatch({ control: form.control, name: 'category' })

  const CategoryTree = useCategoryTree(props)

  if (!CategoryTree) return null

  const submit = form.handleSubmit((formValues) =>
    formValues.category ? router.push(formValues.category as string) : undefined,
  )

  return (
    <ChipOverlayOrPopper
      {...rest}
      overlayProps={{ sizeSm: 'minimal', sizeMd: 'minimal', ...rest.overlayProps }}
      label={<Trans id='Categories' />}
      selected={Boolean(CategoryTree.find((option) => option.selected))}
      selectedLabel={CategoryTree.find((option) => option.selected)?.href}
      onApply={submit}
      onClose={submit}
      onReset={activeCategory ? () => form.setValue('category', null) : undefined}
    >
      {() => (
        <ActionCardListForm
          name='category'
          layout='list'
          variant='default'
          size='medium'
          render={ActionCard}
          items={CategoryTree}
          control={form.control}
        />
      )}
    </ChipOverlayOrPopper>
  )
}
