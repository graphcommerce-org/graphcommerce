import { useEffect } from 'react'
import { searchOverlayIsOpen } from '../components/SearchOverlayProvider'

export function useOpenWithShortKey() {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const { activeElement } = globalThis.document
      const isInputFocused =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement?.hasAttribute('contenteditable')

      if (e.code === 'Slash' && !isInputFocused) {
        e.preventDefault()
        searchOverlayIsOpen.set(true)
      }

      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        searchOverlayIsOpen.set(!searchOverlayIsOpen.get())
      }
    }

    globalThis.document.addEventListener('keydown', handleKeyPress)
    return () => globalThis.document.removeEventListener('keydown', handleKeyPress)
  }, [])
}
