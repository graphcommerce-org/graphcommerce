import { Scroller, ScrollerProvider } from '@graphcommerce/framer-scroller'
import { Container, SxProps, Theme, Typography } from '@mui/material'
import React from 'react'
import { extendableComponent } from '../../Styles'

export type ContentLinksProps = {
  title: string
  children: React.ReactNode
  sx?: SxProps<Theme>
}

const compName = 'ContentLinks' as const
const parts = ['root', 'scroller', 'title'] as const
const { classes } = extendableComponent(compName, parts)

export function ContentLinks(props: ContentLinksProps) {
  const { title, children, sx = [] } = props

  return (
    <Container
      className={classes.root}
      maxWidth={false}
      sx={[
        (theme) => ({
          mb: theme.spacings.md,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <ScrollerProvider scrollSnapAlign='none'>
        <Scroller
          className={classes.scroller}
          hideScrollbar
          sx={(theme) => ({
            justifyContent: 'start',
            gap: theme.spacings.md,
            gridAutoColumns: `max-content`,
          })}
        >
          <Typography variant='subtitle1' component='h2' className={classes.title}>
            {title}
          </Typography>
          {children}
        </Scroller>
      </ScrollerProvider>
    </Container>
  )
}
