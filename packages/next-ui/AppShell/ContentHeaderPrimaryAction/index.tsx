import { Button, makeStyles, Theme } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'

type ContentHeaderPrimaryActionProps = {
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

export default function ContentHeaderPrimaryAction(props: ContentHeaderPrimaryActionProps) {
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
