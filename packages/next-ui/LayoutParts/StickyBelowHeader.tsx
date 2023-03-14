import Container from '@mui/material/Container'
import React from 'react'

export type StickyBelowHeaderProps = {
  children: React.ReactNode
}

/** - Makes the children sticky to the parent container */
export function StickyBelowHeader(props: StickyBelowHeaderProps) {
  return (
    <Container
      sx={(theme) => ({
        position: 'sticky',
        top: { xs: theme.appShell.headerHeightSm, md: `${theme.page.vertical} !important` },
        zIndex: 96,
        pointerEvents: 'none',
        '& > *': {
          pointerEvents: 'auto',
        },
      })}
      maxWidth={false}
      {...props}
    />
  )
}
