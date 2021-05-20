import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import Button, { ButtonProps } from '@reachdigital/next-ui/Button'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconChevronRight } from '@reachdigital/next-ui/icons'
import PageLink from 'next/link'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      width: '100%',
      height: responsiveVal(72, 120),
      fontSize: theme.typography.fontSize,
      borderBottom: `1px solid ${theme.palette.divider}`,
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
    heading: {
      fontWeight: 400,
    },
    avatar: {
      display: 'flex',
      paddingRight: theme.spacings.xs,
    },
    subheading: {
      color: theme.palette.primary.mutedText,
    },
  }),
  { name: 'AccountMenuItem' },
)

export type AccountMenuItemProps = {
  iconSrc: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  endIcon?: React.ReactNode
} & Omit<ButtonProps, 'endIcon' | 'startIcon' | 'disableElevation'>

export default function AccountMenuItem(props: AccountMenuItemProps) {
  const { title, subtitle, iconSrc, endIcon, href, disabled, ...buttonProps } = props
  const { heading, subheading, avatar, ...buttonClasses } = useStyles()

  const button = (
    <Button
      variant='contained'
      disableElevation
      disabled={disabled}
      classes={buttonClasses}
      {...buttonProps}
    >
      <ListItem>
        <ListItemAvatar className={avatar}>
          <SvgImage src={iconSrc} alt={iconSrc} size='large' loading='eager' shade='muted' />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant='h5' component='span' className={heading}>
              {title}
            </Typography>
          }
          secondary={<span className={subheading}>{subtitle}</span>}
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
