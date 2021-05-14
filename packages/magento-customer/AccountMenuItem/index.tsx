import { makeStyles, Theme } from '@material-ui/core'
import Button, { ButtonProps } from '@reachdigital/next-ui/Button'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconChevronRight } from '@reachdigital/next-ui/icons'
import PageLink from 'next/link'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      width: '100%',
      padding: theme.spacings.xs,
      fontSize: theme.typography.fontSize,
      borderBottom: `1px solid ${theme.palette.divider}`,
      borderRadius: 0,
      '& > span': {
        display: 'flex',
        justifyContent: 'start',
      },
      '& span.MuiButton-endIcon': {
        justifyContent: 'flex-end',
        flex: '1 1',
      },
      '&:focus': {
        // fix: disableElevation does not work when button is focused
        boxShadow: 'none',
      },
    },
    startIcon: {
      color: theme.palette.primary.mutedText,
      marginRight: theme.spacings.xxs,
    },
    disabled: {
      backgroundColor: '#fff',
    },
    childText: {
      alignSelf: 'flex-start',
    },
  }),
  { name: 'AccountMenuItem' },
)

export type AccountMenuItemProps = {
  iconSrc: string
  children: React.ReactNode
} & Omit<ButtonProps, 'endIcon' | 'startIcon' | 'disableElevation'>

export default function AccountMenuItem(props: AccountMenuItemProps) {
  const { children, iconSrc, href, disabled, ...buttonProps } = props
  const { childText, ...classes } = useStyles()

  const button = (
    <Button
      variant='contained'
      endIcon={
        <SvgImage
          src={iconChevronRight}
          alt='chevron right'
          size='small'
          loading='eager'
          shade='muted'
        />
      }
      startIcon={
        <SvgImage src={iconSrc} alt={iconSrc} size='small' loading='eager' shade='muted' />
      }
      disableElevation
      disabled={disabled}
      classes={classes}
      {...buttonProps}
    >
      <span className={childText}>{children}</span>
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
