import { Theme, Box } from '@mui/material'
import React from 'react'

export type StoryListProps = {
  children: React.ReactElement
}

export function StoryList(props: StoryListProps) {
  const { children } = props

  return (
    <Box
      sx={(theme) => ({
        display: 'grid',
        justifyContent: 'center',
        gridAutoFlow: 'column',
        columnWidth: 'min-content',
        columnGap: theme.spacings.xxs,
        marginTop: 0,
        marginBottom: theme.spacings.sm,
      })}
    >
      {children}
    </Box>
  )
}
