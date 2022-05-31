import { responsiveVal } from '@graphcommerce/next-ui'
import { Box, List, styled, SxProps, Theme } from '@mui/material'
import { m } from 'framer-motion'
import { useState } from 'react'
import { MegaMenuQueryFragment } from '../../queries/MegaMenuQueryFragment.gql'
import { MegaMenuItem, MegaMenuItemProps } from './MegaMenuItem'

type Props = MegaMenuQueryFragment & Omit<MegaMenuItemProps, 'uid'> & { mobileOnly?: boolean }

const MotionBox = styled(m.div)({})

export function MegaMenu(props: Props) {
  const { menu, mobileOnly, activeIndex, setActiveIndex } = props
  const root = menu?.items

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
    <Box>
      <List
        disablePadding
        sx={(theme) => ({
          display: 'grid',
          gridTemplateRows: 'auto',
          [theme.breakpoints.up('md')]: !mobileOnly && {
            background: theme.palette.background.default,
            // gridTemplate: `"nav items"/${responsiveVal(200, 280)} ${responsiveVal(200, 280)}`,
          },
          '& > li:nth-of-type(1) > a': {
            [theme.breakpoints.up('md')]:
              !mobileOnly &&
              {
                // marginTop: theme.spacings.md,
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
              setActiveIndex={() => setActiveIndex(activeIndex === index ? null : index)}
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
