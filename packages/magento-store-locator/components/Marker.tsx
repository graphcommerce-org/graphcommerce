import { useEffect } from 'react'
import { StoreFragment } from '../Store.gql'
import { useStoreLocatorForm } from './StoreLocatorFormProvider'
import { useWatch } from '@graphcommerce/react-hook-form'
import { useStoreLocatorMap } from './StoreLocatorMapLoader'

type MarkerProps = { store: StoreFragment }

export function Marker(props: MarkerProps) {
  const { store } = props
  const { setValue, control } = useStoreLocatorForm()
  const { map } = useStoreLocatorMap()
  const selected = useWatch({ control, name: 'selected' })
  const isSelected = selected === store.pickup_location_code

  useEffect(() => {
    const code = store.pickup_location_code
    if (!store.lat || !store.lng || !code || !map) return () => {}

    const icon = document.createElement('img')
    icon.src = isSelected ? '/icons/marker-selected.svg' : '/icons/marker.svg'
    icon.width = 25
    icon.height = 25
    console.log('render')

    const marker = new google.maps.marker.AdvancedMarkerElement({
      position: { lat: store.lat, lng: store.lng },
      content: icon,
      map,
    })

    marker.addListener('click', () => {
      setValue('selected', code)
    })

    return () => {
      console.log('ceaning up', marker)
      // @ts-expect-error not in typescript, but does work
      marker.setMap(null)
    }
  }, [isSelected, map, setValue, store])

  return null
}
