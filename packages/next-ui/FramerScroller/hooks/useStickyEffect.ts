import { useEffect, useRef } from 'react'

export function useStickyEffect() {
  const marginRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const lastScrollTop = useRef(typeof document === 'undefined' ? 0 : document.body.scrollTop)

  const handleScroll = () => {
    const marginElement = marginRef.current
    const sidebarElement = sidebarRef.current
    const wrapperElement = wrapperRef.current

    if (!(marginElement && sidebarElement && wrapperElement)) return

    const { height: sidebarHeight } = sidebarElement.getBoundingClientRect()

    const { scrollTop } = document.documentElement
    const scrollDirection = scrollTop > lastScrollTop.current ? 1 : 0

    if (lastScrollTop.current === scrollTop || sidebarHeight <= window.innerHeight) {
      sidebarElement.style.top = '0px'
      sidebarElement.style.bottom = ''
      marginElement.style.marginTop = ''
      return
    }

    const wrapperBounds = wrapperElement.getBoundingClientRect()
    const sidebarBounds = sidebarElement.getBoundingClientRect()

    marginElement.style.marginTop = `${sidebarBounds.top - wrapperBounds.top}px`

    if (scrollDirection === 1) {
      sidebarElement.style.bottom = ''
      sidebarElement.style.top = `-${sidebarHeight - window.innerHeight}px`
    } else {
      sidebarElement.style.top = ''
      sidebarElement.style.bottom = `-${sidebarHeight - window.innerHeight}px`
    }

    lastScrollTop.current = scrollTop
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return [marginRef, sidebarRef, wrapperRef]
}
