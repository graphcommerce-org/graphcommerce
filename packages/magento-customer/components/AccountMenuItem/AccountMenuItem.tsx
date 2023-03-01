import { ImageProps } from '@graphcommerce/image'
import {
  iconChevronRight,
  IconSvg,
  Button,
  ButtonProps,
  extendableComponent,
} from '@graphcommerce/next-ui'
import { ListItem, ListItemIcon, ListItemText, SxProps, Theme } from '@mui/material'
import React from 'react'

export type AccountMenuItemProps = {
  iconSrc: ImageProps['src']
  title: React.ReactNode
  subtitle?: React.ReactNode
  endIcon?: React.ReactNode
  sx?: SxProps<Theme>
} & Omit<ButtonProps, 'endIcon' | 'startIcon' | 'title'> &
  OwnerState

type OwnerState = { noBorderBottom?: boolean }
const name = 'AccountMenuItem'
const parts = ['root', 'icon'] as const
const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

export function AccountMenuItem(props: AccountMenuItemProps) {
  const {
    title,
    subtitle,
    iconSrc,
    endIcon,
    href,
    disabled,
    noBorderBottom = false,
    sx = [],
    ...buttonProps
  } = props
  const classes = withState({ noBorderBottom })

  return (
    <Button
      href={href}
      disabled={disabled}
      className={classes.root}
      sx={[
        (theme) => ({
          width: '100%',
          height: theme.responsiveTemplate`${[88, 104]}px`,
          padding: 0,
          borderRadius: 0,
          background: theme.palette.background.paper,
          '&:hover': {
            background: theme.palette.background.default,
          },
          '&:disabled': {
            background: theme.palette.background.default,
          },
          '&:focus': {
            // fix: disableElevation does not work when button is focused
            boxShadow: 'none',
          },

          '&:not(.noBorderBottom)': {
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...buttonProps}
    >
      <ListItem disableGutters>
        <ListItemIcon
          className={classes.icon}
          sx={(theme) => ({
            paddingRight: theme.spacings.xs,
          })}
        >
          <IconSvg src={iconSrc} size='large' />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ sx: { typography: 'subtitle1' } }}
          secondaryTypographyProps={{
            sx: {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'elipsis',
            },
          }}
          primary={title}
          secondary={subtitle}
        />
        {endIcon ?? <IconSvg src={iconChevronRight} />}
      </ListItem>
    </Button>
  )
}
