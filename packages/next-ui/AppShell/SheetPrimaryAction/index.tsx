import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import Button from '../../Button'

type SheetPrimaryActionProps = {
  text: React.ReactNode
}

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    minWidth: 'unset',
    marginRight: -8,
  },
}))

const SheetPrimaryAction = React.forwardRef<any, SheetPrimaryActionProps>((props, ref) => {
  const { text } = props
  const classes = useStyles(props)

  return (
    <Button color='secondary' variant='pill-link' className={classes.button} ref={ref}>
      {text}
    </Button>
  )
})

export default SheetPrimaryAction
