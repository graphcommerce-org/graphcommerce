import { cloneDeep } from '@graphcommerce/graphql'
import { iconCancelAlt, IconSvg } from '@graphcommerce/next-ui'
import { Chip, ChipProps, SxProps, Theme } from '@mui/material'
import { useProductListLinkReplace } from '../../hooks/useProductListLinkReplace'
import { useProductListParamsContext } from '../../hooks/useProductListParamsContext'
import { ProductListLink } from '../ProductListLink/ProductListLink'
import { FilterIn } from './FilterEqualType'
import { ProductListFiltersFragment } from './ProductListFilters.gql'

type Filter = NonNullable<NonNullable<ProductListFiltersFragment['aggregations']>[number]>
export type FilterCheckboxTypeProps = Filter &
  Omit<ChipProps<'button'>, 'selected' | 'onDelete' | 'component'> & { sx?: SxProps<Theme> }

export function FilterCheckboxType(props: FilterCheckboxTypeProps) {
  const { attribute_code, count, label, options, ...chipProps } = props
  const { params } = useProductListParamsContext()
  const currentFilter = params.filters[attribute_code]
  const replaceRoute = useProductListLinkReplace({ scroll: false })

  if (!options?.[0]) return null

  const option = options?.[1]?.value === '1' ? options[1] : options[0]
  const isActive = currentFilter?.in?.includes(option.value)

  const filter = isActive ? {} : ({ in: [option.value] } as FilterIn)

  return (
    <ProductListLink
      {...params}
      filters={{ ...params.filters, [attribute_code]: filter }}
      currentPage={undefined}
      noLink
      link={{ replace: true, prefetch: false }}
    >
      <Chip
        component='button'
        color={isActive ? 'primary' : 'default'}
        onDelete={
          isActive
            ? () => {
                const linkParams = cloneDeep(params)

                delete linkParams.currentPage
                delete linkParams.filters[attribute_code]

                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                replaceRoute(linkParams)
              }
            : undefined
        }
        deleteIcon={isActive ? <IconSvg src={iconCancelAlt} size='small' /> : undefined}
        label={label}
        clickable
        {...chipProps}
      />
    </ProductListLink>
  )
}
