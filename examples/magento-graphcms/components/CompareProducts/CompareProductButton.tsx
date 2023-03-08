import { useMutation, useQuery } from '@graphcommerce/graphql'
import { iconChevronRight, IconSvg, MessageSnackbar } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Badge, Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { AddProductsToCompareListDocument } from './graphql/AddProductsToCompareList.gql'
import { CompareListDocument } from './graphql/CompareList.gql'
import { CurrentCompareUidDocument } from './graphql/CurrentCompareUid.gql'
import { RemoveProductsFromCompareListDocument } from './graphql/RemoveProductsFromCompareList.gql'
import { useCompareListIdCreate } from './hooks/useCompareListIdCreate'

type CompareProps = { id: string; name: string | null | undefined }

export function CompareProductButton(props: CompareProps) {
  const { id, name } = props

  const currentCompareId = useCompareListIdCreate()

  const idArray = [id]

  const [inCompareList, setInCompareList] = useState(false)

  const [addProductsToCompareList, addResult] = useMutation(AddProductsToCompareListDocument)
  const [removeProductsFromCompareList, removeResult] = useMutation(
    RemoveProductsFromCompareListDocument,
  )

  const { data: curCompareId } = useQuery(CurrentCompareUidDocument)
  const { data: compareListData } = useQuery(CompareListDocument, {
    variables: { uid: curCompareId?.currentCompareUid?.id ?? '' },
    fetchPolicy: 'cache-only',
  })
  const [displayMessageBar, setDisplayMessageBar] = useState(false)

  useEffect(() => {
    if (!id) {
      return
    }
    const inCompareListTest = compareListData?.compareList?.items?.map((item) => item?.uid) || []
    setInCompareList(inCompareListTest.includes(id))
  }, [compareListData?.compareList?.items, id])

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()

    if (!id) {
      return
    }

    if (inCompareList) {
      await removeProductsFromCompareList({
        variables: { products: idArray, uid: await currentCompareId() },
      })
    } else {
      await addProductsToCompareList({
        variables: { products: idArray, uid: await currentCompareId() },
      })
      setDisplayMessageBar(true)
    }
  }
  return (
    <Box>
      <Badge badgeContent={compareListData?.compareList?.item_count} color='primary'>
        <Button
          sx={{ color: inCompareList ? 'green' : 'red' }}
          onClick={handleClick}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <Trans id='Compare' />
        </Button>
      </Badge>
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
            endIcon={<IconSvg src={iconChevronRight} />}
          >
            <Trans id='View comparelist' />
          </Button>
        }
      >
        <Trans
          id='<0>{name}</0> has been added to your comparelist!'
          components={{ 0: <strong /> }}
          values={{ name }}
        />
      </MessageSnackbar>
    </Box>
  )
}
