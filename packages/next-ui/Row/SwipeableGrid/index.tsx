import { Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import SidebarSlider from '../../FramerSlider/variants/SidebarSlider'
import { UseStyles } from '../../Styles'
import responsiveVal from '../../Styles/responsiveVal'

const useStyles = makeStyles(
  (theme: Theme) => ({
    item: {
      minWidth: responsiveVal(200, 900),
    },
  }),
  { name: 'SwipeableGridProps' },
)

type SwipeableGridProps = UseStyles<typeof useStyles> & {
  title: string
  Items: (props) => React.ReactElement
}

export default function SwipeableGrid(props: SwipeableGridProps) {
  const { title, Items } = props
  const classes = useStyles(props)

  return (
    <SidebarSlider sidebar={<Typography variant='h2'>{title}</Typography>}>
      <Items classes={classes} />
    </SidebarSlider>
  )
}
