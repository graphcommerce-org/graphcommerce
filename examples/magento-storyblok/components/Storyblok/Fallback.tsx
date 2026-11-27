import type { SbBlokData } from '@storyblok/react'
import { Box, Typography } from '@mui/material'

export function StoryblokFallback({ blok }: { blok: SbBlokData }) {
  if (process.env.NODE_ENV === 'production') return null

  return (
    <Box
      sx={{
        border: '2px dashed',
        borderColor: 'warning.main',
        borderRadius: 1,
        p: 2,
        my: 2,
        bgcolor: 'warning.light',
        opacity: 0.9,
      }}
    >
      <Typography variant='body2' fontWeight='bold' color='warning.dark'>
        Missing Storyblok component: <code>{blok.component}</code>
      </Typography>
      <details>
        <summary>
          <Typography variant='caption' component='span'>
            Blok data
          </Typography>
        </summary>
        <Box component='pre' sx={{ fontSize: 11, overflow: 'auto', maxHeight: 200, mt: 1 }}>
          {JSON.stringify(blok, null, 2)}
        </Box>
      </details>
    </Box>
  )
}
