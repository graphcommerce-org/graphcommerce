import {
  useForm,
  useWatch,
  type SubmitHandler,
  type UseFormReturn,
} from '@graphcommerce/ecommerce-ui'
import { useIsomorphicLayoutEffect } from '@graphcommerce/framer-utils'
import {
  cookie,
  filterNonNullableKeys,
  storefrontAll,
  useCookie,
  useStorefrontConfig,
  type RequiredKeys,
} from '@graphcommerce/next-ui'
import { createContext, useContext, useMemo } from 'react'
import { type StoreSwitcherListQuery } from '../../graphql'

export type StoreSwitcherStore = RequiredKeys<
  NonNullable<NonNullable<StoreSwitcherListQuery['availableStores']>[0]>,
  'store_code' | 'store_name' | 'store_group_name' | 'store_group_code'
> & {
  country: string
  disabled: boolean
}

export type StoreSwitcherGroup = Pick<
  StoreSwitcherStore,
  'store_group_code' | 'store_group_name'
> & {
  stores: StoreSwitcherStore[]
  country?: string
  disabled: boolean
}

export interface StoreSwitcherFormValues {
  storeGroupCode: string
  storeCode: string
  currency: string
}

type StoreSwitcherFormContextType = {
  stores: StoreSwitcherStore[]
  storeGroups: StoreSwitcherGroup[]
} & UseFormReturn<StoreSwitcherFormValues>

export const StoreSwitcherFormContext = createContext<StoreSwitcherFormContextType | null>(null)

export function useStoreSwitcherForm(
  context?: StoreSwitcherFormContextType,
): StoreSwitcherFormContextType {
  const ctx = useContext(StoreSwitcherFormContext) ?? context
  if (!ctx) throw new Error('useStoreSwitcherForm must be used within a StoreSwitcherFormProvider')
  return ctx
}

export function useSelectedStoreGroup(
  context?: StoreSwitcherFormContextType,
): StoreSwitcherGroup | null {
  const { storeGroups, control } = useStoreSwitcherForm(context)

  const selectedStoreGroupCode = useWatch({ control, name: 'storeGroupCode' })
  const selectedStoreGroup = storeGroups.find(
    (group) => group.store_group_code === selectedStoreGroupCode,
  )

  return selectedStoreGroup ?? null
}

export function useSelectedStore(
  context?: StoreSwitcherFormContextType,
): StoreSwitcherStore | null {
  const { control } = useStoreSwitcherForm(context)

  const selectedStoreGroup = useSelectedStoreGroup(context)

  const selectedStoreCode = useWatch({ control, name: 'storeCode' })
  const selectedStore = selectedStoreGroup?.stores?.find(
    (store) => store.store_code === selectedStoreCode,
  )
  return selectedStore ?? null
}

export function useSelectedCurrency(context?: StoreSwitcherFormContextType): string | null {
  const { control } = useStoreSwitcherForm(context)

  const selectedStore = useSelectedStore(context)
  const selectedCurrencyCode = useWatch({ control, name: 'currency' })

  return selectedStore?.currency?.available_currency_codes?.includes(selectedCurrencyCode)
    ? selectedCurrencyCode
    : null
}

export type StoreSwitcherFormProviderProps = {
  children?: React.ReactNode
  onSubmit?: SubmitHandler<StoreSwitcherFormValues>
} & StoreSwitcherListQuery

export function normalizeAvailableStores(
  availableStores: StoreSwitcherListQuery['availableStores'],
): StoreSwitcherStore[] {
  return filterNonNullableKeys(availableStores, [
    'store_name',
    'store_code',
    'store_group_code',
    'store_group_name',
    'base_currency_code',
    'locale',
  ])
    .map((store) => ({
      ...store,
      country: store.locale.split('_')[1]?.toLowerCase(),
      disabled: !storefrontAll.find((l) => l.magentoStoreCode === store.store_code),
    }))
    .filter((store) => !store.disabled)
}

function normalizeStoreGroups(stores: StoreSwitcherStore[]): StoreSwitcherGroup[] {
  return Object.values(
    stores.reduce<{
      [group: string]: StoreSwitcherGroup
    }>((storesGrouped, store) => {
      if (!storesGrouped[store.store_group_code]) {
        const group: StoreSwitcherGroup = {
          store_group_code: store.store_group_code,
          store_group_name: store.store_group_name,
          stores: [],
          disabled: true,
          country: store.country,
        }
        storesGrouped[store.store_group_code] = group
      }
      if (!store.disabled) storesGrouped[store.store_group_code].disabled = false
      if (storesGrouped[store.store_group_code].country !== store.country) {
        storesGrouped[store.store_group_code].country = undefined
      }
      storesGrouped[store.store_group_code].stores.push(store)
      return storesGrouped
    }, {}),
  )
}

function useNormalizeMemo(availableStores: StoreSwitcherListQuery['availableStores']) {
  return useMemo(() => {
    const stores = normalizeAvailableStores(availableStores)
    const storeGroups = normalizeStoreGroups(stores)
    return { stores, storeGroups }
  }, [availableStores])
}

export function StoreSwitcherFormProvider(props: StoreSwitcherFormProviderProps) {
  const { children, onSubmit, availableStores } = props

  const { stores, storeGroups } = useNormalizeMemo(availableStores)

  const storeCode = useStorefrontConfig().magentoStoreCode
  const store = stores.find((s) => s.store_code === storeCode)

  const form = useForm<StoreSwitcherFormValues>({
    defaultValues: {
      storeCode,
      storeGroupCode: stores.find((s) => s.store_code === storeCode)?.store_group_code ?? '',
      currency: cookie('Magento-Content-Currency') ?? store?.default_display_currency_code ?? '',
    },
  })

  const context: StoreSwitcherFormContextType = useMemo(
    () => ({ storeGroups, stores, ...form }),
    [form, storeGroups, stores],
  )
  const { setValue } = context

  const selectedStoreGroup = useSelectedStoreGroup(context) ?? storeGroups[0]
  const selectedStore = useSelectedStore(context)
  const selectedCurrency = useSelectedCurrency(context)

  useIsomorphicLayoutEffect(() => {
    const defaultStore = selectedStoreGroup.stores[0]
    if (!selectedStore) setValue('storeCode', defaultStore.store_code)

    const currencyCode =
      selectedStore?.currency?.default_display_currency_code ??
      defaultStore.currency?.default_display_currency_code

    if (!selectedCurrency && currencyCode) setValue('currency', currencyCode)
  }, [selectedCurrency, selectedStore, selectedStoreGroup.stores, setValue])

  const submit = context.handleSubmit(async (formValues, event) => {
    const formStore = context.stores.find((s) => s.store_code === formValues.storeCode)
    const isDefaultDisplayCurrency =
      formValues.currency === formStore?.default_display_currency_code

    if (isDefaultDisplayCurrency) cookie('Magento-Content-Currency', null)
    else cookie('Magento-Content-Currency', formValues.currency)

    await onSubmit?.(formValues, event)
  })

  return (
    <StoreSwitcherFormContext.Provider value={context}>
      <form onSubmit={submit}>{children}</form>
    </StoreSwitcherFormContext.Provider>
  )
}
