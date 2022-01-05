import { Scroller, ScrollerProvider } from '@graphcommerce/framer-scroller'
import { Container, Typography } from '@mui/material'
import React from 'react'
import { UseStyles } from '../../Styles'
import { makeStyles, useMergedClasses } from '../../Styles/tssReact'

const useStyles = makeStyles({ name: 'ContentLinks' })((theme) => ({
  root: {
    marginBottom: `${theme.spacings.lg}`,
  },
  scroller: {
    justifyContent: 'start',
    gap: `${theme.spacings.md}`,
    gridAutoColumns: `max-content`,
  },
  title: {
    fontWeight: 600,
  },
}))

export type ContentLinksProps = UseStyles<typeof useStyles> & {
  title: string
  children: React.ReactNode
}

export default function ContentLinks(props: ContentLinksProps) {
  const { title, children } = props
  const classes = useMergedClasses(useStyles().classes, props.classes)

  return (
    <Container className={classes.root} maxWidth={false}>
      <ScrollerProvider scrollSnapAlign='none'>
        <Scroller className={classes.scroller} hideScrollbar>
          <Typography variant='body1' component='h3' className={classes.title}>
            {title}
          </Typography>
          {children}
        </Scroller>
      </ScrollerProvider>
    </Container>
  )
}
