import { Chip, ChipProps } from '@material-ui/core'
import cloneDeep from 'clone-deep'
import CategoryLink from 'components/Category/CategoryLink'
import { ProductListParams } from 'components/Product/ProductListItems/filterTypes'
import React from 'react'

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
      {children?.map((category) => {
        if (!category?.url_path || !category.id || !category.name) return null
        const linkParams = cloneDeep(params)
        linkParams.url = category.url_path
        delete linkParams.currentPage

        return (
          <CategoryLink key={category.id} {...linkParams} underline='none'>
            <Chip clickable color='default' label={category.name} {...chipProps} />
          </CategoryLink>
        )
      })}
    </>
  )
}
