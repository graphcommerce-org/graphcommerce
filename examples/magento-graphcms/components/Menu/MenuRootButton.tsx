import { Button, iconChevronRight, IconSvg } from '@graphcommerce/next-ui'
import { Box, SxProps, Theme, useMediaQuery, useTheme } from '@mui/material'
import PageLink from 'next/link'
import { MenuRootButtonProps } from './MenuItemProps'

export function MenuRootButton(props: MenuRootButtonProps) {
  const { active, setActiveIndex, hasChildren, index, name, url_path, cmsUrl } = props
  const theme2: Theme = useTheme()
  const isMdScreen = useMediaQuery(theme2.breakpoints.up('md'))
  const url = cmsUrl || (hasChildren ? `/menu/${url_path}` : `/${url_path}` || '')

  const rootCategoryButton: SxProps<Theme> = [
    (theme) => ({
      justifyContent: 'space-between',
      borderRadius: '0',
      [theme.breakpoints.up('md')]: {
        ...theme.typography.body1,
        padding: 2,
      },
      '&:hover': {
        backgroundColor: theme.palette.text.secondary,
      },
      '& .end-icon': {
        display: 'flex',
      },
    }),
    (theme) =>
      active
        ? {
            [theme.breakpoints.up('md')]: {
              background: `${theme.palette.background.paper} !important`,
              color: theme.palette.primary.main,
              boxShadow: `0px 0 ${theme.palette.background.paper},inset 0 1px 0 0 ${theme.palette.divider},inset 0 -1px 0 0 ${theme.palette.divider}`,
            },
            zIndex: 1,
          }
        : {},
    !hasChildren && {
      '& .end-icon': {
        display: 'none',
      },
    },
  ]

  return (
    <PageLink href={url} passHref>
      <Button
        variant='text'
        sx={rootCategoryButton}
        onClick={(e) => {
          if (!isMdScreen || !hasChildren) {
            return
          }
          if (index || index === 0) {
            if (setActiveIndex) {
              setActiveIndex(index)
            }
          }
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        {name}
        <Box className='end-icon'>
          <IconSvg src={iconChevronRight} />
        </Box>
      </Button>
    </PageLink>
  )
}
