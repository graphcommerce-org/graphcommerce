import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import Row from '../../Row'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      justifyContent: 'center',
      gridAutoFlow: 'column',
      columnWidth: 'min-content',
      columnGap: theme.spacings.xxs,
      marginTop: 0,
      marginBottom: theme.spacings.sm,
    },
  }),
  { name: 'StoryList' },
)

export type StoryListProps = UseStyles<typeof useStyles> & {
  children: React.ReactElement
}

export default function StoryList(props: StoryListProps) {
  const { children } = props
  const classes = useStyles()

  return <Row className={classes.root}>{children}</Row>
}
