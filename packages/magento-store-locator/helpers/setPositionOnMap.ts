import type { PositionProps } from '../components/PositionProvider'

export function setPositionOnMap(
  map: google.maps.Map | undefined,
  setPosition: (value: React.SetStateAction<PositionProps>) => void,
) {
  navigator.geolocation.getCurrentPosition((pos) => {
    if (!map) return
    const markerPosition = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    }
    setPosition(markerPosition)
    map.setCenter(markerPosition)
    map.setZoom(11)
  })
}
