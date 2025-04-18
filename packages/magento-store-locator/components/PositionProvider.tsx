import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { setPositionOnMap } from '../helpers/setPositionOnMap'
import { useStoreLocatorMap } from './StoreLocatorMapLoader'

export type PositionProps = google.maps.LatLngLiteral | null

interface PositionContextProps {
  position: PositionProps
  setPosition: React.Dispatch<React.SetStateAction<PositionProps>>
}

const PositionContext = createContext<PositionContextProps | null>(null)

function PositionProvider({ children }) {
  const { map } = useStoreLocatorMap()
  const [position, setPosition] = useState<PositionProps>(null)

  useEffect(() => {
    setPositionOnMap(map, setPosition)
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
