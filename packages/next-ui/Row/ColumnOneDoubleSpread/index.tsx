import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import ColumnOne from '../ColumnOne'
import { ColumnOneSpreadProps } from '../ColumnOneSpread'

const useStyles = makeStyles(
  ({ breakpoints }: Theme) => ({
    root: {
      [breakpoints.up('lg')]: {
        gridTemplateColumns: `1fr 1fr 1fr`,
        gridTemplateAreas: `
          "one one one"
        `,
      },
    },
  }),
  { name: 'ColumnOneDoubleSpread' },
)

const useRichTextOne = makeStyles((theme: Theme) => ({
  h2: theme.typography.h4,
  paragraph: {
    [theme.breakpoints.up('sm')]: {
      columnCount: 2,
      columnGap: theme.spacings.md,
    },
    [theme.breakpoints.up('lg')]: {
      columnCount: 3,
      columnGap: theme.spacings.md,
    },
  },
}))

export default function ColumnOneDoubleSpread(props: ColumnOneSpreadProps) {
  const { RichContent } = props
  const classes = useStyles(props)
  const richTextOneClasses = useRichTextOne(props)

  return (
    <ColumnOne {...props} classes={classes}>
      <RichContent classes={richTextOneClasses} {...props} />
    </ColumnOne>
  )
}
