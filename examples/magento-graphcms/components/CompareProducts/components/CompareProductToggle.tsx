import { useMutation } from '@graphcommerce/graphql'
import { Trans } from '@lingui/react'
import { Box, Button, Checkbox } from '@mui/material'
import { useState } from 'react'
import { AddProductsToCompareListDocument } from '../graphql/AddProductsToCompareList.gql'
import { RemoveProductsFromCompareListDocument } from '../graphql/RemoveProductsFromCompareList.gql'
import { useCompareList } from '../hooks/useCompareList'
import { useCompareListUidCreate } from '../hooks/useCompareListUidCreate'
import { CompareMessageSnackbar } from './CompareMessageSnackbar'
import { CompareProps } from './CompareProductButton'

export function CompareProductToggle(props: CompareProps) {
  const { id_internal, name } = props
  const idString = String(id_internal)
  const create = useCompareListUidCreate()
  const compareList = useCompareList()
  const inCompareList = compareList.data?.compareList?.items?.some((i) => i?.uid === idString)
  const [add] = useMutation(AddProductsToCompareListDocument)
  const [remove] = useMutation(RemoveProductsFromCompareListDocument)
  const [displayMessageBar, setDisplayMessageBar] = useState(false)

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (inCompareList) {
      await remove({ variables: { products: [idString], uid: await create() } })
    } else {
      await add({ variables: { products: [idString], uid: await create() } })
      setDisplayMessageBar(true)
    }
  }

  return (
    <Box>
      <Button
        variant='text'
        size='small'
        onMouseDown={(e) => e.stopPropagation()}
        onClick={handleClick}
        sx={{
          padding: 0,
          '&:hover': {
            background: 'transparent',
          },
        }}
      >
        <Checkbox checked={inCompareList} />
        <Trans id='Compare' />
      </Button>

      {displayMessageBar && (
        <CompareMessageSnackbar
          displayMessageBar={displayMessageBar}
          setDisplayMessageBar={setDisplayMessageBar}
          count={compareList.data?.compareList?.item_count}
          name={name}
        />
      )}
    </Box>
  )
}
