import { Scroller, ScrollerProvider } from '@graphcommerce/framer-scroller'
import { Container, makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
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
  }),
  { name: 'ContentLinks' },
)

export type ContentLinksProps = UseStyles<typeof useStyles> & {
  title: string
  children: React.ReactNode
}

export default function ContentLinks(props: ContentLinksProps) {
  const { title, children } = props
  const classes = useStyles(props)

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
