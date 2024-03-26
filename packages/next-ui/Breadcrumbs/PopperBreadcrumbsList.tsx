import { Trans } from '@lingui/react'
import { ClickAwayListener, Link, MenuItem, MenuList, Typography, useTheme } from '@mui/material'
import { BreadcrumbsProps } from './types'

type PopperBreadcrumbsListProps = {
  autoFocus: boolean
  breadcrumbs: BreadcrumbsProps['breadcrumbs']
  name?: BreadcrumbsProps['name']
  handleClickAway: () => void
  handleKeyDown: (event: React.KeyboardEvent) => void
}

export function PopperBreadcrumbsList(props: PopperBreadcrumbsListProps) {
  const { autoFocus, breadcrumbs, name, handleClickAway, handleKeyDown } = props
  const theme = useTheme()

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <MenuList
        autoFocusItem={autoFocus}
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
  )
}
