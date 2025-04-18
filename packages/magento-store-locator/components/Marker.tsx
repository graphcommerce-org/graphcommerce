import { useWatch } from '@graphcommerce/react-hook-form'
import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import type { StoreFragment } from '../Store.gql'
import type { MarkerConfig } from './StoreLocator'
import { useStoreLocatorForm } from './StoreLocatorFormProvider'
import { useStoreLocatorMap } from './StoreLocatorMapLoader'

type MarkerProps = { store: StoreFragment; markerConfig: MarkerConfig }

const MarkerRender = React.memo<
  MarkerProps & { isPreferredStore: boolean; isFocusedStore: boolean }
>((props) => {
  const { store, markerConfig, isFocusedStore, isPreferredStore } = props
  const { setValue } = useStoreLocatorForm()
  const { map } = useStoreLocatorMap()

  useEffect(() => {
    const { defaultMarker, activeMarker, preferredStoreMarker, onMarkerClick } = markerConfig
    const code = store.pickup_location_code
    if (!store.lat || !store.lng || !code || !map) return () => {}

    const container = document.createElement('div')
    const root = createRoot(container)

    let markerContent = defaultMarker
    if (isPreferredStore) {
      markerContent = preferredStoreMarker
    } else if (isFocusedStore) {
      markerContent = activeMarker
    }
    root.render(markerContent)

    const marker = new google.maps.marker.AdvancedMarkerElement({
      position: { lat: store.lat, lng: store.lng },
      content: container,
      map,
    })

    marker.addListener('click', () => {
      setValue('focusedStore', code)
      if (onMarkerClick) onMarkerClick(store)
    })

    if (isFocusedStore) {
      const newPosition: google.maps.LatLngLiteral = {
        lat: Number(store.lat),
        lng: Number(store.lng),
      }

      map.setZoom(11)
      map.setCenter(newPosition)
    }
    return () => {
      root.unmount()
      marker.map = null
    }
  }, [isFocusedStore, isPreferredStore, map, markerConfig, setValue, store])

  return null
})

export function Marker(props: MarkerProps) {
  const { store } = props
  const { control } = useStoreLocatorForm()

  const [preferredStore, focusedStore] = useWatch({
    control,
    name: ['preferredStore', 'focusedStore'],
  })

  const isPreferredStore = preferredStore?.pickup_location_code === store.pickup_location_code
  const isFocusedStore = focusedStore === store.pickup_location_code

  return (
    <MarkerRender {...props} isFocusedStore={isFocusedStore} isPreferredStore={isPreferredStore} />
  )
}
