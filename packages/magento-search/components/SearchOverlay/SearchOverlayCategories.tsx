import { useQuery } from '@graphcommerce/graphql'
import { productListLink } from '@graphcommerce/magento-product'
import {
  SectionContainerProps,
  filterNonNullableKeys,
  SectionContainer,
  NextLink,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import {
  LinkProps,
  BreadcrumbsProps,
  TypographyProps,
  Breadcrumbs,
  Typography,
  ListItemButtonProps,
} from '@mui/material'
import { forwardRef } from 'react'
import { CategorySearchDocument } from '../../CategorySearch.gql'
import { CategorySearchResultFragment } from '../CategorySearchResult/CategorySearchResult.gql'
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
          filters: { category_uid: { eq: category.uid } },
          sort: {},
          url: category.url_path ?? '',
        })}
        {...slotProps?.listItemButton}
      >
        <Breadcrumbs {...slotProps?.breadcrumbs}>
          {filterNonNullableKeys(category.breadcrumbs, ['category_name']).map((breadcrumb) => (
            <Typography
              color='text.primary'
              key={breadcrumb.category_name}
              {...slotProps?.typography}
            >
              {breadcrumb.category_name}
            </Typography>
          ))}
          <Typography color='text.primary' {...slotProps?.typography}>
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

  const categories = useQuery(CategorySearchDocument, {
    variables: { search, pageSize: 5 },
    skip: !search || search.length < 3,
  })
  const categoryItems = filterNonNullableKeys(
    categories.data?.categories?.items ?? categories.previousData?.categories?.items,
  ).filter((c) => c.include_in_menu)

  if (categories.error || categoryItems.length === 0 || !search) return null

  return (
    <SectionContainer labelLeft={<Trans>Categories</Trans>} {...sectionContainerProps}>
      {categoryItems.map((category) => (
        <SearchOverlayCategory key={category.uid} category={category} slotProps={slotProps} />
      ))}
    </SectionContainer>
  )
}
