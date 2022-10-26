import { ListItemButton, ListItemButtonProps, ListItemText } from '@mui/material'
import PageLink from 'next/link'
import { useRouter } from 'next/router'

export type MenuFabItemProps = Omit<ListItemButtonProps<typeof PageLink>, 'button'>

export function MenuFabItem(props: MenuFabItemProps) {
  const { href, children, sx = [], ...listItemProps } = props
  const hrefString = href.toString()
  const path = useRouter().asPath.split('?')[0]
  const active = hrefString === '/' ? path === hrefString : path.startsWith(hrefString)

  return (
    <ListItemButton component={PageLink} href={href} dense selected={active} {...listItemProps}>
      <ListItemText
        sx={[{ typography: 'h4', lineHeight: 1.1 }, ...(Array.isArray(sx) ? sx : [sx])]}
        disableTypography
        primary={children}
      />
    </ListItemButton>
  )
}
