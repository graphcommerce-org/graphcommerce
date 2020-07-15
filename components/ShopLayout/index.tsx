import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { LayoutPage } from 'components/LayoutPage'
import ThemedProvider, { defaultTheme } from 'components/Theme'
import PageLoadIndicator from 'components/PageLoadIndicator'
import Error from 'next/error'
import Header from 'components/Header'
import { GetHeaderProps } from 'components/Header/getHeaderProps'
import { AnimatePresence, motion } from 'framer-motion'
import { makeStyles } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import { useRouter } from 'next/router'
import { PageTransitionPair, motionProps } from 'components/FramerMotion'
import clsx from 'clsx'
import { GetUrlResolveProps } from './getUrlResolveProps'

export type ShopLayoutProps = GetHeaderProps & GetUrlResolveProps & { error?: string }

export type PageWithShopLayout<T = Record<string, unknown>> = LayoutPage<T, ShopLayoutProps>

type StyleProps = {
  isBackTrans: boolean
  scrollOffset: ScrollOffset
}

const useStyles = makeStyles(
  {
    header: {
      zIndex: 1000,
      position: 'relative',
    },
    animationDiv: ({ isBackTrans }: StyleProps) => ({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: isBackTrans ? 0 : 1,
    }),
    offsetDiv: ({ scrollOffset }: StyleProps) => ({
      transform: `translate(${scrollOffset[0] ?? 0 * -1}px, ${scrollOffset[1] * -1}px)`,
    }),
  },
  { name: 'ShopLayout' },
)

type ScrollOffset = [number, number]

const ShopLayout: PageWithShopLayout['layout'] = ({
  children,
  menu,
  error,
  urlResolver,
  pageTransition: pageTrans,
}) => {
  const key = `${urlResolver?.type}-${urlResolver?.id}`
  const router = useRouter()
  const [backTrans, setBackTransition] = useState<PageTransitionPair | undefined>()
  const [oldKey, setOldKey] = useState<string | null>(null)
  const [scrollOffset, setScrollOffset] = useState<ScrollOffset>([0, 0])
  const styleProps: StyleProps = {
    isBackTrans: Boolean(backTrans),
    scrollOffset,
  }
  const classes = useStyles(styleProps)

  // todo(paales): better handling of scroll restauration
  // Detect if we're animating back so we can do a reverse animation
  const onTransComplete = () => backTrans && setBackTransition(undefined)

  useEffect(() => {
    router.beforePopState(() => {
      setBackTransition(pageTrans)
      return true
    })

    const offsetScrollPosition = () => {
      setScrollOffset([window.scrollX, window.scrollY])
      setOldKey(key)
    }

    router.events.on('beforeHistoryChange', offsetScrollPosition)
    return () => {
      router.events.off('beforeHistoryChange', offsetScrollPosition)
    }
  }, [key, pageTrans, router])

  // todo(paales) implement a skeleton loader
  if (!urlResolver || !urlResolver.id) return <Error statusCode={404}>{error}</Error>

  return (
    <ThemedProvider>
      <Head>
        <meta name='theme-color' content={defaultTheme.palette.primary.main} />
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        <meta name='application-name' content='Reach Digital' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='Reach Digital' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <link rel='apple-touch-icon' href='/manifest/icon-512-512.png' />
        <link rel='manifest' href='/manifest.webmanifest' />
        <link rel='shortcut icon' href='/manifest/favicon.ico' />
      </Head>
      <CssBaseline />
      <PageLoadIndicator />
      <Header menu={menu} urlResolver={urlResolver} className={classes.header} />

      <AnimatePresence
        initial={false}
        custom={backTrans ? backTrans.foreground : pageTrans?.background}
        onExitComplete={onTransComplete}
      >
        <motion.div
          key={`${urlResolver.type}-${urlResolver.id}`}
          {...motionProps(backTrans ? backTrans.background : pageTrans?.foreground)}
          className={classes.animationDiv}
        >
          <div className={clsx({ [classes.offsetDiv]: key === oldKey })}>{children}</div>
        </motion.div>
      </AnimatePresence>
      <script src='https://polyfill.io/v3/polyfill.min.js?features=ResizeObserver' />
    </ThemedProvider>
  )
}

export default ShopLayout
