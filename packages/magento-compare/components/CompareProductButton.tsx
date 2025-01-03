import { useMutation } from '@graphcommerce/graphql'
import { Trans } from '@lingui/react'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import type { SxProps, Theme } from '@mui/material'
import { Badge, Box, Button, Checkbox } from '@mui/material'
import { useState } from 'react'
import type { CompareProductIdInternalFragment } from '../graphql'
import { AddProductsToCompareListDocument, RemoveProductsFromCompareListDocument } from '../graphql'
import { useCompareSummary } from '../hooks'
import { useCompareListUidCreate } from '../hooks/useCompareListUidCreate'
import { CompareMessageSnackbar } from './CompareMessageSnackbar'

export type CompareProductButtonProps = CompareProductIdInternalFragment & { sx?: SxProps<Theme> }

/** @public */
export function CompareProductButton(props: CompareProductButtonProps) {
  const { id, name, sx } = props
  const idString = String(id)
  const create = useCompareListUidCreate()
  const compareList = useCompareSummary()
  const inCompareList =
    compareList.data?.compareList?.items?.some((i) => i?.uid === idString) ?? false
  const [add] = useMutation(AddProductsToCompareListDocument)
  const [remove] = useMutation(RemoveProductsFromCompareListDocument)
  const [displayMessageBar, setDisplayMessageBar] = useState(false)

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
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
