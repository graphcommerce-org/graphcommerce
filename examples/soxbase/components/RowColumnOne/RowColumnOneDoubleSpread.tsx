import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import RowColumnOne, { RowColumnOneProps } from '.'

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
  { name: 'RowColumnOneDoubleSpread' },
)

const useRichTextOne = makeStyles(({ typography, spacings, breakpoints }: Theme) => ({
  h2: typography.h4,
  paragraph: {
    [breakpoints.up('sm')]: {
      columnCount: 2,
      columnGap: spacings.md,
    },
    [breakpoints.up('lg')]: {
      columnCount: 3,
      columnGap: spacings.md,
    },
  },
}))

const RowColumnOneDoubleSpread: React.FC<RowColumnOneProps> = (props) => {
  const classes = useStyles(props)
  const richTextOneClasses = useRichTextOne(props)
  return <RowColumnOne {...props} classes={classes} richTextOneClasses={richTextOneClasses} />
}

export default RowColumnOneDoubleSpread
