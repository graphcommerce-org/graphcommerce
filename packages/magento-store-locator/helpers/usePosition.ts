import { useEffect, useState } from 'react'
import { useStoreLocatorMap } from '../components/StoreLocatorMapLoader'

export type PositionProps = google.maps.LatLngLiteral | null

export function usePosition() {
  const [position, setPosition] = useState<PositionProps>(null)
  const { map } = useStoreLocatorMap()

  const updatePosition = (pos: PositionProps) => {
    setPosition(pos)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      if (!map) return
      const markerPosition = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      }
      updatePosition(markerPosition)
      map.setCenter(markerPosition)
      map.setZoom(11)
    })
  }, [map])

  return {
    position,
    updatePosition,
  }
}
