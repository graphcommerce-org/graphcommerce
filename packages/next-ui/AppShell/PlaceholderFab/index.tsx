import { Fab, FabProps, makeStyles } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  () => ({
    placeholderCartFab: {
      boxShadow: 'none',
      background: 'none',
      pointerEvents: 'none',
    },
  }),
  { name: 'FullPageShell' },
)

type PlaceholderFabProps = FabProps & UseStyles<typeof useStyles>

export default function PlaceholderFab(props: PlaceholderFabProps) {
  const { ...fabProps } = props
  const classes = useStyles(props)

  return (
    <Fab className={classes.placeholderCartFab} size='large' {...fabProps}>
      <></>
    </Fab>
  )
}
