import React from 'react'
import { Chip, ChipProps } from '@material-ui/core'
import { ProductListParams } from 'components/ProductListItems/filterTypes'
import CategoryLink from 'components/CategoryLink'
import cloneDeep from 'clone-deep'

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
