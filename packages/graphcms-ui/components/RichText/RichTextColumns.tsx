import { UseStyles, makeStyles, useMergedClasses } from '@graphcommerce/next-ui'
import React from 'react'
import { RichText, RichTextProps } from './RichText'

type StyleProps = { columnCount: number }

const useStyles = makeStyles<StyleProps>()((theme, { columnCount }) => ({
  paragraph: {
    [theme.breakpoints.up('md')]: {
      columnCount,
      columnGap: theme.spacings.md,
    },
  },
}))

type RichTextColumnsProps = UseStyles<typeof useStyles> & StyleProps & RichTextProps

export function RichTextColumns(props: RichTextColumnsProps) {
  const { columnCount, ...richtTextProps } = props
  const classes = useMergedClasses(useStyles({ columnCount }).classes, props.classes)
  return <RichText classes={classes} {...richtTextProps} />
}
