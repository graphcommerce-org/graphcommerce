import { Trans } from '@lingui/react'
import { Box, Link, alpha, useTheme } from '@mui/material'
import type { KeyboardEvent } from 'react'
import { useEffect, useRef } from 'react'
import type { BreadcrumbsType } from './types'

type PopperBreadcrumbsListProps = {
  autoFocus: boolean
  breadcrumbs: BreadcrumbsType['breadcrumbs']
  showDesktopAmount?: number
  showMobileAmount?: number
  onClose: () => void
}

export function BreadcrumbsList(props: PopperBreadcrumbsListProps) {
  const { autoFocus, breadcrumbs, showDesktopAmount = 4, showMobileAmount = 3, onClose } = props
  const listRef = useRef<HTMLDivElement | null>(null)
  const theme = useTheme()

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    if (autoFocus) {
      listRef.current?.focus()
    }
  }, [autoFocus])

  return (
    <Box
      ref={listRef}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: 3,
        boxShadow: 12,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden auto',
        py: `calc(${theme.spacings.xxs} / 2)`,
        [theme.breakpoints.up('md')]: {
          '& .MuiLink-root': {
            [`:nth-last-of-type(-n+${showDesktopAmount})`]: {
              display: 'none',
            },
          },
        },
        [theme.breakpoints.down('md')]: {
          '& .MuiLink-root': {
            [`:nth-last-of-type(-n+${showMobileAmount})`]: {
              display: 'none',
            },
          },
        },
      }}
    >
      <Link
        href='/'
        underline='none'
        color='text.primary'
        variant='body1'
        noWrap
        onClick={onClose}
        tabIndex={0}
        sx={{
          flex: 1,
          padding: `calc(${theme.spacings.xxs} / 2) ${theme.spacings.xs}`,
          '&:hover': {
            backgroundColor: alpha(theme.palette.action.hover, 0.025),
          },
        }}
      >
        <Trans id='Home' />
      </Link>
      {breadcrumbs.slice(0, breadcrumbs.length).map((breadcrumb) => (
        <Link
          {...breadcrumb}
          key={breadcrumb.href}
          underline='none'
          color='text.primary'
          variant='body1'
          noWrap
          onClick={onClose}
          tabIndex={0}
          sx={{
            flex: 1,
            padding: `calc(${theme.spacings.xxs} / 2) ${theme.spacings.xs}`,
            '&:hover': {
              backgroundColor: alpha(theme.palette.action.hover, 0.025),
            },
          }}
        >
          {breadcrumb.name}
        </Link>
      ))}
    </Box>
  )
}
