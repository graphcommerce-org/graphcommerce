import { Box } from '@mui/material'
import React from 'react'

type ActionCardListProps = {
  children?: React.ReactNode
}

export function ActionCardList(props: ActionCardListProps) {
  const { children } = props
  return (
    <Box
      sx={(theme) => ({
        backkground: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
        border: `1px solid ${theme.palette.divider}`,
        '& .ActionCard-root': {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      })}
    >
      {children}
    </Box>
  )
}
