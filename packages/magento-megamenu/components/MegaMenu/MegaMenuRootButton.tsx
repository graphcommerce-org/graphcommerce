import { Button, IconSvg, iconChevronRight, responsiveVal } from '@graphcommerce/next-ui'
import { Box, SxProps, Theme } from '@mui/material'
import PageLink from 'next/link'
import { MegaMenuItemFragment } from '../../queries/MegaMenuItem.gql'

type Props = {
  index?: number
  activeIndex?: number | null
  hasChildren?: boolean
  mobileOnly?: boolean
  setActiveIndex?: (index: number | null) => void
} & MegaMenuItemFragment

export function MegaMenuRootButton(props: Props) {
  const { setActiveIndex, activeIndex, hasChildren, index, name, url_path, mobileOnly } = props
  const url = `/${url_path}`

  const rootCategoryButton: SxProps<Theme> = [
    (theme) => ({
      justifyContent: 'space-between',
      borderRadius: '0',
      padding: 1,
      borderBottom: `1px solid ${theme.palette.divider}`,
      minWidth: responsiveVal(200, 280),
      [theme.breakpoints.up('md')]: !mobileOnly && {
        borderBottom: 'none',
        ...theme.typography.body1,
        padding: 2,
      },
      '& .end-icon': {
        display: 'flex',
      },
    }),
    (theme) =>
      index === activeIndex
        ? {
            [theme.breakpoints.up('md')]: !mobileOnly && {
              background: `${theme.palette.background.paper} !important`,
              color: theme.palette.primary.main,
              boxShadow: `0px 0 ${theme.palette.background.paper},inset 0 1px 0 0 ${theme.palette.divider},inset 0 -1px 0 0 ${theme.palette.divider}`,
              zIndex: 1,
            },
          }
        : {},
    (theme) =>
      activeIndex != null
        ? {
            display: 'none',
            [theme.breakpoints.up('md')]: !mobileOnly && {
              display: 'inline-flex',
            },
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
          if (hasChildren) {
            if (index || index === 0) {
              if (setActiveIndex) {
                setActiveIndex(index)
              }
            }
            e.preventDefault()
            e.stopPropagation()
          }
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
