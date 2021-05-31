import Button from '@reachdigital/next-ui/Button'
import FormActions from '@reachdigital/next-ui/Form/FormActions'
import { useRouter } from 'next/router'
import React from 'react'

export default function ContinueShoppingButton() {
  const router = useRouter()

  return (
    <FormActions>
      <Button
        onClick={() => router.back()}
        color='primary'
        variant='contained'
        size='large'
        text='bold'
      >
        Continue shopping
      </Button>
    </FormActions>
  )
}
