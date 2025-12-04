import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import type {
  LinkProps,
  BreadcrumbsProps as MuiBreadcrumbProps,
  SxProps,
  Theme,
} from '@mui/material'
import {
  Box,
  ClickAwayListener,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Typography,
  useEventCallback,
  useTheme,
} from '@mui/material'
import dynamic from 'next/dynamic'
import type { MouseEvent } from 'react'
import { useState } from 'react'
import { Button } from '../Button'
import { iconClose, iconEllypsis } from '../icons'
import { IconSvg } from '../IconSvg'
import type { BreadcrumbsType } from './types'

const BreadcrumbsPopper = dynamic(
  async () => (await import('./BreadcrumbsPopper')).BreadcrumbsPopper,
)

export type BreadcrumbsProps = BreadcrumbsType &
  Omit<MuiBreadcrumbProps, 'children'> & {
    maxItems?: number
    lastIsLink?: boolean
    breadcrumbsAmountDesktop?: number
    breadcrumbsAmountMobile?: number
    itemSx?: SxProps<Theme>
    linkProps?: Omit<LinkProps, 'href'>
    disableHome?: boolean
    /**
     * Hide the last breadcrumb item (and its separator) on mobile. Useful when the last item
     * duplicates the page title.
     */
    hideLastOnMobile?: boolean
  }

export function Breadcrumbs(props: BreadcrumbsProps) {
  const {
    breadcrumbs,
    sx,
    breadcrumbsAmountDesktop = 4,
    breadcrumbsAmountMobile = 2,
    lastIsLink = false,
    maxItems,
    itemSx = [],
    linkProps,
    disableHome = false,
    hideLastOnMobile = false,
    ...rest
  } = props
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null)
  const theme = useTheme()

  // When hiding the last item on mobile, show one more item to compensate
  const effectiveBreadcrumbsAmountMobile = hideLastOnMobile
    ? breadcrumbsAmountMobile + 1
    : breadcrumbsAmountMobile

  const isDefaultMobile = breadcrumbsAmountMobile === 0
  const showButtonMobile = breadcrumbs.length > effectiveBreadcrumbsAmountMobile && !isDefaultMobile
  const isDefaultDesktop = breadcrumbsAmountDesktop === 0
  const showButtonDesktop = breadcrumbs.length > breadcrumbsAmountDesktop && !isDefaultDesktop

  const handleClick = useEventCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElement((el) => (el !== event.currentTarget ? event.currentTarget : null))
  })

  const handleClose = () => setAnchorElement(null)

  const breadcrumbLinks = [...(lastIsLink ? breadcrumbs : breadcrumbs.slice(0, -1))]
  const last = lastIsLink ? null : breadcrumbs[breadcrumbs.length - 1]

  return (
    <MuiBreadcrumbs
      {...rest}
      aria-label={t`Breadcrumbs`}
      maxItems={maxItems}
      color='inherit'
      sx={[
        {},
        !maxItems && {
          '& .MuiBreadcrumbs-ol': {
            flexWrap: 'nowrap',
            '& .MuiBreadcrumbs-li': {
              '&:nth-of-type(1)': {
                display: {
                  xs: showButtonMobile ? 'flex' : 'none',
                  md: showButtonDesktop ? 'flex' : 'none',
                },
              },
              '&:nth-last-of-type(1)': {
                display: 'inline-flex',
                overflowX: 'hidden',
              },
            },
          },
          '& .MuiBreadcrumbs-separator': {
            '&:nth-of-type(2)': {
              display: {
                xs: !showButtonMobile && 'none',
                md: !showButtonDesktop && 'none',
              },
            },
          },

          [theme.breakpoints.down('md')]: showButtonMobile && {
            '& .MuiBreadcrumbs-li, & .MuiBreadcrumbs-separator': {
              display: 'none',
              [`&:nth-last-of-type(-n+${effectiveBreadcrumbsAmountMobile * 2})`]: {
                display: 'flex',
              },
            },
          },

          [theme.breakpoints.up('md')]: showButtonDesktop && {
            '& .MuiBreadcrumbs-li, & .MuiBreadcrumbs-separator': {
              display: 'none',
              [`&:nth-last-of-type(-n+${breadcrumbsAmountDesktop * 2})`]: {
                display: 'flex',
              },
            },
          },
        },
        // Hide the last item and its separator on mobile
        hideLastOnMobile && {
          [theme.breakpoints.down('md')]: {
            '& .MuiBreadcrumbs-ol .MuiBreadcrumbs-li:nth-last-of-type(1)': {
              display: 'none',
            },
            '& .MuiBreadcrumbs-ol > :nth-last-child(2)': {
              display: 'none',
            },
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {!maxItems && (
        <ClickAwayListener
          mouseEvent='onMouseDown'
          touchEvent='onTouchStart'
          onClickAway={handleClose}
        >
          <Box sx={{ position: 'relative', display: 'flex' }}>
            <Button
              aria-describedby={anchorElement ? 'breadcrumb-list' : undefined}
              color='inherit'
              variant='pill'
              size='small'
              onClick={handleClick}
              sx={{
                minWidth: 0,
                // borderRadius: 2,
                // boxShadow: 6,
                // color: 'text.primary',
                // px: 1,
                // py: { xs: 0.3, md: 0.5 },
                // typography: 'caption',
                // backgroundColor: 'background.paper',
              }}
            >
              <IconSvg src={anchorElement ? iconClose : iconEllypsis} />
            </Button>
            <BreadcrumbsPopper
              breadcrumbs={breadcrumbs}
              anchorElement={anchorElement}
              onClose={handleClose}
              showDesktopAmount={breadcrumbsAmountDesktop}
              showMobileAmount={breadcrumbsAmountMobile}
            />
          </Box>
        </ClickAwayListener>
      )}

      {disableHome ? null : (
        <Link
          href='/'
          color='inherit'
          underline='hover'
          {...linkProps}
          sx={[...(Array.isArray(itemSx) ? itemSx : [itemSx])]}
        >
          <Trans>Home</Trans>
        </Link>
      )}
      {breadcrumbLinks.map((breadcrumb) => (
        <Link
          key={breadcrumb.href}
          color='inherit'
          underline='hover'
          {...breadcrumb}
          {...linkProps}
          sx={[
            ...(Array.isArray(breadcrumb.sx) ? breadcrumb.sx : [breadcrumb.sx]),
            ...(Array.isArray(itemSx) ? itemSx : [itemSx]),
          ]}
        >
          {breadcrumb.name}
        </Link>
      ))}

      {last && (
        <Typography
          component='span'
          noWrap
          color='inherit'
          sx={[{ fontWeight: '600' }, ...(Array.isArray(itemSx) ? itemSx : [itemSx])]}
        >
          {last.name}
        </Typography>
      )}
    </MuiBreadcrumbs>
  )
}
