import { Box, Link, SxProps, Theme, Typography } from '@mui/material'
import React from 'react'
import { extendableComponent } from '../../Styles'
import { breakpointVal } from '../../Styles/breakpointVal'
import { DateFormat } from '../../Intl'

export type BlogListItemProps = {
  asset: React.ReactNode
  url: string
  date: string | undefined
  title: string
  sx?: SxProps<Theme>
}

const name = 'BlogListItem' as const
const parts = ['item', 'date', 'asset', 'title'] as const
const { classes } = extendableComponent(name, parts)

export function BlogListItem(props: BlogListItemProps) {
  const { asset, url, date, title, sx = [] } = props

  return (
    <Box
      className={classes.item}
      sx={[
        (theme) => ({
          display: 'grid',
          gridTemplateRows: `auto auto auto`,
          alignContent: 'start',
          color: theme.vars.palette.text.primary,
          gap: theme.spacings.xxs,
          marginBottom: theme.spacings.sm,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Link href={`/${url}`} underline='hover' sx={{ color: 'inherit' }}>
        <Box
          className={classes.asset}
          sx={(theme) => ({
            '& img': {
              aspectRatio: '3/2',
              objectFit: 'cover',
              ...breakpointVal(
                'borderRadius',
                theme.shape.borderRadius * 2,
                theme.shape.borderRadius * 3,
                theme.breakpoints.values,
              ),
            },
          })}
        >
          {asset}
        </Box>
      </Link>
      {date && (
        <Box
          component='time'
          className={classes.date}
          dateTime={date}
          sx={(theme) => ({
            display: 'inline-block',
            textDecoration: 'none',
            color: theme.vars.palette.text.secondary,
          })}
        >
          <DateFormat dateStyle='long'>{date}</DateFormat>
        </Box>
      )}
      <Link href={`/${url}`} className={classes.title} underline='hover' sx={{ color: 'inherit' }}>
        <Typography component='h2' variant='h4'>
          {title}
        </Typography>
      </Link>
    </Box>
  )
}
