import { useScrollY } from '@graphcommerce/next-ui'
import { useTheme } from '@mui/material'
import { useMotionValueEvent } from 'framer-motion'
import { useEffect, useState } from 'react'

export function useStickyHeaderOnScroll() {
  const scrollY = useScrollY()
  const [scrolled, setScrolled] = useState(false)
  const theme = useTheme()
  const fixedThreshold = parseInt(theme.appShell.headerHeightSm, 10) / 2

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest >= fixedThreshold && !scrolled) {
      setScrolled(true)
    }
    if (latest < fixedThreshold && scrolled) {
      setScrolled(false)
    }
  })

  useEffect(() => {
    if (scrolled) {
      globalThis.document.body.querySelector('.SearchOverlay-root')?.classList.add('scrolled')
    } else {
      globalThis.document.body.querySelector('.SearchOverlay-root')?.classList.remove('scrolled')
    }
  })
}
