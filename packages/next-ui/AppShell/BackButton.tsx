import { ButtonProps, makeStyles, Theme } from '@material-ui/core'
import ArrowBack from '@material-ui/icons/ArrowBackIos'
import clsx from 'clsx'
import React from 'react'
import Button from '../Button'
import { UseStyles } from '../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      width: 'min-content',
      pointerEvents: 'all',
      boxShadow: theme.shadows[1],
      '&:hover': {
        background: theme.palette.grey['100'],
      },
      [theme.breakpoints.down('sm')]: {
        height: 40,
        width: 40,
        textAlign: 'center',
        minWidth: 'unset',
      },
    },
    icon: {
      fontSize: 18,
      [theme.breakpoints.down('sm')]: {
        paddingLeft: 4,
      },
    },
    text: {
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'unset',
      },
    },
  }),
  { name: 'BackNavFab' },
)

export type BackButtonProps = UseStyles<typeof useStyles> & ButtonProps & { down?: boolean }

const BackButton = React.forwardRef<any, BackButtonProps>((props, ref) => {
  const { text, icon, ...classes } = useStyles(props)
  const { children, down, ...fabProps } = props

  return (
    <Button
      variant='pill'
      classes={{
        root: clsx(classes.root, props.className),
        pill: classes.root,
      }}
      aria-label='Previous page'
      ref={ref}
      {...fabProps}
    >
      <ArrowBack
        shapeRendering='geometricPrecision'
        fontSize='inherit'
        color='inherit'
        classes={{ root: icon }}
      />
      <span className={text}>{children}</span>
    </Button>
  )
})
export default BackButton
