import { makeStyles, Theme } from '@material-ui/core'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import React from 'react'
import RichText, { RichTextProps } from '.'

const useStyles = makeStyles(({ spacings, breakpoints }: Theme) => ({
  paragraph: {
    [breakpoints.up('md')]: {
      columnCount: ({ columnCount }: any) => columnCount,
      columnGap: spacings.md,
    },
  },
}))

type RichTextColumnsProps = UseStyles<typeof useStyles> & {
  columnCount: number
} & RichTextProps

export default function RichTextColumns(props: RichTextColumnsProps) {
  const classes = useStyles(props)

  return <RichText classes={classes} {...props} />
}
