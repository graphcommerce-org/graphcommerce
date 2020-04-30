import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core'
import RowColumnTwo, { RowColumnTwoProps } from '.'

const useStyles = makeStyles(
  ({ breakpoints }: Theme) => ({
    root: {
      [breakpoints.up('md')]: {
        gridTemplateColumns: `1fr 1fr 1fr`,
        gridTemplateAreas: `
          "one two two"
        `,
      },
    },
  }),
  { name: 'RowColumnTwoSpread' },
)

const useRichTextOne = makeStyles(({ typography }: Theme) => ({
  h2: typography.h4,
}))

const useRichTextTwo = makeStyles(({ typography, gridSpacing, breakpoints }: Theme) => ({
  h2: typography.h4,
  paragraph: {
    [breakpoints.up('md')]: {
      columnCount: 2,
      columnGap: gridSpacing.column,
    },
  },
}))

const RowColumnTwoSpread: React.FC<RowColumnTwoProps> = (props) => {
  const classes = useStyles(props)
  const richTextTwoClasses = useRichTextTwo(props)
  const richTextOneClasses = useRichTextOne(props)
  return (
    <RowColumnTwo
      {...props}
      classes={classes}
      richTextOneClasses={richTextOneClasses}
      richTextTwoClasses={richTextTwoClasses}
    />
  )
}

export default RowColumnTwoSpread
