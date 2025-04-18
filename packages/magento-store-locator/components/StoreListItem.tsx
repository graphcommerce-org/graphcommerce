import { extendableComponent } from '@graphcommerce/next-ui'
import { useWatch } from '@graphcommerce/react-hook-form'
import { Box, ButtonBase } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import type { StoreFragment } from '../Store.gql'
import { StoreListItemContent } from './StoreListItemContent'
import { useStoreLocatorForm } from './StoreLocatorFormProvider'

export type RetailStoreListItemProps = {
  store: StoreFragment & { details?: React.ReactNode }
  isClosestStore?: boolean
}
export type StoreListItemRenderProps = RetailStoreListItemProps & {
  isPreferredStore: boolean
  isFocusedStore: boolean
}

const componentName = 'StoreListItem'
const parts = ['root', 'button'] as const
const { withState } = extendableComponent<
  Pick<StoreListItemRenderProps, 'isPreferredStore' | 'isClosestStore' | 'isFocusedStore'>,
  typeof componentName,
  typeof parts
>(componentName, parts)

export const StoreListItemRender = React.memo<StoreListItemRenderProps>((props) => {
  const { store, isPreferredStore, isClosestStore, isFocusedStore } = props
  const { setValue } = useStoreLocatorForm()
  const storeRef = useRef<HTMLDivElement>(null)
  const classes = withState({ isPreferredStore, isClosestStore, isFocusedStore })

  useEffect(() => {
    if (isFocusedStore && storeRef.current) {
      storeRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [isFocusedStore])

  return (
    <Box ref={storeRef} className={classes.root}>
      <ButtonBase
        className={classes.button}
        component='div'
        onClick={() => {
          if (!store.pickup_location_code) return
          setValue('focusedStore', store.pickup_location_code)
        }}
        sx={(theme) => ({
          '&.MuiButtonBase-root': {
            padding: theme.spacings.xxs,
            backgroundColor: theme.palette.background.paper,
            cursor: 'pointer',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            width: '100%',
            borderRadius: '10px',
            marginBottom: { xs: theme.spacings.xxs, md: theme.spacings.xs },
            typography: theme.typography.body1,
            border: isFocusedStore
              ? `2px solid ${theme.palette.secondary.main}`
              : `1px solid ${theme.palette.divider}`,

            ...(isPreferredStore && {
              borderColor: theme.palette.primary.main,
              borderWidth: 2,
            }),
          },
          ...(isClosestStore && {
            boxShadow: 4,
          }),
        })}
      >
        <StoreListItemContent {...props} />
      </ButtonBase>
    </Box>
  )
})

export function StoreListItem(props: RetailStoreListItemProps) {
  const { store } = props
  const { control } = useStoreLocatorForm()

  const [preferredStore, focusedStore] = useWatch({
    control,
    name: ['preferredStore', 'focusedStore'],
  })

  const isPreferredStore = preferredStore?.pickup_location_code === store.pickup_location_code
  const isFocusedStore = focusedStore === store.pickup_location_code

  return (
    <StoreListItemRender
      {...props}
      isFocusedStore={isFocusedStore}
      isPreferredStore={isPreferredStore}
    />
  )
}
