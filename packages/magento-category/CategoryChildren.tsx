import { cloneDeep } from '@apollo/client/utilities'
import { Chip, ChipProps } from '@material-ui/core'
import { ProductListParams } from '@reachdigital/magento-product/ProductListItems/filterTypes'
import React from 'react'
import { CategoryChildrenFragment } from './CategoryChildren.graphql'
import CategoryLink from './CategoryLink'

type CategoryChildrenProps = CategoryChildrenFragment &
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
