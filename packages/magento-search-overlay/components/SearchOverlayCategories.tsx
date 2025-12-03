import { productListLink } from '@graphcommerce/magento-product'
import { useCategorySearch, type CategorySearchResultFragment } from '@graphcommerce/magento-search'
import type { SectionContainerProps } from '@graphcommerce/next-ui'
import { filterNonNullableKeys, NextLink, SectionContainer } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import type {
  BreadcrumbsProps,
  LinkProps,
  ListItemButtonProps,
  TypographyProps,
} from '@mui/material'
import { Breadcrumbs, Typography } from '@mui/material'
import { forwardRef } from 'react'
import { SearchOverlayItem } from './SearchOverlayItem'
import { useSearchOverlay } from './SearchOverlayProvider'

type SearchOverlayCategoriesProps = {
  slotProps?: {
    link?: Omit<LinkProps, 'href'>
    breadcrumbs?: BreadcrumbsProps
    typography?: TypographyProps
    sectionContainer?: SectionContainerProps
  }
}

type SearchOverlayCategoryProps = {
  category: CategorySearchResultFragment
  slotProps?: {
    listItemButton?: Omit<ListItemButtonProps<'a'>, 'href'>
    breadcrumbs?: BreadcrumbsProps
    typography?: TypographyProps
  }
}

const SearchOverlayCategory = forwardRef<HTMLAnchorElement, SearchOverlayCategoryProps>(
  (props, ref) => {
    const { category, slotProps } = props

    return (
      <SearchOverlayItem
        component={NextLink}
        ref={ref}
        href={productListLink({
          filters: { category_uid: { in: [category.uid] } },
          sort: {},
          url: category.url_path ?? '',
        })}
        {...slotProps?.listItemButton}
      >
        <Breadcrumbs {...slotProps?.breadcrumbs}>
          {filterNonNullableKeys(category.breadcrumbs, ['category_name']).map((breadcrumb) => (
            <Typography
              key={breadcrumb.category_name}
              {...slotProps?.typography}
              sx={{
                color: 'text.primary',
              }}
            >
              {breadcrumb.category_name}
            </Typography>
          ))}
          <Typography
            {...slotProps?.typography}
            sx={{
              color: 'text.primary',
            }}
          >
            {category.name}
          </Typography>
        </Breadcrumbs>
      </SearchOverlayItem>
    )
  },
)

SearchOverlayCategory.displayName = 'SearchOverlayCategory'

export function SearchOverlayCategories(props: SearchOverlayCategoriesProps) {
  const { params } = useSearchOverlay()
  const { search } = params

  const { slotProps = {} } = props
  const { sectionContainer: sectionContainerProps = {} } = slotProps

  const categoryItems = useCategorySearch({ search })
  if (!categoryItems) return null

  return (
    <SectionContainer labelLeft={<Trans>Categories</Trans>} {...sectionContainerProps}>
      {categoryItems.map((category) => (
        <SearchOverlayCategory key={category.uid} category={category} slotProps={slotProps} />
      ))}
    </SectionContainer>
  )
}
