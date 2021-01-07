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
      [theme.breakpoints.down('sm')]: {
        height: 40,
        minWidth: 40,
      },
      [theme.breakpoints.down('xs')]: {
        boxShadow: 'unset',
        paddingRight: `8px`,
        paddingLeft: `14px`,
      },
    },
    icon: {
      fontSize: 18,
    },
    text: {
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'unset',
      },
    },
  }),
  { name: 'BackNavFab' },
)

export type BackButtonProps = UseStyles<typeof useStyles> & ButtonProps & { down?: boolean }

const BackButton = React.forwardRef((props: BackButtonProps, ref) => {
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
