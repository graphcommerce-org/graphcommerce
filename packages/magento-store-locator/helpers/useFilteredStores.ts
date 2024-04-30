import { useWatch } from '@graphcommerce/react-hook-form'
import { useCallback, useDeferredValue, useMemo } from 'react'
import { RetailStoreFragment } from '../RetailStore'
import { useStoreLocatorForm } from '../components/StoreLocatorFormProvider'
import { usePosition } from './usePosition'
import { useStores } from './useStores'

type SingleStore = Pick<RetailStoreFragment, 'name' | 'street' | 'postcode' | 'city' | 'services'>

export function useFilteredStores(position: ReturnType<typeof usePosition>['position']) {
  const { stores, loading } = useStores(position)
  const { control } = useStoreLocatorForm()

  const search = useDeferredValue(useWatch({ control, name: 'search' }))
  const serviceFilter = useDeferredValue(useWatch({ control, name: 'service' }))

  const filterByName = useCallback((s?: string) => {
    const searchLowerCase = s?.toLowerCase()
    if (!searchLowerCase) return () => true
    return (store: SingleStore) =>
      store?.name?.toLowerCase().includes(searchLowerCase) ||
      store?.street?.toLowerCase().includes(searchLowerCase) ||
      store?.postcode?.toLowerCase().includes(searchLowerCase) ||
      store?.city?.toLowerCase().includes(searchLowerCase)
  }, [])

  const filterByService = useCallback((s?: typeof serviceFilter) => {
    if (!s) return () => true

    return (store: SingleStore) => store?.services?.some((service) => service?.label === s)
  }, [])

  const visibleLocations = useMemo(
    () => stores?.filter(filterByName(search)).filter(filterByService(serviceFilter)),
    [filterByName, filterByService, search, serviceFilter, stores],
  )

  return { locations: stores, visibleLocations, loading }
}
