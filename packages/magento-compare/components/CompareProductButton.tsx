import { useMutation } from '@graphcommerce/graphql'
import { Trans } from '@lingui/react'
import { Badge, Box, Button, Checkbox, SxProps, Theme } from '@mui/material'
import { useState } from 'react'
import {
  AddProductsToCompareListDocument,
  CompareProductIdInternalFragment,
  RemoveProductsFromCompareListDocument,
} from '../graphql'
import { useCompareSummary } from '../hooks'
import { useCompareListUidCreate } from '../hooks/useCompareListUidCreate'
import { CompareMessageSnackbar } from './CompareMessageSnackbar'

type CompareProductButtonProps = CompareProductIdInternalFragment & { sx?: SxProps<Theme> }

export function CompareProductButton(props: CompareProductButtonProps) {
  const { compare_product_id, name, sx } = props
  const idString = String(compare_product_id)
  const create = useCompareListUidCreate()
  const compareList = useCompareSummary()
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
    <Box sx={[...(Array.isArray(sx) ? sx : [sx])]}>
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
