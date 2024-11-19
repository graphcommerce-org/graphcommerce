import { useEffect } from 'react'
import { searchOverlayIsOpen } from './SearchOverlayProvider'

export function useOpenWithShortKey() {
  useEffect(() => {
    const handleKeyPress = (ev: KeyboardEvent) => {
      const { activeElement } = globalThis.document
      const isInputFocused =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement?.hasAttribute('contenteditable')

      if (ev.code === 'Slash' && !isInputFocused) {
        ev.preventDefault()
        searchOverlayIsOpen.set(true)
      }
    }

    globalThis.document.addEventListener('keypress', handleKeyPress)
    return () => globalThis.document.removeEventListener('keypress', handleKeyPress)
  }, [])
}
