import React from 'react'
import { Button, Menu, MenuItem } from '@material-ui/core'
import { CategoryProductsLink } from '../CategoryProductsLink'

export type ProductSortProps = GQLProductSortFragment & {
  url: string[]
  defaultSort: string
  categoryVariables: GQLCategoryProductsQueryVariables
}

export default function ProductSort({
  sort_fields,
  url,
  defaultSort,
  categoryVariables,
}: ProductSortProps) {
  const { sort = {} } = categoryVariables

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const [currentSort = defaultSort] = Object.keys(sort)
  const currentOption = sort_fields.options.find((option) => option.value === currentSort)
  const currentDir = currentOption?.value ? sort[currentOption.value] : 'ASC'

  return (
    <div>
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
        {sort_fields.options.map((option) => (
          <CategoryProductsLink
            key={option.value}
            color='inherit'
            url={url}
            variables={{ ...categoryVariables, sort: { [option.value]: true } }}
          >
            <MenuItem onClick={handleClose}>{option.label}</MenuItem>
          </CategoryProductsLink>
        ))}
      </Menu>
      {currentDir}
    </div>
  )
}
