import { useMutation } from '@graphcommerce/graphql'
import { Trans } from '@lingui/react'
import { Badge, Box, Button, Checkbox } from '@mui/material'
import { useState } from 'react'
import { AddProductsToCompareListDocument } from '../graphql/AddProductsToCompareList.gql'
import { RemoveProductsFromCompareListDocument } from '../graphql/RemoveProductsFromCompareList.gql'
import { useCompareList } from '../hooks/useCompareList'
import { useCompareListUidCreate } from '../hooks/useCompareListUidCreate'
import { CompareMessageSnackbar } from './CompareMessageSnackbar'

export type CompareProps = {
  id_internal: number | null | undefined
  name: string | null | undefined
}

export function CompareProductButton(props: CompareProps) {
  const { id_internal, name } = props
  const idString = String(id_internal)
  const create = useCompareListUidCreate()
  const compareList = useCompareList()
  const inCompareList =
    compareList.data?.compareList?.items?.some((i) => i?.uid === idString) ?? false
  const [add] = useMutation(AddProductsToCompareListDocument)
  const [remove] = useMutation(RemoveProductsFromCompareListDocument)
  const [displayMessageBar, setDisplayMessageBar] = useState(false)

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    if (inCompareList) {
      await remove({ variables: { products: [idString], uid: await create() } })
    } else {
      await add({ variables: { products: [idString], uid: await create() } })
      setDisplayMessageBar(true)
    }
  }

  return (
    <Box>
      <Badge badgeContent={compareList.data?.compareList?.item_count} color='primary'>
        <Button
          variant='contained'
          onClick={handleClick}
          onMouseDown={(e) => e.stopPropagation()}
          startIcon={<Checkbox checked={inCompareList} />}
        >
          {inCompareList ? <Trans id='In comparelist' /> : <Trans id='Compare' />}
        </Button>
      </Badge>

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
