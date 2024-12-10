import { styled } from '@mui/material'
import { useEffect, useState } from 'react'

type StyledDivProps = {
  keyboardOpen?: boolean
}

const StyledDiv = styled('div', {
  name: 'SearchOverlayBodyBase',
})<StyledDivProps>(({ theme, keyboardOpen }) => ({
  padding: `0 ${theme.page.horizontal} ${theme.page.vertical}`,
  '&:empty': { display: 'none' },
  '.SearchOverlay-root.scrolled &': {
    paddingTop: theme.appShell.headerHeightSm,
  },
  ...(keyboardOpen && {
    paddingBottom: '40vh', // It would be preferable to use env(keyboard-inset-height, 0px) here, but it is not fully supported in iOS yet.
  }),
}))

export function SearchOverlayBodyBase(props) {
  const [keyboardOpen, setKeyboardOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const isKeyboardOpen =
        (globalThis.visualViewport &&
          globalThis.visualViewport?.height < globalThis.innerHeight * 0.8) ??
        false
      setKeyboardOpen(isKeyboardOpen)
    }

    globalThis.visualViewport?.addEventListener('resize', handleResize)

    return () => {
      globalThis.visualViewport?.removeEventListener('resize', handleResize)
    }
  }, [])

  return <StyledDiv {...props} keyboardOpen={keyboardOpen} />
}
