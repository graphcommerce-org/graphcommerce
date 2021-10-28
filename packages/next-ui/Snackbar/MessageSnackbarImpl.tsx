import {
  Fab,
  makeStyles,
  Snackbar,
  SnackbarContent,
  SnackbarProps,
  Theme,
  Portal,
} from '@material-ui/core'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import SvgImageSimple from '../SvgImage/SvgImageSimple'
import { iconClose, iconCheckmark, iconSadFace } from '../icons'

type Size = 'normal' | 'wide'
type Variant = 'contained' | 'pill'

const useStyles = makeStyles(
  (theme: Theme) => ({
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
        borderRadius: 50,
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
        "action action"
      `,
      [theme.breakpoints.up('md')]: {
        gridTemplate: `"children action close"`,
      },
    },
    children: {
      // display: 'flex',
      gridArea: 'children',
      ...theme.typography.h6,
      fontWeight: 400,

      '& .MuiSvgIcon-root': {
        position: 'relative',
        fontSize: '1.1em',
        top: '0.15em',
      },
    },
    actionButton: {
      gridArea: 'action',
      '&:hover, &:focus': {
        backgroundColor: 'transparent',
      },
      '& .MuiPillButton-pill': {
        width: '100%',
        padding: theme.spacings.xxs,
        borderRadius: 40,
      },
      [theme.breakpoints.up('md')]: {
        margin: 0,
        '& .MuiPillButton-pill': {
          width: '100%',
          padding: '8px 16px',
        },
      },
    },
    closeButton: {
      gridArea: 'close',
      '& .MuiSvgIcon-root': {
        height: 24,
      },
      '& .MuiFab-sizeMedium': {
        height: 36,
        width: 36,
      },
      [theme.breakpoints.up('md')]: {
        '& .MuiSvgIcon-root': {
          height: 28,
        },
        '& .MuiFab-sizeMedium': {
          height: 44,
          width: 44,
        },
      },
    },
    sticky: {
      position: 'sticky',
    },
    messageIcon: {
      display: 'inline-block',
      marginRight: 5,
    },
  }),
  { name: 'MessageSnackbar' },
)

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

  const classes = useStyles(props)

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
  if (severity == 'error') icon = iconSadFace

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
          classes={{
            root: clsxBonus('root'),
            message: clsxBonus('message'),
            action: clsxBonus('action'),
          }}
          message={
            <>
              <div className={classes.children}>
                <div>
                  <SvgImageSimple src={icon} size='large' className={classes.messageIcon} />
                  {children}
                </div>
              </div>
              {action && (
                <div className={classes.actionButton} onClick={hideSnackbar}>
                  {action}
                </div>
              )}
              <div className={classes.closeButton}>
                <Fab aria-label='Close snackbar' size='medium' onClick={hideSnackbar}>
                  <SvgImageSimple src={iconClose} size='small' />
                </Fab>
              </div>
            </>
          }
        />
      </Snackbar>
    </Portal>
  )
}
