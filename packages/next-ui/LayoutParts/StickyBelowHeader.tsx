import { Container, SxProps, Theme } from '@mui/material'
import React from 'react'

export type StickyBelowHeaderProps = {
  children: React.ReactNode
  sx?: SxProps<Theme>
}

/** - Makes the children sticky to the parent container */
export function StickyBelowHeader(props: StickyBelowHeaderProps) {
  const { sx = [] } = props
  return (
    <Container
      sx={[
        (theme) => ({
          position: 'sticky',
          top: { xs: theme.appShell.headerHeightSm, md: `${theme.page.vertical} !important` },
          zIndex: 96,
          pointerEvents: 'none',
          '& > *': {
            pointerEvents: 'auto',
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      maxWidth={false}
      {...props}
    />
  )
}
