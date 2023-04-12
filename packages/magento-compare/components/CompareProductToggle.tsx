import { useMutation } from '@graphcommerce/graphql'
import { iconCompare, useStorefrontConfig, Button, Fab } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Checkbox, NoSsr, SxProps, Theme } from '@mui/material'
import { useState } from 'react'
import { CompareProductIdInternalFragment } from '../graphql'
import { AddProductsToCompareListDocument } from '../graphql/AddProductsToCompareList.gql'
import { RemoveProductsFromCompareListDocument } from '../graphql/RemoveProductsFromCompareList.gql'
import { useCompareList } from '../hooks/useCompareList'
import { useCompareListUidCreate } from '../hooks/useCompareListUidCreate'
import { CompareMessageSnackbar } from './CompareMessageSnackbar'

type CompareProductToggleProps = CompareProductIdInternalFragment & { sx?: SxProps<Theme> }

function CompareProductToggleBase(
  props: CompareProductToggleProps & { inCompareList: boolean; id: string },
) {
  const { id, name, sx, inCompareList } = props
  const create = useCompareListUidCreate()
  const compareList = useCompareList()

  const [add, addResult] = useMutation(AddProductsToCompareListDocument)
  const [remove, removeResult] = useMutation(RemoveProductsFromCompareListDocument)
  const loading = addResult.loading || removeResult.loading

  const [displayMessageBar, setDisplayMessageBar] = useState(false)
  const label = inCompareList
    ? i18n._(/* i18n */ 'Remove from comparison')
    : i18n._(/* i18n */ 'Add to comparison')

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()

    if (inCompareList) {
      await remove({ variables: { products: [id], uid: await create() } })
    } else {
      await add({ variables: { products: [id], uid: await create() } })
      setDisplayMessageBar(true)
    }
  }

  const preventAnimationBubble: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const explicitCompare =
    useStorefrontConfig().compareCheckbox ?? import.meta.graphCommerce.compareCheckbox

  return (
    <Box>
      {explicitCompare ? (
        <Button
          variant='text'
          size='small'
          onMouseDown={preventAnimationBubble}
          onClick={handleClick}
          sx={{
            padding: 0,
            '&:hover': {
              background: 'transparent',
            },
          }}
          title={label}
          aria-label={label}
          loading={loading}
        >
          <Checkbox checked={inCompareList} />
          <Trans id='Compare' />
        </Button>
      ) : (
        <Fab
          onClick={handleClick}
          onMouseDown={preventAnimationBubble}
          size='responsive'
          color='inherit'
          sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
          title={label}
          aria-label={label}
          icon={iconCompare}
          loading={loading}
        />
      )}

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

export function CompareProductToggle(props: CompareProductToggleProps) {
  const { compare_product_id } = props
  const compareList = useCompareList()
  const idString = String(compare_product_id)
  const inCompareList =
    compareList.data?.compareList?.items?.some((i) => i?.uid === idString) ?? false

  return (
    <NoSsr fallback={<CompareProductToggleBase {...props} inCompareList={false} id={idString} />}>
      <CompareProductToggleBase {...props} inCompareList={inCompareList} id={idString} />
    </NoSsr>
  )
}
