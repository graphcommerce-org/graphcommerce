import type { SortEnum } from '@graphcommerce/graphql-mesh'
import { IconSvg, iconArrowDown, iconArrowUp } from '@graphcommerce/next-ui'

type Props = {
  sortDirection: SortEnum | null
}

export function ProductFiltersProSortDirectionArrow({ sortDirection }: Props) {
  return (
    <IconSvg
      src={sortDirection === 'ASC' || sortDirection === null ? iconArrowUp : iconArrowDown}
      sx={{ display: 'flex' }}
    />
  )
}
