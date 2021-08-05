import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import { ObjectImage } from '@reachdigital/image'
import {
  Button,
  ButtonProps,
  UseStyles,
  responsiveVal,
  SvgImage,
  iconChevronRight,
} from '@reachdigital/next-ui'
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
      minWidth: `${responsiveVal(40, 56)}`,
    },
    borderBottom: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    heading: {
      fontWeight: 400,
      fontSize: theme.typography.h4.fontSize,
      [theme.breakpoints.up('md')]: {
        fontSize: theme.typography.h6.fontSize,
      },
    },
    subheading: {
      display: 'block',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      color: theme.palette.primary.mutedText,
      ...theme.typography.overline,
      [theme.breakpoints.up('md')]: {
        ...theme.typography.body2,
      },
    },
    itemLink: {
      padding: 0,
    },
  }),
  { name: 'AccountMenuItem' },
)

export type AccountMenuItemProps = {
  iconSrc: ObjectImage['src']
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
          <SvgImage src={iconSrc} alt='' size='medium' loading='eager' shade='muted' />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant='h6' component='span' className={classes.heading}>
              {title}
            </Typography>
          }
          secondary={<span className={classes.subheading}>{subtitle}</span>}
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
