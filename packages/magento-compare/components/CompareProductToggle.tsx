import { useMutation } from '@graphcommerce/graphql'
import { compareVariant } from '@graphcommerce/next-config/config'
import type { FabProps } from '@graphcommerce/next-ui'
import { Button, Fab, iconCompare, sxx } from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import type { SxProps, Theme } from '@mui/material'
import { Checkbox, useTheme } from '@mui/material'
import { useState } from 'react'
import type { CompareProductIdInternalFragment } from '../graphql'
import { AddProductsToCompareListDocument } from '../graphql/AddProductsToCompareList.gql'
import { RemoveProductsFromCompareListDocument } from '../graphql/RemoveProductsFromCompareList.gql'
import { useCompareSummary } from '../hooks'
import { useCompareListUidCreate } from '../hooks/useCompareListUidCreate'
import { CompareMessageSnackbar } from './CompareMessageSnackbar'

export type CompareProductToggleProps = {
  sx?: SxProps<Theme>
  product: CompareProductIdInternalFragment
} & Pick<FabProps, 'color'>

function CompareProductToggleBase(
  props: CompareProductToggleProps & { inCompareList: boolean; id: string },
) {
  const { id, sx, inCompareList, product } = props
  const create = useCompareListUidCreate()
  const compareList = useCompareSummary()

  const [add, addResult] = useMutation(AddProductsToCompareListDocument)
  const [remove, removeResult] = useMutation(RemoveProductsFromCompareListDocument)
  const loading = addResult.loading || removeResult.loading

  const [displayMessageBar, setDisplayMessageBar] = useState(false)
  const label = inCompareList ? t`Remove from comparison` : t`Add to comparison`

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()

    if (inCompareList) {
      await remove({ variables: { products: [id], uid: await create() } })
    } else {
      await add({ variables: { products: [id], uid: await create() } })
      setDisplayMessageBar(true)
    }
  }

  const preventAnimationBubble = (
    e: React.TouchEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation()
    if (e.type === 'mousedown') {
      e.preventDefault()
    }
  }

  const theme2 = useTheme()

  let strokeColorPlp: string
  if (!inCompareList) {
    strokeColorPlp =
      theme2.palette.mode === 'light'
        ? theme2.palette.text.secondary
        : theme2.palette.background.paper
  } else {
    strokeColorPlp = theme2.palette.primary.main
  }

  let strokeColorPdp: string
  if (!inCompareList) {
    strokeColorPdp =
      theme2.palette.mode === 'light'
        ? theme2.palette.text.secondary
        : theme2.palette.primary.contrastText
  } else {
    strokeColorPdp = theme2.palette.primary.main
  }

  return (
    <>
      {compareVariant === 'CHECKBOX' ? (
        <Button
          variant='text'
          size='small'
          onMouseDown={preventAnimationBubble}
          onTouchStart={preventAnimationBubble}
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
          <Trans>Compare</Trans>
        </Button>
      ) : (
        <Fab
          onClick={handleClick}
          onMouseDown={preventAnimationBubble}
          onTouchStart={preventAnimationBubble}
          size='responsive'
          color='inherit'
          sx={sxx(
            (theme) => ({
              backgroundColor: 'transparent',
              flex: '0 0 auto',
              '& svg': {
                stroke: strokeColorPlp,
              },
              '&:hover': {
                backgroundColor: theme.alpha(
                  theme.vars.palette.text.primary,
                  theme.vars.palette.action.hoverOpacity,
                ),
              },
              '.SidebarGallery-root & svg': {
                stroke: strokeColorPdp,
              },
              ...theme.applyStyles('light', {
                backgroundColor: theme.vars.palette.background.paper,
              }),
            }),
            sx,
          )}
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
          name={product.name}
        />
      )}
    </>
  )
}

export function CompareProductToggle(props: CompareProductToggleProps) {
  const { product } = props
  const compareList = useCompareSummary()
  const idString = String(product.id)
  const inCompareList =
    compareList.data?.compareList?.items?.some((i) => i?.uid === idString) ?? false

  return <CompareProductToggleBase {...props} inCompareList={inCompareList} id={idString} />
}
