import React from 'react'
import { Button, Menu, MenuItem } from '@material-ui/core'
import { ProductListLink } from '../ProductListLink'
import { ProductListParams } from '../ProductList'

export type ProductListSortProps = GQLProductListSortFragment & {
  params: ProductListParams
  defaultSort: string
} & JSX.IntrinsicElements['div']

export default function ProductListSort({
  sort_fields,
  defaultSort,
  params,
  ...divProps
}: ProductListSortProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => setAnchorEl(null)

  const [currentSort = defaultSort] = Object.keys(params.sort)
  const currentOption = sort_fields.options.find((option) => option.value === currentSort)
  const currentDir = currentOption?.value ? params.sort[currentOption.value] : 'ASC'

  return (
    <div {...divProps}>
      Sort by:
      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
        variant='outlined'
      >
        {currentOption?.label}
      </Button>
      <Menu id='simple-menu' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {sort_fields.options.map((option) => {
          const linkParams = { ...params, sort: { ...params.sort } }
          linkParams.sort = {}
          if (option.value !== defaultSort) linkParams.sort[option.value] = true
          delete linkParams.currentPage

          return (
            <ProductListLink key={option.value} color='inherit' {...linkParams}>
              <MenuItem onClick={handleClose}>{option.label}</MenuItem>
            </ProductListLink>
          )
        })}
      </Menu>
      {currentDir}
    </div>
  )
}
