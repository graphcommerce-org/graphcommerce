import { useFormContext } from '@graphcommerce/react-hook-form'
import { Button } from '@mui/material'

export function ResetFormButton() {
  const { reset } = useFormContext()
  return (
    <Button
      onClick={() => {
        reset({})
      }}
    >
      Reset
    </Button>
  )
}
