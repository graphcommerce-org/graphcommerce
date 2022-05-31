import { iconChevronLeft, IconSvg, responsiveVal } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Theme, SxProps, List, ListItem, Button, Box, Fab, styled } from '@mui/material'
import {} from '@mui/material/utils'
import { m } from 'framer-motion'
import PageLink from 'next/link'
import { MegaMenuItemFragment } from '../../queries/MegaMenuItem.gql'
import { MegaMenuRootButton } from './MegaMenuRootButton'

export type MegaMenuItemProps = {
  index?: number
  rootItemCount?: number
  activeIndex?: number | null
  hasChildren?: boolean
  mobileOnly?: boolean
  setActiveIndex?: (index: number | null) => void
} & MegaMenuItemFragment

const MotionBox = styled(m.div)({})

export function MegaMenuItem(props: MegaMenuItemProps) {
  const {
    children,
    activeIndex,
    setActiveIndex,
    rootItemCount,
    include_in_menu,
    index,
    name,
    url_path,
    mobileOnly,
  } = props

  if (!include_in_menu) return null

  const hasChildren = children?.some((child) => child?.include_in_menu) || false

  const subMenuContainer: SxProps<Theme> = [
    (theme) => ({
      display: 'none',
      [theme.breakpoints.up('md')]: !mobileOnly && {
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        display: 'none',
        // gridArea: 'items',
        // gridRowStart: `span ${rootItemCount}`,
        // visibility: 'hidden',
        width: responsiveVal(200, 280),
        // padding: theme.spacings.md,
        boxShadow: `-1px 0 ${theme.palette.divider}`,
        columnCount: 1,
        background: theme.palette.background.paper,
        height: '100%',
      },
    }),
    (theme) =>
      index === activeIndex
        ? {
            display: 'block',
            [theme.breakpoints.up('md')]: !mobileOnly && {
              display: 'block',
              // visibility: 'visible',
            },
          }
        : {},
  ]

  const listItemStyles: SxProps<Theme> = (theme) => ({
    ...theme.typography.body1,
    flexDirection: 'column',
    alignItems: 'stretch',
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: 0,
    [theme.breakpoints.up('md')]: !mobileOnly && {
      border: 'none',
      padding: 1,
      display: 'grid',
      breakInside: 'avoid',
    },
    '& > a': {
      color: theme.palette.primary.main,
      borderRadius: 0,
      padding: 1,
      justifyContent: 'start',
      [theme.breakpoints.up('md')]: !mobileOnly && {
        color: theme.palette.primary.main,
        width: 'fit-content',
      },
    },
  })

  const subListItemStyles: SxProps<Theme> = (theme) => ({
    border: 'none',
    [theme.breakpoints.up('md')]: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    '& > a': {
      color: 'unset',
      [theme.breakpoints.down('md')]: {
        padding: 0.5,
        paddingLeft: 4,
      },
    },
  })

  return (
    <ListItem sx={{ display: 'contents' }}>
      <MegaMenuRootButton
        {...props}
        hasChildren={hasChildren}
        activeIndex={activeIndex}
        mobileOnly={mobileOnly}
        index={index}
      />
      <MotionBox sx={{ gridArea: 'items', gridRowStart: `span ${rootItemCount}` }}>
        <List sx={subMenuContainer}>
          <Fab
            onClick={(e) => {
              if (setActiveIndex) {
                setActiveIndex(null)
              }
              e.preventDefault()
              e.stopPropagation()
            }}
            aria-label={i18n._(/* i18n */ `Back`)}
            size='small'
            color='default'
            sx={{ display: { md: !mobileOnly ? 'none' : 'inline-flex' } }}
          >
            <IconSvg src={iconChevronLeft} size='medium' />
          </Fab>

          {url_path && (
            <ListItem sx={listItemStyles}>
              <PageLink href={url_path} passHref>
                <Button variant='text'>
                  <Trans id='View all' /> {name && name?.toLocaleLowerCase()}
                </Button>
              </PageLink>
            </ListItem>
          )}

          {children?.map((child) =>
            child?.include_in_menu ? (
              <ListItem sx={listItemStyles} key={child?.name}>
                {child.url_path && (
                  <PageLink href={child?.url_path} passHref>
                    <Button variant='text'>{child?.name}</Button>
                  </PageLink>
                )}
                {child?.children && child.children.length > 0 ? (
                  <List>
                    {child.children?.map((subChild) =>
                      subChild?.include_in_menu ? (
                        <ListItem key={subChild?.name} sx={[listItemStyles, subListItemStyles]}>
                          {subChild.url_path && (
                            <PageLink href={subChild?.url_path} passHref>
                              <Button variant='text'>{subChild?.name}</Button>
                            </PageLink>
                          )}
                        </ListItem>
                      ) : null,
                    )}
                  </List>
                ) : null}
              </ListItem>
            ) : null,
          )}
        </List>
      </MotionBox>
    </ListItem>
  )
}
