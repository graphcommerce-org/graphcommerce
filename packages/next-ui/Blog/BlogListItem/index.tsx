import { Box, Link, SxProps, Theme } from '@mui/material'
import PageLink from 'next/link'
import React from 'react'
import { extendableComponent } from '../../Styles'
import { responsiveVal } from '../../Styles/responsiveVal'

export type BlogListItemProps = {
  asset: React.ReactNode
  url: string
  date: string
  locale: string
  title: string
  sx?: SxProps<Theme>
}

const name = 'BlogListItem' as const
const parts = ['item', 'date', 'asset', 'title'] as const
const { classes } = extendableComponent(name, parts)

export function BlogListItem(props: BlogListItemProps) {
  const { asset, url, date, locale, title, sx = [] } = props

  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Box
      className={classes.item}
      sx={[
        (theme) => ({
          display: 'grid',
          gridTemplateRows: `${responsiveVal(140, 220)} auto auto`,
          alignContent: 'start',
          color: theme.palette.text.primary,
          gap: theme.spacings.sm,
          marginBottom: theme.spacings.sm,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <PageLink href={`/${url}`} passHref>
        <Link color='inherit' underline='hover'>
          <Box
            className={classes.asset}
            sx={(theme) => ({
              display: 'grid',
              overflow: 'hidden',
              height: '100%',
              width: '100%',
              borderRadius: responsiveVal(
                theme.shape.borderRadius * 2,
                theme.shape.borderRadius * 3,
              ),
              '& img': {
                height: '100% !important',
                objectFit: 'cover',
              },
              '& p': {
                alignSelf: 'center',
                justifySelf: 'center',
              },
              background: theme.palette.background.paper,
            })}
          >
            {asset}
          </Box>
        </Link>
      </PageLink>

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
        {formatter.format(new Date(date))}
      </Box>

      <PageLink href={`/${url}`} passHref>
        <Link
          href={`/${url}`}
          className={classes.title}
          sx={{ typography: 'h3' }}
          color='inherit'
          underline='hover'
        >
          <Box component='h2'>{title}</Box>
        </Link>
      </PageLink>
    </Box>
  )
}
