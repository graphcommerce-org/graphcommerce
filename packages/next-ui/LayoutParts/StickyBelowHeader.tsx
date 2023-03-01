import { Container } from '@mui/material'
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
        top: theme.appShell.headerHeightSm,
        [theme.breakpoints.up('md')]: {
          top: theme.rv`${theme.page.vertical} !important`,
        },
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
