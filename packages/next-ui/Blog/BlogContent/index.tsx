import { Container, makeStyles, Theme } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      marginBottom: `${theme.spacings.lg}`,
      [theme.breakpoints.up('md')]: {
        marginBottom: `${theme.spacings.xl}`,
      },
    },
    wrapper: {
      maxWidth: 800,
      margin: `0 auto ${theme.spacings.xl} auto`,
    },
  }),
  { name: 'BlogContent' },
)

type BlogContentProps = {
  content: React.ReactElement
}

export default function BlogContent(props: BlogContentProps) {
  const { content } = props
  const classes = useStyles()

  return (
    <Container maxWidth={false} className={classes.container}>
      <div className={classes.wrapper}>{content}</div>
    </Container>
  )
}
