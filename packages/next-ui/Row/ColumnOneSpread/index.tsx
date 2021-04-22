import { ContainerProps, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { UseStyles } from '../../Styles'
import ColumnOne from '../ColumnOne'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: `1fr 1fr`,
        gridTemplateAreas: `
          "one one"
        `,
      },
    },
  }),
  { name: 'ColumnOneSpread' },
)

const useRichTextOne = makeStyles((theme: Theme) => ({
  h2: theme.typography.h4,
  paragraph: {
    [theme.breakpoints.up('md')]: {
      columnCount: 2,
      columnGap: theme.spacings.md,
    },
  },
}))

export type ColumnOneSpreadProps = UseStyles<typeof useStyles> &
  Omit<ContainerProps, 'children'> & {
    Content: (props) => React.ReactElement
  }

function ColumnOneSpread(props: ColumnOneSpreadProps) {
  const { Content } = props
  const classes = useStyles(props)
  const richTextOneClasses = useRichTextOne(props)

  return (
    <ColumnOne {...props} classes={classes}>
      <Content classes={richTextOneClasses} {...props} />
    </ColumnOne>
  )
}

export default ColumnOneSpread
