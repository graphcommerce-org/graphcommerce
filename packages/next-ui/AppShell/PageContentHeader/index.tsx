import { makeStyles } from '@material-ui/core'
import { useViewportScroll } from 'framer-motion'
import React from 'react'
import { UseStyles } from '../../Styles'
import ContentHeader, { ContentHeaderProps } from '../ContentHeader'

const useStyles = makeStyles(() => ({
  sheetHeader: {
    marginBottom: 62,
  },
}))

export default function PageContentHeader(
  props: Omit<ContentHeaderProps, 'yPos'> & UseStyles<typeof useStyles>,
) {
  const { scrollY } = useViewportScroll()
  const classes = useStyles(props)

  return <ContentHeader {...props} classes={classes} yPos={scrollY} noClose />
}
