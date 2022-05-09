import { Fab, Typography, Box } from '@mui/material'
import React from 'react'
import { responsiveVal } from '../../Styles/responsiveVal'

export type StoryItemProps = {
  asset: React.ReactNode
  url: string
  title: string
  current: boolean
}

export function StoryItem(props: StoryItemProps) {
  const { asset, title, url, current } = props

  return (
    <Box
      sx={{
        display: 'grid',
        alignContent: 'center',
        justifyItems: 'center',
      }}
    >
      <Fab
        href={`/${url}`}
        size='large'
        sx={(theme) => ({
          border: `1px solid ${theme.palette.divider}`,
          marginBottom: theme.spacings.xxs,
          padding: '3px',
          boxShadow: 'unset',
          width: responsiveVal(60, 90),
          height: responsiveVal(60, 90),
          '& img': {
            borderRadius: '99em',
            overflow: 'hidden',
            display: 'block',
          },
        })}
      >
        {asset}
      </Fab>
      <Typography component='h2' variant='caption'>
        {title}
      </Typography>
    </Box>
  )
}
