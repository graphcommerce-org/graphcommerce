import React, { useEffect } from 'react'
import { Page } from '..'

export default function Setup() {
  const appContainer = React.useRef<HTMLDivElement | null>(null)

  /**
   * This is a hack to fix the height of the iframe, which was malfunctioning because of a conflict
   * with FramerNextPages
   */
  useEffect(() => {
    const framerParent = appContainer?.current?.parentElement
    if (framerParent) {
      framerParent.style.position = 'static'
      framerParent.style.minHeight = 'unset'
    }

    const framerParent2 = framerParent?.previousSibling as HTMLDivElement | null
    if (framerParent2) {
      framerParent2.style.minHeight = 'unset'
    }
  }, [appContainer])

  return (
    <div ref={appContainer}>
      <Page />
    </div>
  )
}
