import {
  iconMenu,
  LayoutDefault,
  LayoutDefaultProps,
  responsiveVal,
  SvgIcon,
} from '@graphcommerce/next-ui'
import { Box, Fab } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FileNode } from '../../lib/files'
import SidebarMenu from '../SidebarMenu'
import { Logo } from './Logo'

export type LayoutFullProps = Omit<
  LayoutDefaultProps,
  'pages' | 'classes' | 'header' | 'cartFab' | 'menuFab' | 'footer'
> & { menuData?: FileNode }

export function LayoutFull(props: LayoutFullProps) {
  const { children, menuData } = props

  const router = useRouter()

  const selected = router.asPath.split('?')[0].split('#')[0]

  return (
    <LayoutDefault
      header={<Logo />}
      footer=''
      menuFab={
        <Link href={`/menu${selected}`} passHref>
          <Fab
            sx={{
              display: { sm: undefined, md: 'none' },
              backgroundColor: 'text.primary',
              color: 'background.paper',
              width: responsiveVal(42, 56),
              height: responsiveVal(42, 56),
              '&:hover, &:focus': {
                boxShadow: 'none',
                backgroundColor: 'text.primary',
              },
            }}
          >
            <SvgIcon src={iconMenu} size='medium' />
          </Fab>
        </Link>
      }
      sx={[
        (theme) => ({
          '& header': {
            p: 0,
          },
          '& header a, & header > div': {
            backgroundColor: theme.palette.background.paper,
            [theme.breakpoints.up('md')]: {
              borderRight: `1px solid ${theme.palette.divider}`,
              width: `${responsiveVal(300, 320)}`,
            },
          },
          '& .LayoutDefault-children': {
            display: 'grid',
            gridAutoFlow: 'column',
            gridTemplateColumns: { xs: '1fe', md: `${responsiveVal(300, 320)} 1fr` },
            borderTop: `1px solid ${theme.palette.divider}`,
          },
        }),
      ]}
    >
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.paper,
          padding: 2,
          borderRight: (theme) => `1px solid ${theme.palette.divider}`,
          display: { xs: 'none', md: 'block' },
        }}
      >
        {menuData && <SidebarMenu {...menuData} selected={selected} />}
      </Box>
      <Box sx={{ mb: 15 }}>{children}</Box>
    </LayoutDefault>
  )
}
