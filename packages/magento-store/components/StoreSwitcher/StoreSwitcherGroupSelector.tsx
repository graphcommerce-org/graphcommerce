import type { ActionCardListFormProps } from '@graphcommerce/ecommerce-ui'
import { ActionCardListForm } from '@graphcommerce/ecommerce-ui'
import type { ActionCardProps } from '@graphcommerce/next-ui'
import { ActionCard, FlagAvatar, ListFormat, sxx } from '@graphcommerce/next-ui'
import React from 'react'
import type { StoreSwitcherStoreCurrenciesProps } from './StoreSwitcherStoreCurrencies'
import { StoreSwitcherStoreCurrencies } from './StoreSwitcherStoreCurrencies'
import type { StoreSwitcherFormValues, StoreSwitcherGroup } from './useStoreSwitcher'
import { useStoreSwitcherForm } from './useStoreSwitcher'

export type StoreSwitcherGroupSelectorProps = {
  header?: React.ReactNode
  showStores?: number
} & Omit<StoreSwitcherStoreCurrenciesProps, 'store'> &
  Omit<
    ActionCardListFormProps<
      ActionCardProps & { group?: StoreSwitcherGroup },
      StoreSwitcherFormValues
    >,
    'name' | 'control' | 'items' | 'required' | 'render'
  >

export function StoreSwitcherGroupSelector(props: StoreSwitcherGroupSelectorProps) {
  const { header, showStores = 0, showCurrencies, ...actionCardList } = props
  const { control, storeGroups } = useStoreSwitcherForm()

  const hidden = storeGroups.length === 1

  return (
    <>
      {!hidden && header}
      <ActionCardListForm<ActionCardProps, StoreSwitcherFormValues>
        control={control}
        name='storeGroupCode'
        layout='stack'
        size='responsive'
        required
        color='secondary'
        render={ActionCard}
        sx={sxx(hidden && { display: 'none !important' })}
        items={storeGroups.map((group) => ({
          group,
          image: group.country ? <FlagAvatar country={group.country} size='40px' /> : undefined,
          title: <>{group.store_group_name}</>,
          details: showStores ? (
            <>
              {group.stores.length <= showStores && (
                <ListFormat listStyle='short' type='unit'>
                  {group.stores.map((store) => (
                    <React.Fragment key={store.store_code}>
                      {store.store_name}
                      <StoreSwitcherStoreCurrencies
                        store={store}
                        showCurrencies={group.stores.length > 1 ? 0 : showCurrencies}
                        brackets
                      />
                    </React.Fragment>
                  ))}
                </ListFormat>
              )}
            </>
          ) : undefined,
          disabled: group.disabled,
          value: group.store_group_code,
          slotProps: {
            title: { sx: { typography: 'subtitle1' } },
            details: { sx: { typography: 'body1', color: 'text.secondary' } },
          },
        }))}
        {...actionCardList}
      />
    </>
  )
}
