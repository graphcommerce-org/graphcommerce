import { Fab, FabProps, makeStyles, Theme } from '@material-ui/core'
import ArrowForward from '@material-ui/icons/ArrowForwardIos'
import { UseStyles } from 'components/Styles'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      width: 'min-content',
      pointerEvents: 'all',
      [theme.breakpoints.down('sm')]: {
        height: 40,
        minWidth: 40,
        borderRadius: 20,
      },
      [theme.breakpoints.down('xs')]: {
        boxShadow: 'unset',
        paddingLeft: `12px`,
        paddingRight: `10px`,
      },
    },
    label: {
      whiteSpace: 'nowrap',
    },
    icon: {
      fontSize: 18,
    },
    text: {
      pointerEvents: 'none',
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'unset',
      },
    },
  }),
  { name: 'BackNavFab' },
)

export type BackButtonProps = UseStyles<typeof useStyles> & FabProps & { down?: boolean }

const ForwardButton = React.forwardRef((props: BackButtonProps, ref) => {
  const { text, icon, ...classes } = useStyles(props)
  const { children, down, ...fabProps } = props

  return (
    <Fab variant='extended' size='large' classes={classes} {...fabProps}>
      <span className={text}>{children}</span>
      <ArrowForward
        shapeRendering='geometricPrecision'
        fontSize='inherit'
        classes={{ root: icon }}
      />
    </Fab>
  )
})
export default ForwardButton
