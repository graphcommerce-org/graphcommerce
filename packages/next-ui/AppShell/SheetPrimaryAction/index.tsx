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

/*
  Renders a text button on mobile and a pill button on desktop
*/
export default function SheetPrimaryAction(props: SheetPrimaryActionProps) {
  const { text } = props
  const classes = useStyles(props)

  return (
    <Button color='secondary' variant='pill-link' className={classes.button}>
      {text}
    </Button>
  )
}
