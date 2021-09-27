import { Container, makeStyles, Theme, Typography } from '@material-ui/core'
import { Scroller, ScrollerProvider } from '@graphcommerce/framer-scroller'
import React from 'react'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {},
    scroller: {
      marginBottom: `${theme.spacings.lg}`,
      display: 'grid',
      gridAutoFlow: 'column',
      justifyContent: 'start',
      gap: `${theme.spacings.md}`,
      alignContent: 'center',
      '& > *': {
        minWidth: 'max-content',
      },
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
          <Typography variant='body1' component='h4' className={classes.title}>
            {title}
          </Typography>
          {children}
        </Scroller>
      </ScrollerProvider>
    </Container>
  )
}
