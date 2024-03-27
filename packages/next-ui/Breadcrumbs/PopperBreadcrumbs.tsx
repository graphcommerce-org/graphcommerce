import { Trans } from '@lingui/react'
import {
  Box,
  Breadcrumbs as BreadcrumbsBase,
  IconButton,
  Link,
  Popper,
  Typography,
  useTheme,
} from '@mui/material'
import { useRef, useState, MouseEvent } from 'react'
import { IconSvg } from '../IconSvg'
import { iconClose, iconEllypsis } from '../icons'
import { BreadcrumbsJsonLd } from './BreadcrumbsJsonLd'
import { PopperBreadcrumbsList } from './PopperBreadcrumbsList'
import { jsonLdBreadcrumb } from './jsonLdBreadcrumb'
import { BreadcrumbsProps } from './types'

export function PopperBreadcrumbs(props: BreadcrumbsProps) {
  const { breadcrumbs, name, baseUrl, sx, numOfBreadcrumbsToShow = 2 } = props
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null)
  const anchorRef = useRef<HTMLButtonElement>(null)
  const theme = useTheme()

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(anchorElement ? null : e.currentTarget)
  }

  const handleClickAway = () => {
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
          baseUrl={baseUrl}
          breadcrumbs={breadcrumbs}
          render={(bc, url) => ({
            '@context': 'https://schema.org',
            ...jsonLdBreadcrumb(bc, url),
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
        <IconButton
          aria-describedby={anchorElement ? 'simple-popper' : undefined}
          ref={anchorRef}
          color='default'
          onClick={handleClick}
          sx={{
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: 1,
            color: 'text.primary',
            display: {
              xs: breadcrumbs.length ? 'flex' : 'none',
              md: breadcrumbs.length >= numOfBreadcrumbsToShow ? 'flex' : 'none',
            },
            px: 1.5,
            py: 0.7,
            typography: 'caption',
          }}
        >
          <IconSvg src={anchorElement ? iconClose : iconEllypsis} />
        </IconButton>
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
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        disablePortal
        placement='bottom-start'
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
        <Box>
          <PopperBreadcrumbsList
            autoFocus={Boolean(anchorElement)}
            breadcrumbs={breadcrumbs}
            name={name}
            handleClickAway={handleClickAway}
            handleKeyDown={handleKeyDown}
          />
        </Box>
      </Popper>
    </>
  )
}
