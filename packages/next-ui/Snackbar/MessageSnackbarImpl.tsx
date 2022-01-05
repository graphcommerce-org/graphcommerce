import { Fab, Snackbar, SnackbarContent, SnackbarProps, Portal, lighten } from '@mui/material'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { makeStyles, useMergedClasses } from '../Styles/tssReact'
import SvgImageSimple from '../SvgImage/SvgImageSimple'
import { iconClose, iconCheckmark, iconSadFace } from '../icons'

type Size = 'normal' | 'wide'
type Variant = 'contained' | 'pill'

const useStyles = makeStyles({ name: 'MessageSnackbar' })((theme) => ({
  snackbarRoot: {},
  anchorOriginBottomCenter: {
    left: 0,
    right: 0,
    transform: 'unset',
    bottom: 0,
    pointerEvents: 'none',
    [theme.breakpoints.up('md')]: {
      padding: `${theme.page.vertical} ${theme.page.horizontal}`,
    },
  },
  root: {
    pointerEvents: 'all',
    padding: `16px ${theme.page.horizontal}px max(16px, env(safe-area-inset-bottom))`,
  },
  rootPill: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    [theme.breakpoints.up('md')]: {
      borderRadius: '99em',
    },
  },
  rootPillLarge: {},
  rootPillSeverityInfo: {},
  rootPillSeverityError: {},
  message: {
    width: '100%',
    padding: theme.spacings.xxs,
    display: 'grid',
    alignItems: 'center',
    gap: theme.spacings.xs,
    gridTemplate: `
        "children close"
        "action   action"
      `,
    gridTemplateColumns: '1fr auto',
    [theme.breakpoints.up('md')]: {
      gridTemplate: `"children action close"`,
      gridTemplateColumns: 'auto auto auto',
    },
  },
  children: {
    display: 'flex',
    columnGap: 10,
    gridArea: 'children',
    ...theme.typography.subtitle1,
    fontWeight: 400,
  },
  actionButton: {
    gridArea: 'action',
    '&:hover, &:focus': {
      backgroundColor: 'transparent',
    },
    [theme.breakpoints.down('md')]: {
      '& .MuiPillButton-pill': {
        width: '100%',
      },
    },
  },
  close: {
    backgroundColor: lighten(theme.palette.background.paper, 0.1),
  },
  sticky: {
    position: 'sticky',
  },
}))

export type MessageSnackbarImplProps = Omit<
  SnackbarProps,
  'autoHideDuration' | 'anchorOrigin' | 'color'
> & {
  autoHide?: boolean
  sticky?: boolean
  variant?: Variant
  size?: Size
  severity?: 'success' | 'info' | 'warning' | 'error'
  action?: React.ReactNode
  children?: React.ReactNode
  onClose?: () => void
}

export default function MessageSnackbarImpl(props: MessageSnackbarImplProps) {
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false)

  const {
    variant = 'contained',
    size = 'normal',
    autoHide,
    action,
    open,
    message,
    sticky,
    children,
    onClose,
    severity = 'info',
    ...snackbarProps
  } = props

  let { classes } = useStyles()
  classes = useMergedClasses(classes, props.classes)

  useEffect(() => {
    setShowSnackbar(!!open)
  }, [open])

  const hideSnackbar = () => {
    setShowSnackbar(false)
    onClose?.()
  }

  const clsxBonus = (base: string) => {
    const Size = size[0].toUpperCase() + size.slice(1)
    const Severity = severity[0].toUpperCase() + severity.slice(1)
    const Variant = variant[0].toUpperCase() + variant.slice(1)

    return clsx(
      classes[base],
      classes[`${base}${Variant}`],
      classes[`${base}${Variant}Size${Size}`],
      classes[`${base}${Variant}Severity${Severity}`],
    )
  }

  let icon = iconCheckmark
  if (severity === 'error') icon = iconSadFace

  return (
    <Portal>
      <Snackbar
        {...snackbarProps}
        message={message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={showSnackbar}
        autoHideDuration={autoHide ? 6000 : null}
        classes={{
          root: classes.snackbarRoot,
          anchorOriginBottomCenter: clsx(
            classes.anchorOriginBottomCenter,
            sticky && classes.sticky,
          ),
        }}
        onClose={hideSnackbar}
      >
        <SnackbarContent
          elevation={12}
          classes={{
            root: clsxBonus('root'),
            message: clsxBonus('message'),
            action: clsxBonus('action'),
          }}
          message={
            <>
              <div className={classes.children}>
                <SvgImageSimple src={icon} size='large' />
                <div>{children}</div>
              </div>
              {action && (
                <div className={classes.actionButton} onClick={hideSnackbar}>
                  {action}
                </div>
              )}
              <Fab className={classes.close} aria-label='Close' size='small' onClick={hideSnackbar}>
                <SvgImageSimple src={iconClose} />
              </Fab>
            </>
          }
        />
      </Snackbar>
    </Portal>
  )
}
