import { i18n } from '@lingui/core'
import { useEffect, useRef } from 'react'
import { PositionProps } from './PositionProvider'
import { useStoreLocatorMap } from './StoreLocatorMapLoader'

export function useCurrentPositionMarker(position: PositionProps) {
  const { map } = useStoreLocatorMap()
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null)

  useEffect(() => {
    if (position?.lat && position?.lng && map) {
      const LatLng = { lat: position.lat, lng: position.lng }

      // Remove the existing marker if it exists
      if (markerRef.current) {
        markerRef.current.map = null
      }

      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: LatLng,
        map,
        title: i18n._(/* i18n */ 'Current Position'),
      })

      markerRef.current = marker

      if (marker) {
        map.panTo(LatLng)
        map.setCenter(LatLng)
        map.setZoom(11)
      }
    }
  }, [map, position])
}
