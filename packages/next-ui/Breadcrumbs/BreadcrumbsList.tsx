import { Trans } from '@lingui/react'
import { Box, Link, Typography, alpha, useTheme } from '@mui/material'
import { useEffect, useRef, KeyboardEvent } from 'react'
import type { BreadcrumbsType } from './types'

type PopperBreadcrumbsListProps = {
  autoFocus: boolean
  breadcrumbs: BreadcrumbsType['breadcrumbs']
  name?: BreadcrumbsType['name']
  onClose: () => void
}

export function BreadcrumbsList(props: PopperBreadcrumbsListProps) {
  const { breadcrumbs, autoFocus, name, onClose } = props
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
      {breadcrumbs.slice(0, breadcrumbs.length - 1).map((breadcrumb) => (
        <Link
          {...breadcrumb}
          key={breadcrumb.key}
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
        />
      ))}
      <Typography
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
    </Box>
  )
}
