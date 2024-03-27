import { SortEnum } from '@graphcommerce/graphql-mesh'
import { IconSvg } from '@graphcommerce/next-ui'
import * as IconArrowDown from '@graphcommerce/next-ui/icons/arrow-down.svg'
import * as IconArrowUp from '@graphcommerce/next-ui/icons/arrow-up.svg'

type Props = {
  sortDirection: SortEnum | null
}

export function ProductFiltersProSortDirectionArrow({ sortDirection }: Props) {
  return (
    <IconSvg
      src={sortDirection === 'ASC' || sortDirection === null ? IconArrowUp : IconArrowDown}
      sx={{ display: 'flex' }}
    />
  )
}
