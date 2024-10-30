import { StoreFragment } from '../Store.gql'
import type { PositionProps } from '../components'

// Converts numeric degrees to radians
function toRad(Value: number) {
  return (Value * Math.PI) / 180
}

// This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1: number, lon1: number, lat2: number, lon2: number) {
  const Radius = 6371 // km
  const distanceLatitude = toRad(lat2 - lat1)
  const distanceLongitude = toRad(lon2 - lon1)
  const latitude1 = toRad(lat1)
  const latitude2 = toRad(lat2)

  const a =
    Math.sin(distanceLatitude / 2) * Math.sin(distanceLatitude / 2) +
    Math.sin(distanceLongitude / 2) *
      Math.sin(distanceLongitude / 2) *
      Math.cos(latitude1) *
      Math.cos(latitude2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = Radius * c
  return distance
}

function sortStores(position: google.maps.LatLngLiteral | null, stores: StoreFragment[]) {
  if (position) {
    return stores?.sort((a, b) => {
      const calcA = calcCrow(position.lat, position.lng, a?.lat ?? 0, a?.lng ?? 0)
      const calcB = calcCrow(position.lat, position.lng, b?.lat ?? 0, b?.lng ?? 0)

      if (calcA > calcB) {
        return 1
      }
      if (calcA < calcB) {
        return -1
      }
      return 0
    })
  }

  return stores
}

// Return an array of sortedStores based on the proximity to position
export function useStores(position: PositionProps, stores: StoreFragment[]) {
  return {
    sortedStores: sortStores(position, stores),
    position,
  }
}
