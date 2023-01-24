import { Trans } from '@lingui/react'
import { Button } from '@mui/material'
import { useAddProductsToCompare } from './hooks/useAddProductsToCompare'

type CompareProps = { id: string | null | undefined }

export function CompareProductButton(props: CompareProps) {
  const { id } = props
  const { submit, form } = useAddProductsToCompare()

  const onSubmit = () => {
    if (!id) throw Error('CompareProductButton must have an id of the product to add')
    form.setValue('products', [id])
    return submit()
  }

  return (
    <Button onClick={onSubmit}>
      <Trans id='Compare' />
    </Button>
  )
}
