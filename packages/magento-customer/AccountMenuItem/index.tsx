import { Button, makeStyles, Theme } from '@material-ui/core'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import clsx from 'clsx'
import React from 'react'

export type AccountMenuItemProps = {
  label: string
  startIconSrc: string
  url: string
  disabled?: boolean
}

const useStyles = makeStyles(
  (theme: Theme) => ({
    menuButton: {
      width: '100%',
      padding: theme.spacings.xs,
      fontSize: theme.typography.fontSize,
      borderBottom: `1px solid ${theme.palette.divider}`,
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
    menuButtonDisabled: {
      '&.Mui-disabled': {
        backgroundColor: '#fff',
      },
    },
    menuButtonText: {
      alignSelf: 'flex-start',
    },
  }),
  { name: 'AccountMenuItem' },
)

export default function AccountMenuItem(props: AccountMenuItemProps) {
  const { label, url, startIconSrc, disabled } = props
  const classes = useStyles()

  return (
    <PageLink href={url}>
      <Button
        variant='contained'
        disabled={disabled}
        endIcon={
          <PictureResponsiveNext
            alt='desktop_chevron_right'
            width={24}
            height={24}
            src='/icons/desktop_chevron_right.svg'
            type='image/svg+xml'
          />
        }
        startIcon={
          <PictureResponsiveNext
            alt={startIconSrc}
            width={24}
            height={24}
            src={startIconSrc}
            type='image/svg+xml'
          />
        }
        disableElevation
        className={clsx({ [classes.menuButtonDisabled]: disabled }, classes.menuButton)}
      >
        <span className={classes.menuButtonText}>{label}</span>
      </Button>
    </PageLink>
  )
}
