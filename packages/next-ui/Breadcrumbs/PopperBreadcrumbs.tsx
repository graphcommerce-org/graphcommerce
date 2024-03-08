import { Trans } from '@lingui/react'
import {
  Box,
  Breadcrumbs as BreadcrumbsBase,
  Chip,
  ClickAwayListener,
  Fade,
  Link,
  MenuItem,
  MenuList,
  Popper,
  Typography,
  useTheme,
} from '@mui/material'
import { useRef, useState, MouseEvent, SyntheticEvent } from 'react'
import { IconSvg } from '../IconSvg'
import { iconClose, iconEllypsis } from '../icons'
import { BreadcrumbsJsonLd } from './BreadcrumbsJsonLd'
import { jsonLdBreadcrumb } from './jsonLdBreadcrumb'
import { BreadcrumbsProps } from './types'

export function PopperBreadcrumbs(props: BreadcrumbsProps) {
  const { breadcrumbs, name, sx, numOfBreadcrumbsToShow = 2 } = props
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null)
  const anchorRef = useRef<HTMLButtonElement>(null)
  const theme = useTheme()

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(anchorElement ? null : e.currentTarget)
  }

  const handleClickAway = (event: Event | SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLDivElement)) {
      return
    }

    setAnchorElement(null)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setAnchorElement(null)
    }
  }

  return (
    <>
      {breadcrumbs.length && (
        <BreadcrumbsJsonLd
          breadcrumbs={breadcrumbs}
          render={(bc) => ({
            '@context': 'https://schema.org',
            ...jsonLdBreadcrumb(bc),
          })}
        />
      )}
      <BreadcrumbsBase
        sx={[
          {
            overflowX: 'clip',
            '& .MuiBreadcrumbs-ol': {
              flexWrap: 'nowrap',
              '& .MuiBreadcrumbs-li': {
                '&:nth-of-type(1)': {
                  display: breadcrumbs.length >= numOfBreadcrumbsToShow ? 'flex' : 'none',
                },
                '&:nth-last-of-type(1)': {
                  display: 'inline-flex',
                  overflowX: 'hidden',
                },
              },
              '& .MuiBreadcrumbs-separator': {
                '&:nth-of-type(2)': {
                  display: breadcrumbs.length >= numOfBreadcrumbsToShow ? 'flex' : 'none',
                },
              },
            },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Chip
          aria-describedby={anchorElement ? 'simple-popper' : undefined}
          ref={anchorRef}
          component='button'
          variant='outlined'
          color='default'
          label={<IconSvg src={anchorElement ? iconClose : iconEllypsis} />}
          onClick={handleClick}
          sx={{
            borderRadius: 2,
            padding: 0,
            display: {
              xs: breadcrumbs.length ? 'flex' : 'none',
              md: breadcrumbs.length >= numOfBreadcrumbsToShow ? 'flex' : 'none',
            },
            '& .MuiChip-label': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          }}
        />
        {breadcrumbs.length <= 1 && (
          <Link href='/' underline='hover' color='text.primary' variant='body1'>
            <Trans id='Home' />
          </Link>
        )}
        {breadcrumbs
          .slice(
            breadcrumbs.length - numOfBreadcrumbsToShow <= 0
              ? 0
              : breadcrumbs.length - numOfBreadcrumbsToShow,
            breadcrumbs.length - 1,
          )
          .map((breadcrumb) => (
            <Link {...breadcrumb} underline='hover' color='text.primary' variant='body1' />
          ))}
        <Typography component='span' color='text.primary' variant='body1' fontWeight='600' noWrap>
          {name}
        </Typography>
      </BreadcrumbsBase>
      <Popper
        id={anchorElement ? 'simple-popper' : undefined}
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        disablePortal
        placement='bottom-start'
        transition
        modifiers={[
          { name: 'offset', options: { offset: [0, 10] } },
          {
            name: 'preventOverflow',
            enabled: true,
            options: { altBoundary: false, padding: 10 },
          },
        ]}
        sx={{
          display: {
            xs: breadcrumbs.length ? 'block' : 'none',
            md: breadcrumbs.length >= numOfBreadcrumbsToShow ? 'block' : 'none',
          },
          maxWidth: `calc(100% - ${theme.page.horizontal} * 2)`,
          zIndex: 100,
        }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={200}>
            <Box>
              <ClickAwayListener onClickAway={handleClickAway}>
                <MenuList
                  autoFocusItem={Boolean(anchorElement)}
                  onKeyDown={handleKeyDown}
                  sx={{
                    backgroundColor: 'background.paper',
                    borderRadius: 3,
                    boxShadow: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden auto',
                    py: `calc(${theme.spacings.xxs} / 2)`,
                  }}
                >
                  <MenuItem
                    sx={{
                      minHeight: 'auto',
                      padding: 0,
                    }}
                  >
                    <Link
                      href='/'
                      underline='none'
                      color='text.primary'
                      variant='body1'
                      noWrap
                      sx={{
                        flex: 1,
                        padding: `calc(${theme.spacings.xxs} / 2) ${theme.spacings.xs}`,
                      }}
                    >
                      <Trans id='Home' />
                    </Link>
                  </MenuItem>
                  {breadcrumbs.slice(0, breadcrumbs.length - 1).map((breadcrumb) => (
                    <MenuItem
                      key={breadcrumb.key}
                      sx={{
                        minHeight: 'auto',
                        padding: 0,
                      }}
                      onClick={handleClickAway}
                    >
                      <Link
                        {...breadcrumb}
                        underline='none'
                        color='text.primary'
                        variant='body1'
                        noWrap
                        sx={{
                          flex: 1,
                          padding: `calc(${theme.spacings.xxs} / 2) ${theme.spacings.xs}`,
                        }}
                      />
                    </MenuItem>
                  ))}
                  <Typography
                    component='li'
                    color='text.primary'
                    variant='body1'
                    fontWeight='600'
                    noWrap
                    sx={{
                      padding: `calc(${theme.spacings.xxs} / 2) ${theme.spacings.xs}`,
                    }}
                  >
                    {name}
                  </Typography>
                </MenuList>
              </ClickAwayListener>
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  )
}
