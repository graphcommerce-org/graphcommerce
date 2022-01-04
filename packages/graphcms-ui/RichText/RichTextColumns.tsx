import { UseStyles } from '@graphcommerce/next-ui'
import { makeStyles } from '@graphcommerce/next-ui'
import React from 'react'
import RichText, { RichTextProps } from '.'

type StyleProps = { columnCount: number }

const useStyles = makeStyles<StyleProps>()((theme, { columnCount }) => ({
  paragraph: {
    [theme.breakpoints.up('md')]: {
      columnCount: columnCount,
      columnGap: theme.spacings.md,
    },
  },
}))

type RichTextColumnsProps = UseStyles<typeof useStyles> & StyleProps & RichTextProps

export default function RichTextColumns(props: RichTextColumnsProps) {
  const { classes } = useStyles(props)
  return <RichText classes={classes} {...props} />
}
