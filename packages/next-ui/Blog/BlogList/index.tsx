import { Container, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../../Styles'
import responsiveVal from '../../Styles/responsiveVal'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      gap: theme.spacings.md,
      gridTemplateColumns: `repeat(auto-fill, minmax(${responsiveVal(150, 285)}, 1fr))`,
      marginBottom: theme.spacings.lg,
    },
  }),
  { name: 'BlogList' },
)

type BlogListProps = UseStyles<typeof useStyles> & {
  children: React.ReactNode
}

export default function BlogList(props: BlogListProps) {
  const { children } = props
  const classes = useStyles()

  return <Container className={classes.root}>{children}</Container>
}
