import { ButtonProps, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { SvgImageSimple } from '..'
import Button from '../Button'
import { UseStyles } from '../Styles'
import { iconChevronRight } from '../icons'

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
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'unset',
      },
    },
    text: {
      pointerEvents: 'none',
    },
  }),
  { name: 'ForwardButton' },
)

export type ForwardButtonProps = UseStyles<typeof useStyles> & ButtonProps

const ForwardButton = React.forwardRef((props: ForwardButtonProps, ref) => {
  const { text, icon, ...classes } = useStyles(props)
  const { children, ...fabProps } = props

  return (
    <Button variant='pill' classes={classes} {...fabProps} ref={ref}>
      <span className={text}>{children}</span>
      <SvgImageSimple src={iconChevronRight} size='small' className={classes.root} />
    </Button>
  )
})
export default ForwardButton
