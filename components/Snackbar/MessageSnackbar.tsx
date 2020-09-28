import { makeStyles, Snackbar, SnackbarProps, Theme } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { SetRequired } from 'type-fest'

type ActionComponent = (props: { close: () => void }) => React.ReactElement

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      [theme.breakpoints.down('sm')]: {
        bottom: `calc(${theme.page.vertical} * 2 + 48px)`,
        left: theme.page.horizontal,
        right: theme.page.horizontal,
      },
      [theme.breakpoints.up('md')]: {
        top: `calc(${theme.page.headerInnerHeight.sm} + ${theme.page.vertical} * 2)`,
        bottom: 'unset',
      },
      '& > *': {
        flexWrap: 'unset',
      },
      '& .MuiSnackbarContent-message': {},
      '& .MuiSnackbarContent-action': {
        whiteSpace: 'nowrap',
      },
    },
  }),
  { name: 'MessageSnackbar' },
)

export type MessageSnackbarProps = Omit<
  SetRequired<SnackbarProps, 'open' | 'message'>,
  'autoHideDuration' | 'onClose' | 'anchorOrigin' | 'children' | 'action'
> & {
  autoHide?: boolean
  Action?: ActionComponent
}

export default function MessageSnackbar(props: MessageSnackbarProps) {
  const classes = useStyles(props)

  const [showSnackbar, setSnackbar] = useState<boolean>(false)
  const { autoHide, open, Action, ...snackbarProps } = props

  useEffect(() => {
    if (open) setSnackbar(open)
  }, [open])

  return (
    <Snackbar
      {...snackbarProps}
      open={showSnackbar}
      autoHideDuration={autoHide ? 6000 : null}
      onClose={() => setSnackbar(false)}
      classes={{ ...classes }}
      action={Action && <Action close={() => setSnackbar(false)} />}
    />
  )
}
