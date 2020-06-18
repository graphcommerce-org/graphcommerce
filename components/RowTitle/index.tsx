import React from 'react'
import { Theme, makeStyles, Container } from '@material-ui/core'
import RichText from 'components/RichText'
import { UseStyles } from 'components/Theme'

const useRowTitleStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      marginBottom: theme.spacings.lg,
      paddingBottom: theme.spacings.sm,
      borderBottom: `1px solid ${theme.palette.divider}`,
      color: theme.palette.primary.main,
    },
    h2: {
      ...theme.typography.h2,
    },
  }),
  { name: 'RowTitle' },
)

export type RowTitleProps = GQLRowTitleFragment & UseStyles<typeof useRowTitleStyles>

const RowIntro: React.FC<RowTitleProps> = (props) => {
  const { rowTitle } = props
  const classes = useRowTitleStyles()

  return (
    <Container className={classes.root}>
      {rowTitle && <RichText {...rowTitle} classes={{ h2: classes.h2 }} />}
    </Container>
  )
}

export default RowIntro
