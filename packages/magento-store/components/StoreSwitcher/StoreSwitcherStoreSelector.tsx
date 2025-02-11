import type { ActionCardListFormProps } from '@graphcommerce/ecommerce-ui'
import { ActionCardListForm } from '@graphcommerce/ecommerce-ui'
import type { ActionCardProps } from '@graphcommerce/next-ui'
import { ActionCard, sxx } from '@graphcommerce/next-ui'
import type { StoreSwitcherStoreCurrenciesProps } from './StoreSwitcherStoreCurrencies'
import { StoreSwitcherStoreCurrencies } from './StoreSwitcherStoreCurrencies'
import type { StoreSwitcherFormValues, StoreSwitcherStore } from './useStoreSwitcher'
import { useSelectedStoreGroup, useStoreSwitcherForm } from './useStoreSwitcher'

export type StoreSwitcherSelectorProps = { header?: React.ReactNode } & Omit<
  StoreSwitcherStoreCurrenciesProps,
  'store'
> &
  Omit<
    ActionCardListFormProps<
      ActionCardProps & { store?: StoreSwitcherStore },
      StoreSwitcherFormValues
    >,
    'name' | 'control' | 'items' | 'required' | 'render'
  >

export function StoreSwitcherStoreSelector(props: StoreSwitcherSelectorProps) {
  const { header, showCurrencies, ...actionCardProps } = props
  const { control } = useStoreSwitcherForm()
  const selectedGroup = useSelectedStoreGroup()

  const hidden = selectedGroup?.stores.length === 1

  return (
    <>
      {!hidden && header}
      <ActionCardListForm<ActionCardProps, StoreSwitcherFormValues>
        control={control}
        defaultValue={selectedGroup?.stores?.[0].store_code ?? undefined}
        shouldUnregister
        name='storeCode'
        layout='stack'
        size='responsive'
        required
        render={ActionCard}
        color='secondary'
        sx={sxx(hidden && { display: 'none !important' })}
        items={(selectedGroup?.stores ?? []).map((store) => ({
          store,
          title: store.store_name,
          details: (
            <StoreSwitcherStoreCurrencies
              store={store}
              showCurrencies={showCurrencies}
              variant='full'
            />
          ),
          value: store.store_code,
          disabled: store.disabled,
          slotProps: {
            title: { sx: { typography: 'subtitle1' } },
            details: { sx: { typography: 'body1', color: 'text.secondary' } },
          },
        }))}
        {...actionCardProps}
      />
    </>
  )
}
