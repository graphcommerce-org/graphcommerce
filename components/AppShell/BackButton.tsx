import { Fab, FabProps, makeStyles, Theme } from '@material-ui/core'
import ArrowBack from '@material-ui/icons/ArrowBackIos'
import { UseStyles } from 'components/Styles'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      pointerEvents: 'all',
      [theme.breakpoints.down('sm')]: {
        height: 40,
        minWidth: 40,
        borderRadius: 20,
      },
      [theme.breakpoints.down('xs')]: {
        boxShadow: 'unset',
        marginLeft: -16,
        paddingRight: `9px`,
        paddingLeft: `14px`,
      },
    },
    label: {
      pointerEvents: 'none',
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

const BackButton = React.forwardRef((props: BackButtonProps, ref) => {
  const { text, icon, ...classes } = useStyles(props)
  const { children, down, ...fabProps } = props

  return (
    <Fab variant='extended' size='large' classes={classes} aria-label='Previous page' {...fabProps}>
      <ArrowBack shapeRendering='geometricPrecision' fontSize='inherit' classes={{ root: icon }} />
      <span className={text}>{children}</span>
    </Fab>
  )
})
export default BackButton
