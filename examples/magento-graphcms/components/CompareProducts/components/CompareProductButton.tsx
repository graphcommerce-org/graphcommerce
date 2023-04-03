import { useMutation } from '@graphcommerce/graphql'
import { iconChevronRight, iconCompare, IconSvg, MessageSnackbar } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Badge, Box, Button } from '@mui/material'
import { useState } from 'react'
import { AddProductsToCompareListDocument } from '../graphql/AddProductsToCompareList.gql'
import { RemoveProductsFromCompareListDocument } from '../graphql/RemoveProductsFromCompareList.gql'
import { useCompareList } from '../hooks/useCompareList'
import { useCompareListUidCreate } from '../hooks/useCompareListUidCreate'

type CompareProps = { id: number | null | undefined; name: string | null | undefined }

export function CompareProductButton(props: CompareProps) {
  const { id, name } = props

  const idString = String(id)

  const create = useCompareListUidCreate()
  const compareList = useCompareList()

  const inCompareList = compareList.data?.compareList?.items?.some((i) => i?.uid === idString)

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
          sx={{ color: inCompareList ? 'green' : 'red' }}
          onClick={handleClick}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <Trans id='Compare' />
        </Button>
      </Badge>

      {displayMessageBar && (
        <MessageSnackbar
          open={displayMessageBar}
          onClose={() => setDisplayMessageBar(false)}
          variant='pill'
          action={
            <Button
              href='/compare'
              id='view-wishlist-button'
              size='medium'
              variant='pill'
              color='secondary'
              startIcon={<IconSvg src={iconCompare} />}
              endIcon={<IconSvg src={iconChevronRight} />}
            >
              <Trans id='View comparison' />
            </Button>
          }
        >
          <Trans
            id='<0>{name}</0> has been added to your comparison!'
            components={{ 0: <strong /> }}
            values={{ name }}
          />
        </MessageSnackbar>
      )}
    </Box>
  )
}
