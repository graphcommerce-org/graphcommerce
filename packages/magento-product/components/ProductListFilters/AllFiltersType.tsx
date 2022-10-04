import { UseFormReturn } from "@graphcommerce/ecommerce-ui";
import { cloneDeep } from "@graphcommerce/graphql";
import { ProductAttributeFilterInput } from "@graphcommerce/graphql-mesh";
import { ChipMenu, ActionCardListForm, extendableComponent, ChipMenuProps } from "@graphcommerce/next-ui";
import { useState } from "react";
import { useProductListLinkReplace } from "../../hooks/useProductListLinkReplace";
import { useProductListParamsContext } from "../../hooks/useProductListParamsContext";
import { useFilterActions } from "./helpers/filterActions";
import { ProductListFiltersFragment } from "./ProductListFilters.gql";

type OwnerState = {
  isColor: boolean
  isActive: boolean
}
const componentName = 'FilterEqual' as const
const parts = [
  'listItem',
  'listItemInnerContainer',
  'checkbox',
  'linkContainer',
  'button',
  'resetButton',
  'filterAmount',
  'filterLabel',
  'isColor',
  'isActive',
] as const

const { classes, selectors, withState } = extendableComponent<
  OwnerState,
  typeof componentName,
  typeof parts
>(componentName, parts)


type Filter = NonNullable<NonNullable<ProductListFiltersFragment['aggregations']>[number]>

type AllFiltersTypeProps = Filter &
  Omit<ChipMenuProps, 'selected' | 'openEl' | 'setOpenEl'> & {
    filterForm: UseFormReturn<ProductAttributeFilterInput, any>
  }


export function AllFiltersType(props: AllFiltersTypeProps) {
  const { attribute_code, count, label, options, __typename, filterForm, ...chipProps } = props
  const [openEl, setOpenEl] = useState<null | HTMLElement>(null)
  const { params } = useProductListParamsContext()
  const { control, reset } = filterForm
  const {emptyFilters, resetFilters} = useFilterActions({params, attribute_code, reset})

  const currentFilter = cloneDeep(params.filters[attribute_code]) ?? {
    in: [],
  }

  const currentLabels =
    options
      ?.filter((option) => option && currentFilter.in?.includes(option.value))
      .map((option) => option && option.label) ?? []

    return (
    <ChipMenu
      variant='outlined'
      {...chipProps}
      openEl={openEl}
      setOpenEl={setOpenEl}
      onReset={emptyFilters}
      onDelete={resetFilters}
      label={label}
      selected={currentLabels.length > 0}
      selectedLabel={currentLabels.length > 0 ? currentLabels.join(', ') : undefined}
      className={componentName}
    >
      <ActionCardListForm
        name={`${attribute_code}.in`}
        control={control}
        multiple
        layout='grid'
        items={
          options?.map((option) => ({
            option,
            attribute_code,
            params,
            currentFilter,
            value: option?.value ?? '',
          })) ?? []
        }
        render={AllFilterActionCard}
      />
    </ChipMenu>
  )
  )
}