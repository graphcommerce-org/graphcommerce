import { makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import Row from '../../Row'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      marginBottom: 0,
    },
    wrapper: {
      maxWidth: 800,
      margin: `0 auto`,
    },
  }),
  { name: 'BlogTitle' },
)

export type BlogAuthorProps = UseStyles<typeof useStyles> & {
  title: string
}

export default function BlogAuthor(props: BlogAuthorProps) {
  const { title } = props
  const classes = useStyles()

  return (
    <Row className={classes.root}>
      <div className={classes.wrapper}>
        <Typography variant='h1'>{title}</Typography>
      </div>
    </Row>
  )
}
