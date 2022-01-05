import React from 'react'
import Row from '../../Row'
import { UseStyles } from '../../Styles'
import { responsiveVal } from '../../Styles/responsiveVal'
import { makeStyles } from '../../Styles/tssReact'

const useStyles = makeStyles({ name: 'BlogList' })((theme) => ({
  root: {
    display: 'grid',
    gap: theme.spacings.md,
    gridTemplateColumns: `repeat(auto-fill, minmax(${responsiveVal(150, 285)}, 1fr))`,
  },
}))

export type BlogListProps = UseStyles<typeof useStyles> & {
  children: React.ReactElement
}

export default function BlogList(props: BlogListProps) {
  const { children } = props
  const { classes } = useStyles()

  return <Row className={classes.root}>{children}</Row>
}
