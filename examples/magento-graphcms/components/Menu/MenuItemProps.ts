import { MenuItemProps } from '@mui/material'
import { MenuItemFragment } from '../../graphql/MenuItem.gql'

export type MenuRootButtonProps = {
  index?: number
  active?: boolean
  cmsUrl?: string
  hasChildren?: boolean
  onClick?: () => void
  setActiveIndex?: (index: number) => void
} & MenuItemFragment &
  MenuItemProps
