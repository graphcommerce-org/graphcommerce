import { Page } from '@graphcommerce/hygraph-app'
import { Box } from '@mui/material'
import React from 'react'

export default function Setup() {
  const appContainer = React.useRef(null)

  /**
   * This is a hack to fix the height of the iframe, which was malfunctioning because of a conflict
   * with FramerNextPages
   */
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const framerParent = appContainer?.current?.parentElement
    framerParent.style.position = 'static'
    framerParent.style.minHeight = 'unset'

    const framerParent2 = framerParent?.previousSibling
    framerParent2.style.minHeight = 'unset'
  }, [appContainer])

  return (
    <Box
      ref={appContainer}
      sx={{
        height: '100%',
      }}
    >
      <Page />
    </Box>
  )
}
