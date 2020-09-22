import { Snackbar as MuiSnackbar, SnackbarProps } from '@material-ui/core'
import { Alert, AlertProps } from '@material-ui/lab'
import clsx from 'clsx'
import useHeaderSpacing from 'components/Header/useHeaderSpacing'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { SetRequired } from 'type-fest'

type ActionComponent = (props: { close: () => void }) => React.ReactElement

export type MessageSnackbarProps = PropsWithChildren<
  Omit<
    SetRequired<SnackbarProps, 'open'>,
    'autoHideDuration' | 'onClose' | 'anchorOrigin' | 'message' | 'children' | 'action'
  > &
    Pick<AlertProps, 'severity' | 'variant'>
> & { autoHide?: boolean; Action?: ActionComponent }

export default function MessageSnackbar(props: MessageSnackbarProps) {
  const [showSnackbar, setSnackbar] = useState<boolean>(false)
  const headerSpacing = useHeaderSpacing()
  const {
    autoHide,
    className,
    open,
    children,
    Action,
    variant = 'filled',
    severity = 'info',
    ...snackbarProps
  } = props

  useEffect(() => {
    if (open) setSnackbar(open)
  }, [open])

  return (
    <MuiSnackbar
      {...snackbarProps}
      open={showSnackbar}
      autoHideDuration={autoHide ? 6000 : null}
      onClose={() => setSnackbar(false)}
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      className={clsx(headerSpacing.top, className)}
    >
      <Alert
        variant={variant}
        severity={severity}
        action={Action && <Action close={() => setSnackbar(false)} />}
      >
        {children}
      </Alert>
    </MuiSnackbar>
  )
}
