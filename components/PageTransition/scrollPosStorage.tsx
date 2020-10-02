type ScrollPosition = { x: number; y: number }

export function saveScrollPos(url: string) {
  if (typeof window === 'undefined') return

  const scrollPos: ScrollPosition = { x: window.scrollX, y: window.scrollY }
  if (scrollPos.x === 0 && scrollPos.y === 0) {
    sessionStorage.removeItem(`SCROLLPOS-${url}`)
  } else {
    sessionStorage.setItem(`SCROLLPOS-${url}`, JSON.stringify(scrollPos))
  }
}

export function getScrollPos(url: string) {
  if (typeof window === 'undefined') return { x: 0, y: 0 }
  const item = sessionStorage.getItem(`SCROLLPOS-${url}`)
  if (!item) {
    return { x: 0, y: 0 }
  }
  return JSON.parse(item) as ScrollPosition
}
