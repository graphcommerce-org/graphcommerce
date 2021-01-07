import { makeStyles, NoSsr, Theme } from '@material-ui/core'
import clsx from 'clsx'
import { m, MotionProps } from 'framer-motion'
import { useRouter } from 'next/router'
import React from 'react'
import PageLink from '../PageTransition/PageLink'
import { UiFC } from '../PageTransition/types'
import usePageTransition from '../PageTransition/usePageTransition'
import BackButton from './BackButton'

export type FullPageUiProps = unknown & {
  logo?: React.ReactNode
  menu?: React.ReactNode
  actions?: React.ReactNode
}

const useStyles = makeStyles(
  (theme: Theme) => ({
    backButtonRoot: {
      position: 'fixed',
      top: 105, // TODO (yvo): measure header height + y amount of spacing
      background: theme.palette.background.default,
      left: theme.page.horizontal,
      zIndex: 10,
      [theme.breakpoints.down('sm')]: {
        top: 12,
      },
    },
    backButtonText: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: 100,
    },
    header: {
      padding: `${theme.spacings.sm} ${theme.page.horizontal} ${theme.spacings.sm}`,
      top: 0,
      display: 'flex',
      pointerEvents: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      [theme.breakpoints.down('sm')]: {},
      [theme.breakpoints.up('md')]: {
        background: theme.palette.background.default,
      },
    },
    headerBack: {
      pointerEvents: 'all',
      gridArea: 'back',
    },
  }),
  { name: 'FullPageUi' },
)

const FullPageUi: UiFC<FullPageUiProps> = (props) => {
  const { children, title, backFallbackHref, backFallbackTitle, logo, menu, actions } = props
  const pageTransition = usePageTransition({ title })
  const { offsetProps, inFront, hold, prevPage } = pageTransition
  const router = useRouter()
  const classes = useStyles()

  const contentAnimation: MotionProps = !hold
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1, transition: { duration: 0 } },
        exit: { opacity: 0, transition: { duration: 0 } },
      }
    : {
        initial: { opacity: 1 },
        animate: { opacity: 1, transition: { type: 'tween', ease: 'easeOut' } },
        exit: { opacity: 1, transition: { type: 'tween', ease: 'easeIn' } },
      }

  return (
    <>
      <m.div {...offsetProps}>
        <m.div style={{ pointerEvents: inFront ? 'all' : 'none' }} {...contentAnimation}>
          {router.pathname !== '/' && (
            <NoSsr fallback={<BackButton>{backFallbackTitle ?? 'Home'}</BackButton>}>
              {prevPage?.title ? (
                <BackButton onClick={() => router.back()} className={classes.backButtonRoot}>
                  <span className={classes.backButtonText}>{prevPage.title}</span>
                </BackButton>
              ) : (
                <PageLink href={backFallbackHref ?? '/'}>
                  <BackButton className={classes.backButtonRoot}>
                    <span className={classes.backButtonText}>{backFallbackTitle ?? 'Home'}</span>
                  </BackButton>
                </PageLink>
              )}
            </NoSsr>
          )}

          <m.header
            className={clsx(classes.header)}
            layoutId='header'
            transition={{ type: 'tween' }}
          >
            {logo}
            {menu}
            {actions}
          </m.header>

          {children}
        </m.div>
      </m.div>
    </>
  )
}
FullPageUi.holdBackground = false

export default FullPageUi
