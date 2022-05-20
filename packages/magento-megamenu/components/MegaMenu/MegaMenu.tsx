import { Box, List, SxProps, Theme } from '@mui/material'
import { useState } from 'react'
import { MegaMenuQueryFragment } from '../../queries/MegaMenuQueryFragment.gql'
import { MegaMenuItem, MegaMenuItemProps } from './MegaMenuItem'

type Props = MegaMenuQueryFragment & Omit<MegaMenuItemProps, 'uid'> & { mobileOnly?: boolean }

export function MegaMenu(props: Props) {
  const { menu, mobileOnly } = props
  const root = menu?.items
  const [activeIndex, setActiveIndex] = useState<number | null>()

  const desktopExpandFirst: SxProps<Theme> = [
    (theme) =>
      !activeIndex
        ? {
            [theme.breakpoints.up('md')]: !mobileOnly && {
              '& > ul > li:nth-of-type(1) > a': {
                background: `${theme.palette.background.paper} !important`,
                color: theme.palette.primary.main,
                boxShadow: `0px 0 ${theme.palette.background.paper},inset 0 1px 0 0 ${theme.palette.divider},inset 0 -1px 0 0 ${theme.palette.divider}`,
                zIndex: 1,
              },
              '& > ul > li:nth-of-type(1) > ul': {
                visibility: 'visible',
              },
            },
          }
        : {},
  ]

  return (
    <Box maxWidth='md' sx={desktopExpandFirst}>
      <List
        disablePadding
        sx={(theme) => ({
          display: 'grid',
          gridTemplateRows: 'auto',
          [theme.breakpoints.up('md')]: !mobileOnly && {
            background: theme.palette.background.default,
            gridTemplate: '"nav items"/1fr 2fr',
            minWidth: '960px',
          },
          '& > li:nth-of-type(1) > a': {
            [theme.breakpoints.up('md')]: !mobileOnly && {
              marginTop: theme.spacings.md,
            },
          },
        })}
      >
        {root?.map((item, index) => {
          if (!item) return null
          return (
            <MegaMenuItem
              key={item.uid}
              {...item}
              index={index}
              setActiveIndex={setActiveIndex}
              activeIndex={activeIndex}
              rootItemCount={root.length}
              mobileOnly={mobileOnly}
            />
          )
        })}
      </List>
    </Box>
  )
}
