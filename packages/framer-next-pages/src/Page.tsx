import { useIsPresent } from 'framer-motion'
import { pageContext } from './PageContext'
import type { PageItem } from './types'
import { currentHistoryIdx, scrollPos } from './utils'

type PageProps = PageItem & { idx: number; stackIdx: number; scope: string }

export default function Page(props: PageProps) {
  const { Component, pageProps, router, stackIdx, idx, historyIdx, scope } = props
  const active = stackIdx === idx

  // The active StackedPage doesn't get any special treatment
  let top = 0

  // If the StackedPage isn't active, we offset the page
  if (!active) top = scrollPos(historyIdx).y * -1

  // If the StackedPage isn't present as a child of <AnimatePresence/>, but it is still present in the DOM, we change change it's top position.
  if (!useIsPresent()) top = scrollPos(currentHistoryIdx()).y - scrollPos(stackIdx).y

  return (
    <pageContext.Provider value={{ router, level: stackIdx - idx }}>
      <div
        data-scope={scope}
        style={{ position: active ? 'absolute' : 'fixed', top, left: 0, right: 0 }}
      >
        <Component {...pageProps} />
      </div>
    </pageContext.Provider>
  )
}
