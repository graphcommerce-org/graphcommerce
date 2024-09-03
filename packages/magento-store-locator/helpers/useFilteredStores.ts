import { useWatch } from '@graphcommerce/react-hook-form'
import { useCallback, useDeferredValue, useMemo } from 'react'
import { StoreFragment } from '../Store.gql'
import { useStoreLocatorForm } from '../components/StoreLocatorFormProvider'

// Performs a text-match based on the current value of 'search', returns an array of matching stores
export function useFilteredStores(stores: StoreFragment[]) {
  const { control } = useStoreLocatorForm()
  const search = useDeferredValue(useWatch({ control, name: 'search' }))

  const filterByName = useCallback((s?: string) => {
    const searchLowerCase = s?.toLowerCase()
    if (!searchLowerCase) return () => true
    return (store: StoreFragment) =>
      store?.name?.toLowerCase().includes(searchLowerCase) ||
      store?.street?.toLowerCase().includes(searchLowerCase) ||
      store?.postcode?.toLowerCase().includes(searchLowerCase) ||
      store?.city?.toLowerCase().includes(searchLowerCase)
  }, [])

  const filteredStores = useMemo(
    () => stores?.filter(filterByName(search)),

    [filterByName, search, stores],
  )

  return filteredStores
}
