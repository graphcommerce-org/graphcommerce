import { makeStyles, NoSsr, Theme, useTheme } from '@material-ui/core'
import clsx from 'clsx'
import { m, MotionProps } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
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
      zIndex: 10,
      [theme.breakpoints.down('sm')]: {
        // top: 4,
      },
      [theme.breakpoints.down('xs')]: {
        // top: 7,
      },
      left: theme.page.horizontal,
      top: theme.page.vertical,
      [theme.breakpoints.up('md')]: {
        // @todo, replace 48 with content height variable.

        top: `calc(48px + ${theme.spacings.sm} * 2)`,
      },
    },
    backButtonText: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: 100,
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

  const headerRef = useRef<HTMLDivElement>(null)
  const backButtonRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <m.div {...offsetProps}>
        <m.div style={{ pointerEvents: inFront ? 'all' : 'none' }} {...contentAnimation}>
          {router.pathname !== '/' && (
            <m.div
              className={classes.backButtonRoot}
              // style={{ left: backButtonAnimLeftTemplate }}
              ref={backButtonRef}
            >
              <NoSsr fallback={<BackButton>{backFallbackTitle ?? 'Home'}</BackButton>}>
                {prevPage?.title ? (
                  <BackButton onClick={() => router.back()}>
                    <span className={classes.backButtonText}>{prevPage.title}</span>
                  </BackButton>
                ) : (
                  <PageLink href={backFallbackHref ?? '/'}>
                    <BackButton>
                      <span className={classes.backButtonText}>{backFallbackTitle ?? 'Home'}</span>
                    </BackButton>
                  </PageLink>
                )}
              </NoSsr>
            </m.div>
          )}

          <m.header
            className={clsx(classes.header)}
            layoutId='header'
            transition={{ type: 'tween' }}
            ref={headerRef}
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
