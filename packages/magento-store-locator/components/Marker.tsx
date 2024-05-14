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
  const selected = useWatch({ control, name: 'selected' })
  const isSelected = selected === store.pickup_location_code

  useEffect(() => {
    const { activeMarkerImageSrc, markerImageSrc, onMarkerClick, imageHeight, imageWidth } =
      markerConfig
    const code = store.pickup_location_code
    if (!store.lat || !store.lng || !code || !map) return () => {}

    const icon = document.createElement('img')
    icon.src = isSelected
      ? markerImageSrc ?? 'icons/marker.svg'
      : activeMarkerImageSrc ?? 'icons/marker.svg'
    icon.width = imageWidth ?? 25
    icon.height = imageHeight ?? 25

    const marker = new google.maps.marker.AdvancedMarkerElement({
      position: { lat: store.lat, lng: store.lng },
      content: icon,
      map,
    })

    marker.addListener('click', () => {
      setValue('selected', code)
      if (onMarkerClick) onMarkerClick(store)
    })

    if (isSelected) {
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
  }, [isSelected, map, markerConfig, setValue, store])

  return null
}
