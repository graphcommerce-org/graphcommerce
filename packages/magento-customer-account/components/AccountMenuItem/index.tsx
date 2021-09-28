import { ImageProps } from '@graphcommerce/image'
import {
  Button,
  ButtonProps,
  UseStyles,
  responsiveVal,
  SvgImage,
  iconChevronRight,
  SvgImageSimple,
} from '@graphcommerce/next-ui'
import { ListItem, ListItemIcon, ListItemText, makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import PageLink from 'next/link'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      width: '100%',
      height: responsiveVal(88, 104),
      fontSize: theme.typography.fontSize,
      padding: 0,
      borderRadius: 0,
      '&:hover': {
        background: theme.palette.background.highlight,
      },
      '&:disabled': {
        background: theme.palette.background.highlight,
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
      // ...theme.typography.caption,
      color: theme.palette.primary.mutedText,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'elipsis',
    },
    itemLink: {
      padding: 0,
    },
  }),
  { name: 'AccountMenuItem' },
)

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
  const classes = useStyles(props)

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
          <SvgImageSimple src={iconSrc} alt='' size='large' loading='eager' muted />
        </ListItemIcon>
        <ListItemText
          classes={{ secondary: classes.secondary, primary: classes.primary }}
          primary={title}
          secondary={subtitle}
        />
        {endIcon ?? (
          <SvgImage src={iconChevronRight} alt='chevron right' size='small' loading='eager' />
        )}
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
