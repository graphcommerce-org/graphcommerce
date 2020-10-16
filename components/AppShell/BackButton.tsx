import { Fab, FabProps, makeStyles, Theme } from '@material-ui/core'
import ArrowBack from '@material-ui/icons/ArrowBackIos'
import { UseStyles } from 'components/Styles'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    fabRoot: {
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
    icon: { fontSize: 18 },
    fabText: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'unset',
      },
    },
  }),
  { name: 'BackNavFab' },
)

export type BackButtonProps = UseStyles<typeof useStyles> & FabProps

export default function BackButton(props: BackButtonProps) {
  const classes = useStyles(props)
  const { children, ...fabProps } = props

  return (
    <Fab
      variant='extended'
      size='large'
      classes={{ root: classes.fabRoot }}
      aria-label='Previous page'
      {...fabProps}
    >
      <ArrowBack
        shapeRendering='geometricPrecision'
        fontSize='inherit'
        classes={{ root: classes.icon }}
      />
      <span className={classes.fabText}>{children}</span>
    </Fab>
  )
}
