import { ImageProps } from '@graphcommerce/image'
import {
  Button,
  ButtonProps,
  UseStyles,
  responsiveVal,
  iconChevronRight,
  SvgImageSimple,
  makeStyles,
  useMergedClasses,
} from '@graphcommerce/next-ui'
import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import clsx from 'clsx'
import PageLink from 'next/link'
import React from 'react'

const useStyles = makeStyles({ name: 'AccountMenuItem' })((theme) => ({
  root: {
    width: '100%',
    height: responsiveVal(88, 104),
    padding: 0,
    borderRadius: 0,
    background: theme.palette.background.default,
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
  },
  icon: {
    paddingRight: theme.spacings.xs,
  },
  borderBottom: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  primary: {
    ...theme.typography.subtitle1,
  },
  secondary: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'elipsis',
  },
  itemLink: {
    padding: 0,
  },
}))

export type AccountMenuItemProps = {
  iconSrc: ImageProps['src']
  title: React.ReactNode
  subtitle?: React.ReactNode
  endIcon?: React.ReactNode
  noBorderBottom?: boolean
} & Omit<ButtonProps, 'endIcon' | 'startIcon' | 'disableElevation'> &
  UseStyles<typeof useStyles>

export default function AccountMenuItem(props: AccountMenuItemProps) {
  const {
    title,
    subtitle,
    iconSrc,
    endIcon,
    href,
    disabled,
    noBorderBottom = false,
    ...buttonProps
  } = props
  const classes = useMergedClasses(useStyles().classes, props.classes)

  const button = (
    <Button
      variant='contained'
      disableElevation
      disabled={disabled}
      classes={{ root: classes.root }}
      className={clsx({ [classes.borderBottom]: !noBorderBottom })}
      {...buttonProps}
    >
      <ListItem disableGutters>
        <ListItemIcon className={classes.icon}>
          <SvgImageSimple src={iconSrc} size='large' muted />
        </ListItemIcon>
        <ListItemText
          classes={{ secondary: classes.secondary, primary: classes.primary }}
          primary={title}
          secondary={subtitle}
        />
        {endIcon ?? <SvgImageSimple src={iconChevronRight} />}
      </ListItem>
    </Button>
  )

  return href ? (
    <PageLink href={href} passHref>
      {button}
    </PageLink>
  ) : (
    button
  )
}
