import Button, { ButtonProps } from '@reachdigital/next-ui/Button'
import FormActions from '@reachdigital/next-ui/Form/FormActions'
import { useRouter } from 'next/router'
import React from 'react'

type ContinueShoppingButtonProps = ButtonProps & {
  route?: string
}

export default function ContinueShoppingButton(props: ContinueShoppingButtonProps) {
  const { color = 'primary', variant = 'contained', size = 'large', text = 'bold', route } = props
  const router = useRouter()

  return (
    <FormActions>
      <Button
        onClick={() => (route ? router.push(route) : router.back())}
        color={color}
        variant={variant}
        size={size}
        text={text}
      >
        Continue shopping
      </Button>
    </FormActions>
  )
}
