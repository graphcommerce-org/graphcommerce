import { Button, makeStyles, Theme } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'

type SheetPrimaryActionProps = {
  text: React.ReactNode
  href: string
}

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    minWidth: 'unset',
    marginRight: -8,
    [theme.breakpoints.up('md')]: {
      background: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      boxShadow: theme.shadows[2],
      borderRadius: 25,
      '&:hover': {
        background: theme.palette.secondary.dark,
      },
    },
  },
}))

/*
  Renders a text button on mobile and a pill button on desktop
*/
export default function SheetPrimaryAction(props: SheetPrimaryActionProps) {
  const { href, text } = props
  const classes = useStyles(props)

  return (
    <Link href={href} passHref>
      <Button color='secondary' variant='text' className={classes.button}>
        {text}
      </Button>
    </Link>
  )
}
