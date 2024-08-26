import { useWatch } from '@graphcommerce/react-hook-form'
import { useEffect } from 'react'
import { StoreFragment } from '../Store.gql'
import type { MarkerConfig } from './StoreLocator'
import { useStoreLocatorForm } from './StoreLocatorFormProvider'
import { useStoreLocatorMap } from './StoreLocatorMapLoader'

type MarkerProps = { store: StoreFragment; markerConfig: MarkerConfig }

export function Marker(props: MarkerProps) {
  const { store, markerConfig } = props
  const { setValue, control } = useStoreLocatorForm()
  const { map } = useStoreLocatorMap()
  const focused = useWatch({ control, name: 'focusedStore' })
  const preferredStore = useWatch({ control, name: 'preferredStore' })
  const isFocused = focused === store.pickup_location_code
  const isPreferredStore = preferredStore?.pickup_location_code === store.pickup_location_code

  // console.log('====')
  // console.log('rendering marker: ', store.pickup_location_code)
  // console.log('preferredStore', preferredStore?.pickup_location_code)
  // console.log('isPreferredStore', isPreferredStore)
  // console.log('====')

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
    if (isFocused) {
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

    if (isFocused) {
      const newPosition: google.maps.LatLngLiteral = {
        lat: Number(store.lat),
        lng: Number(store.lng),
      }

      map.setZoom(11)
      map.setCenter(newPosition)
    }

    return () => {
      // @ts-expect-error not in typescript, but does work
      marker.setMap(null)
    }
  }, [isFocused, isPreferredStore, map, markerConfig, setValue, store])

  return null
}
