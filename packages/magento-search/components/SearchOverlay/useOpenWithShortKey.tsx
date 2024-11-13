import { Dispatch, SetStateAction, useEffect } from 'react'

export function useOpenWithShortKey(setOpen: Dispatch<SetStateAction<boolean>>) {
  useEffect(() => {
    const handleKeyPress = (ev: KeyboardEvent) => {
      const { activeElement } = globalThis.document
      const isInputFocused =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement?.hasAttribute('contenteditable')

      if (ev.code === 'Slash' && !isInputFocused) {
        ev.preventDefault()
        setOpen(true)
      }
    }

    globalThis.document.addEventListener('keypress', handleKeyPress)
    return () => globalThis.document.removeEventListener('keypress', handleKeyPress)
  }, [setOpen])
}
