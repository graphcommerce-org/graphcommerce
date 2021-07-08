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

type PageContentHeaderProps = Omit<ContentHeaderProps, 'scrollY'> & UseStyles<typeof useStyles>

const PageContentHeader = React.forwardRef<HTMLDivElement, PageContentHeaderProps>((props, ref) => {
  const { scrollY } = useViewportScroll()
  const classes = useStyles(props)

  return <ContentHeader {...props} classes={classes} scrollY={scrollY} noClose ref={ref} />
})

export default PageContentHeader
