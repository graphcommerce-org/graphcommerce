import Button from '@reachdigital/next-ui/Button'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { useRouter } from 'next/router'
import React from 'react'

export default function ContinueShoppingButton() {
  const router = useRouter()
  const classes = useFormStyles()

  return (
    <div className={classes.actions}>
      <Button
        onClick={() => router.back()}
        color='primary'
        variant='contained'
        size='large'
        text='bold'
      >
        Continue shopping
      </Button>
    </div>
  )
}
