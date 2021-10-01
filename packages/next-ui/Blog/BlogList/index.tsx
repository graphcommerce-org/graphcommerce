import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react'
import Row from '../../Row'
import { UseStyles } from '../../Styles'
import responsiveVal from '../../Styles/responsiveVal'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      gap: theme.spacings.md,
      gridTemplateColumns: `repeat(auto-fill, minmax(${responsiveVal(150, 285)}, 1fr))`,
    },
  }),
  { name: 'BlogList' },
)

export type BlogListProps = UseStyles<typeof useStyles> & {
  children: React.ReactElement
}

export default function BlogList(props: BlogListProps) {
  const { children } = props
  const classes = useStyles()

  return <Row className={classes.root}>{children}</Row>
}
