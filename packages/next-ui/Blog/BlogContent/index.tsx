import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import Row from '../../Row'

const useStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      maxWidth: 800,
      margin: `0 auto ${theme.spacings.xl} auto`,
    },
  }),
  { name: 'BlogContent' },
)

export type BlogContentProps = {
  content: React.ReactElement
}

export default function BlogContent(props: BlogContentProps) {
  const { content } = props
  const classes = useStyles()

  return (
    <Row>
      <div className={classes.wrapper}>{content}</div>
    </Row>
  )
}
