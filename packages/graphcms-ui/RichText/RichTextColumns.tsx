import { UseStyles } from '@graphcommerce/next-ui'
import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import RichText, { RichTextProps } from '.'

type StyleProps = { columnCount: number }

const useStyles = makeStyles(({ spacings, breakpoints }: Theme) => ({
  paragraph: {
    [breakpoints.up('md')]: {
      columnCount: ({ columnCount }: StyleProps) => columnCount,
      columnGap: spacings.md,
    },
  },
}))

type RichTextColumnsProps = UseStyles<typeof useStyles> & StyleProps & RichTextProps

export default function RichTextColumns(props: RichTextColumnsProps) {
  const classes = useStyles(props)
  return <RichText classes={classes} {...props} />
}
