import { SetRequired } from 'type-fest'
import { PageLinkProps } from '../PageTransition/PageLink'

type MenuItemProps = SetRequired<PageLinkProps, 'children'>

export type MenuProps = {
  menu: MenuItemProps[]
}
