import { useWatch } from '@graphcommerce/react-hook-form'
import React, { useEffect } from 'react'
import { StoreFragment } from '../Store.gql'
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
    const {
      activeMarkerImageSrc,
      markerImageSrc,
      onMarkerClick,
      imageHeight,
      imageWidth,
      preferredStoreMarkerImageSrc,
    } = markerConfig
    const code = store.pickup_location_code
    if (!store.lat || !store.lng || !code || !map) return () => {}

    const icon = document.createElement('img')
    icon.src = markerImageSrc ?? 'icons/marker.svg'
    if (isFocusedStore) {
      icon.src = activeMarkerImageSrc ?? 'icons/marker.svg'
    }
    if (isPreferredStore) {
      icon.src = preferredStoreMarkerImageSrc ?? 'icons/marker.svg'
    }

    icon.width = imageWidth ?? 25
    icon.height = imageHeight ?? 25

    const marker = new google.maps.marker.AdvancedMarkerElement({
      position: { lat: store.lat, lng: store.lng },
      content: icon,
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

      // map.setZoom(11) @todo re-enable
      map.setCenter(newPosition)
    }

    return () => {
      // @ts-expect-error not in typescript, but does work
      marker.setMap(null)
    }
  }, [isFocusedStore, isPreferredStore, map, markerConfig, setValue, store])

  return null
})

export const Marker = (props: MarkerProps) => {
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
