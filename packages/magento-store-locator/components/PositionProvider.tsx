import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useStoreLocatorMap } from './StoreLocatorMapLoader'

export type PositionProps = google.maps.LatLngLiteral | null

interface PositionContextProps {
  position: PositionProps
  setPosition: React.Dispatch<React.SetStateAction<PositionProps>>
}

const PositionContext = createContext<PositionContextProps | null>(null)

const PositionProvider = ({ children }) => {
  const { map } = useStoreLocatorMap()
  const [position, setPosition] = useState<PositionProps>(null)

  useEffect(() => {
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
  }, [map])

  const contextValue = useMemo(() => ({ position, setPosition }), [position, setPosition])
  return <PositionContext.Provider value={contextValue}>{children}</PositionContext.Provider>
}

const usePositionContext = () => {
  const context = useContext(PositionContext)
  if (!context) {
    throw new Error('usePositionContext must be used within a PositionProvider')
  }
  return context
}

export { PositionContext, PositionProvider, usePositionContext }
