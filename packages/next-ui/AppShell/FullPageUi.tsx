import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import { m } from 'framer-motion'
import { useRouter } from 'next/router'
import React from 'react'
import { UseStyles } from '../Styles'
import BackButton from './BackButton'

const useStyles = makeStyles(
  (theme: Theme) => ({
    backButtonRoot: {
      position: 'fixed',
      zIndex: 10,
      left: theme.page.horizontal,
      top: theme.page.vertical,
      [theme.breakpoints.up('md')]: {
        // @todo, replace 48 with content height variable.
        top: `calc(48px + ${theme.spacings.sm} * 2)`,
      },
    },
    header: {
      padding: `${theme.page.vertical} ${theme.page.horizontal} ${theme.spacings.sm}`,
      top: 0,
      display: 'flex',
      pointerEvents: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        background: theme.palette.background.default,
      },
    },
  }),
  { name: 'FullPageUi' },
)

export type FullPageUiProps = {
  header?: React.ReactNode
  children?: React.ReactNode
  backFallbackHref?: string
  backFallbackTitle?: string
} & UseStyles<typeof useStyles>

function FullPageUi(props: FullPageUiProps) {
  const { children, backFallbackHref, backFallbackTitle, header } = props
  const router = useRouter()
  const classes = useStyles(props)

  return (
    <>
      {router.pathname !== '/' && (
        <m.div className={classes.backButtonRoot}>
          <BackButton href={backFallbackHref}>{backFallbackTitle}</BackButton>
        </m.div>
      )}

      <m.header
        className={clsx(classes.header)}
        layoutId='header'
        transition={{ type: 'tween' }}
        layout='position'
      >
        {header}
      </m.header>

      {children}
    </>
  )
}

export default FullPageUi
