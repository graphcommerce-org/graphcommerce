import { makeStyles, Theme } from '@material-ui/core'
import Button from '@reachdigital/next-ui/Button'
import { useRouter } from 'next/router'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    continueShoppingButton: {
      display: 'block',
      margin: `${theme.spacings.md} auto 0 auto`,
      maxWidth: 'max-content',
    },
  }),
  { name: 'ContinueShoppingButton' },
)

export default function ContinueShoppingButton() {
  const router = useRouter()
  const classes = useStyles()

  return (
    <Button
      onClick={() => router.back()}
      color='primary'
      variant='contained'
      size='large'
      className={classes.continueShoppingButton}
    >
      Continue shopping
    </Button>
  )
}
