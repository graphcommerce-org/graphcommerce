import { MarkerClusterer } from '@googlemaps/markerclusterer'
import { nonNullable } from '@graphcommerce/next-ui'
import { useCallback, useEffect } from 'react'
import { StoreFragment } from '../Store.gql'
import { useStoreLocatorForm } from '../components'

/**
 * Hook to fetch and manage marker data for stores.
 *
 * @param stores - An array of stores.
 * @param isMobile - Indicates whether the app is running on a mobile device.
 * @param selected - The ID of the selected store.
 * @param map - The Google Maps map on which the markers will be displayed.
 * @param isStorePage - Indicates whether the hook is used on a page for individual stores.
 * @param urlPath - Optional array of paths in the URL.
 */
export function useStoreMarkers(
  stores: StoreFragment[],
  isMobile: boolean,
  selected: string | undefined,
  map: google.maps.Map | null = null,
) {
  const form = useStoreLocatorForm()
  const { setValue } = form
  // const handleMarkerClick = useCallback(
  //   (store: StoreFragment) => {
  //     setValue('selectedStore', store)
  //   },
  //   [setValue],
  // )

  useEffect(() => {
    if (!stores || !map) return
    console.log('rednering markers')

    const renderer = {
      render: ({ position }) => {
        const icon = document.createElement('img')
        icon.src = '/icons/marker.svg'
        icon.width = 35
        icon.height = 35

        return new google.maps.marker.AdvancedMarkerElement({
          position,
          content: icon,
        })
      },
    }

    const markers = stores?.map((store) => {
      if (!store) return null

      const { pickup_location_code, lat, lng, name } = store

      const icon = document.createElement('img')
      icon.src = '/icons/marker.svg'
      icon.width = 25
      icon.height = 25

      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: lat ?? 55, lng: lng ?? 55 },
        content: icon,
        map,
        title: name,
      })

      const isOpen = selected === pickup_location_code

      if (!isOpen) return marker

      map.setZoom(11)

      const newPosition: google.maps.LatLngLiteral = {
        lat: Number(lat),
        lng: Number(lng),
      }
      map.setCenter(newPosition)

      return marker
    })

    // const clusterer = new MarkerClusterer({ markers: markers.filter(nonNullable), map, renderer })
  }, [map, selected, stores])
}
