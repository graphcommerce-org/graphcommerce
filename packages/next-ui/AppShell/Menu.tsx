import { SetRequired } from 'type-fest'
import { PageLinkProps } from 'next/link'

type MenuItemProps = SetRequired<PageLinkProps, 'children'>

export type MenuProps = {
  menu: MenuItemProps[]
}
