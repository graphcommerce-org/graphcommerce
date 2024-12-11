import type { SxProps, Theme } from '@mui/material'
import { Box, Link, Typography } from '@mui/material'
import React from 'react'
import { DateFormat } from '../../Intl'
import { extendableComponent } from '../../Styles'
import { breakpointVal } from '../../Styles/breakpointVal'

export type BlogListItemProps = {
  asset: React.ReactNode
  url: string
  date: string | undefined
  title: string
  sx?: SxProps<Theme>
}

const name = 'BlogListItem'
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
          gridTemplateRows: 'auto auto auto',
          alignContent: 'start',
          color: theme.palette.text.primary,
          gap: theme.spacings.xxs,
          marginBottom: theme.spacings.sm,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Link href={`/${url}`} color='inherit' underline='hover'>
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
            color: theme.palette.text.secondary,
          })}
        >
          <DateFormat dateStyle='long' date={date} />
        </Box>
      )}

      <Link href={`/${url}`} className={classes.title} color='inherit' underline='hover'>
        <Typography component='h2' variant='h4'>
          {title}
        </Typography>
      </Link>
    </Box>
  )
}
