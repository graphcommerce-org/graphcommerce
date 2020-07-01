import React from 'react'
import { Chip, ChipProps } from '@material-ui/core'
import { ProductListParams } from 'components/ProductList'
import { CategoryLink } from 'components/CategoryLink'

type CategoryChildrenProps = GQLCategoryChildrenFragment &
  Omit<ChipProps, 'children' | 'clickable' | 'color' | 'label' | 'component'> & {
    params: ProductListParams
  }

export default function CategoryChildren({
  children,
  params,
  ...chipProps
}: CategoryChildrenProps) {
  return (
    <>
      {children.map((category) => {
        const linkParams: ProductListParams = {
          ...params,
          filters: { ...params.filters },
          url: category.url_path,
        }
        delete linkParams.currentPage

        return (
          <Chip
            key={category.id}
            clickable
            color='default'
            label={category.name}
            {...chipProps}
            component={(linkProps) => (
              <CategoryLink {...linkProps} {...linkParams} underline='none' />
            )}
          />
        )
      })}
    </>
  )
}
