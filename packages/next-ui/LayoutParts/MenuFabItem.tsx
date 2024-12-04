import type { ListItemButtonProps } from '@mui/material'
import { ListItemButton, ListItemText } from '@mui/material'
import { useRouter } from 'next/router'
import { NextLink } from '../Theme'

export type MenuFabItemProps = Omit<ListItemButtonProps<'a'>, 'href' | 'button'> & {
  href: NonNullable<ListItemButtonProps<'a'>['href']>
}

export function MenuFabItem(props: MenuFabItemProps) {
  const { href, children, sx = [], ...listItemProps } = props
  const hrefString = href.toString()
  const path = useRouter().asPath.split('?')[0]
  const active = hrefString === '/' ? path === hrefString : path.startsWith(hrefString)

  return (
    <ListItemButton href={href} component={NextLink} dense selected={active} {...listItemProps}>
      <ListItemText
        sx={[{ typography: 'h4', lineHeight: 1.1 }, ...(Array.isArray(sx) ? sx : [sx])]}
        disableTypography
        primary={children}
      />
    </ListItemButton>
  )
}
