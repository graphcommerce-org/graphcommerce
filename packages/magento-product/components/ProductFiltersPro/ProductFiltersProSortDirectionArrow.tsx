import type { SortEnum } from '@graphcommerce/graphql-mesh'
import { IconSvg, iconArrowDown, iconArrowUp } from '@graphcommerce/next-ui'

export type ProductFiltersProSortDirectionArrowProps = {
  sortDirection: SortEnum | null
}

export function ProductFiltersProSortDirectionArrow({
  sortDirection,
}: ProductFiltersProSortDirectionArrowProps) {
  return (
    <IconSvg
      src={sortDirection === 'ASC' || sortDirection === null ? iconArrowUp : iconArrowDown}
      sx={{ display: 'flex' }}
    />
  )
}
