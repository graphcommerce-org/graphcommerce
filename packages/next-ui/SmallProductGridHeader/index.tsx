import { makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    head: {
      display: 'grid',
      justifyContent: 'space-between',
      gridTemplateColumns: 'auto auto',
      alignItems: 'center',
      marginBottom: theme.spacings.md,
    },
    title: {
      textTransform: 'uppercase',
    },
  }),
  { name: 'SmallProductGridHeader' },
)

type SmallProductGridProps = {
  title: string
  pageLinks: React.ReactNode
} & UseStyles<typeof useStyles>

export default function SmallProductGrid(props: SmallProductGridProps) {
  const { title, pageLinks } = props
  const classes = useStyles(props)

  return (
    <div className={classes.head}>
      <Typography variant='h3' component='h2' className={classes.title}>
        {title}
      </Typography>
      <div>{pageLinks}</div>
    </div>
  )
}
