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
import { GetUrlResolveProps } from './getUrlResolveProps'
import { saveScrollPos, getScrollPos } from './scrollPosStorage'

export type ShopLayoutProps = GetHeaderProps & GetUrlResolveProps & { error?: string; url: string }

export type PageWithShopLayout<T = Record<string, unknown>> = LayoutPage<T, ShopLayoutProps>

type StyleProps = {
  isBackTrans: boolean
}

const useStyles = makeStyles(
  {
    animationDiv: ({ isBackTrans }: StyleProps) => ({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: isBackTrans ? 0 : 1,
    }),
  },
  { name: 'ShopLayout' },
)

const ShopLayout: PageWithShopLayout['layout'] = ({
  children,
  menu,
  error,
  urlResolver,
  pageTransition: pageTrans,
  url,
}) => {
  const router = useRouter()
  const [backTrans, setBackTransition] = useState<PageTransitionPair | undefined>()
  const [toUrl, setToUrl] = useState<string | null>(null)
  const [fromUrl, setFromUrl] = useState<string | null>(null)
  const classes = useStyles({ isBackTrans: Boolean(backTrans) })

  const onTransComplete = () => {
    if (backTrans) setBackTransition(undefined)
    const scroll = getScrollPos(url)
    window.scrollTo(scroll.x, scroll.y)
    setToUrl(null)
    setFromUrl(null)
  }

  useEffect(() => {
    window.history.scrollRestoration = 'manual'

    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    router.beforePopState(() => {
      setBackTransition(pageTrans)
      return true
    })

    const offsetScrollPosition = (newToUrl: string) => {
      setToUrl(newToUrl)
      setFromUrl(url)
      saveScrollPos(url)
      window.scrollTo(0, 0)
    }

    router.events.on('beforeHistoryChange', offsetScrollPosition)
    return () => {
      router.events.off('beforeHistoryChange', offsetScrollPosition)
    }
  }, [url, pageTrans, router])

  // todo(paales) implement a skeleton loader
  if (!urlResolver || !urlResolver.id) return <Error statusCode={404}>{error}</Error>

  let transform: string | undefined
  if (fromUrl && url === fromUrl) {
    transform = `translate(${window.scrollX * -1}px, ${window.scrollY * -1}px)`
  }
  if (toUrl && url === toUrl) {
    const scrollPos = getScrollPos(toUrl)
    transform = `translate(${scrollPos.x * -1}px, ${scrollPos.y * -1}px)`
  }

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
      <Header menu={menu} urlResolver={urlResolver} />

      <AnimatePresence
        initial={false}
        custom={backTrans ? backTrans.foreground : pageTrans?.background}
        onExitComplete={onTransComplete}
      >
        <motion.div
          key={url}
          {...motionProps(backTrans ? backTrans.background : pageTrans?.foreground)}
          className={classes.animationDiv}
        >
          <div style={{ transform }}>{children}</div>
        </motion.div>
      </AnimatePresence>
      <script src='https://polyfill.io/v3/polyfill.min.js?features=ResizeObserver' />
    </ThemedProvider>
  )
}

export default ShopLayout
