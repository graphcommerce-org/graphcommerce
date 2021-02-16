import { Button, makeStyles, Theme } from '@material-ui/core'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import React from 'react'

export type AccountMenuItemProps = {
  label: string
  startIconSrc: string
  url: string
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
    menuButtonText: {
      alignSelf: 'flex-start',
    },
  }),
  { name: 'AccountMenuItem' },
)

export default function AccountMenuItem(props: AccountMenuItemProps) {
  const { label, url, startIconSrc } = props
  const classes = useStyles()

  return (
    <PageLink href={url}>
      <Button
        variant='contained'
        // endIcon={
        //   <PictureResponsiveNext
        //     src='/icons/chevron-right.svg'
        //     alt='chevron right'
        //     type='image/svg+xml'
        //     width={24}
        //     height={24}
        //     loading='eager'
        //   />
        // }
        // startIcon={
        //   <PictureResponsiveNext
        //     src={startIconSrc}
        //     alt={startIconSrc}
        //     type='image/svg+xml'
        //     width={24}
        //     height={24}
        //     loading='eager'
        //     className={classes.startIcon}
        //   />
        // }
        disableElevation
        className={classes.menuButton}
      >
        <span className={classes.menuButtonText}>{label}</span>
      </Button>
    </PageLink>
  )
}
