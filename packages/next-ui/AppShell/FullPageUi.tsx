import { makeStyles, NoSsr, Theme } from '@material-ui/core'
import clsx from 'clsx'
import { m } from 'framer-motion'
import { useRouter } from 'next/router'
import React from 'react'
import PageLink from '../PageTransition/PageLink'
import { BackButtonProps } from '../PageTransition/types'
import usePageTransition from '../PageTransition/usePageTransition'
import { UseStyles } from '../Styles'
import BackButton from './BackButton'

const useStyles = makeStyles(
  (theme: Theme) => ({
    backButtonRoot: {
      position: 'fixed',
      zIndex: 11,
      [theme.breakpoints.down('sm')]: {
        // top: 4,
      },
      [theme.breakpoints.down('xs')]: {
        // top: 7,
      },
      left: theme.page.horizontal,
      top: theme.page.vertical,
      [theme.breakpoints.up('md')]: {
        top: `calc(${theme.page.headerInnerHeight.sm} + ${theme.spacings.sm} * 2)`,
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

export type FullPageUiProps = {
  header?: React.ReactNode
  children?: React.ReactNode
} & BackButtonProps &
  UseStyles<typeof useStyles>

function FullPageUi(props: FullPageUiProps) {
  const { children, title, backFallbackHref, backFallbackTitle, header } = props
  const pageTransition = usePageTransition({ title })
  const { offsetProps, inFront, prevPage } = pageTransition
  const router = useRouter()
  const classes = useStyles(props)

  return (
    <>
      <m.div {...offsetProps}>
        <m.div style={{ pointerEvents: inFront ? 'all' : 'none' }}>
          {router.pathname !== '/' && (
            <m.div className={classes.backButtonRoot}>
              <NoSsr
                fallback={
                  <PageLink href={backFallbackHref}>
                    <BackButton>
                      <span className={classes.backButtonText}>{backFallbackTitle}</span>
                    </BackButton>
                  </PageLink>
                }
              >
                {prevPage?.title ? (
                  <BackButton onClick={() => router.back()}>
                    <span className={classes.backButtonText}>{prevPage.title}</span>
                  </BackButton>
                ) : (
                  <PageLink href={backFallbackHref}>
                    <BackButton>
                      <span className={classes.backButtonText}>{backFallbackTitle}</span>
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
            layout='position'
          >
            {header}
          </m.header>

          {children}
        </m.div>
      </m.div>
    </>
  )
}
FullPageUi.holdBackground = false

export default FullPageUi
