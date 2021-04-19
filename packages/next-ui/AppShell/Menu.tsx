import { LinkProps } from 'next/link'

type MenuItemProps = LinkProps & { children: React.ReactNode }

export type MenuProps = {
  menu: MenuItemProps[]
}
