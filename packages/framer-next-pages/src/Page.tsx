import { useIsPresent } from 'framer-motion'
import type { PageItem } from './types'
import { currentHistoryIdx, scrollPos } from './utils'

type PageProps = Pick<PageItem, 'Component' | 'pageProps' | 'historyIdx'> & { active: boolean }

export default function Page(props: PageProps) {
  const { Component, pageProps, active, historyIdx } = props
  const isPresent = useIsPresent()

  /** The active StackedPage doesn't get any special treatment */
  let top = 0

  /** If the StackedPage isn't active, we offset the page */
  if (!active) top = scrollPos(historyIdx).y * -1

  /**
   * If the StackedPage isn't present as a child of <AnimatePresence/>, but it is still present in
   * the DOM, we're navigating back, so we need to offset it.
   */
  if (!isPresent) top = scrollPos(currentHistoryIdx()).y - scrollPos(historyIdx).y

  return (
    <div style={{ position: active ? 'absolute' : 'fixed', top, left: 0, right: 0 }}>
      <Component {...pageProps} />
    </div>
  )
}
