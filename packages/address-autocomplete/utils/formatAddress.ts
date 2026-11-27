type PlacesAddressComponent = Pick<
  google.maps.places.AddressComponent,
  'longText' | 'shortText' | 'types'
>

type GeocoderAddressComponent = Pick<
  google.maps.GeocoderAddressComponent,
  'long_name' | 'short_name' | 'types'
>

export type AddressComponent = PlacesAddressComponent | GeocoderAddressComponent

export type FormatAddressProps = {
  addressComponents: readonly AddressComponent[]
}

/** @deprecated Use `FormatAddressProps` instead. */
export type formatAddressProps = FormatAddressProps

export type FormattedAddress = {
  street: string
  houseNumber: string
  addition: string
  postcode: string
  city: string
  country: string
  region: string
  regionCode: string
}

function getLongText(component: AddressComponent) {
  return 'longText' in component ? (component.longText ?? '') : component.long_name
}

function getShortText(component: AddressComponent) {
  return 'shortText' in component ? (component.shortText ?? '') : component.short_name
}

function findComponent(addressComponents: readonly AddressComponent[], type: string) {
  return addressComponents.find((component) => component.types.includes(type))
}

export function formatAddress(props: FormatAddressProps): FormattedAddress {
  const { addressComponents } = props

  const getLong = (type: string) => {
    const component = findComponent(addressComponents, type)
    return component ? getLongText(component) : ''
  }
  const getShort = (type: string) => {
    const component = findComponent(addressComponents, type)
    return component ? getShortText(component) : ''
  }

  const postcode = getShort('postal_code') || getShort('postal_code_prefix')
  const postcodeSuffix = getShort('postal_code_suffix')
  const country = getShort('country')
  let houseNumber = getShort('street_number')
  let addition = getShort('subpremise')

  if (!addition) {
    const houseNumberParts = houseNumber.match(/^(\d+(?:[-/]\d+)*)(\p{L}[\p{L}\d]*)$/u)
    if (houseNumberParts) [, houseNumber, addition] = houseNumberParts
  }

  return {
    street: getLong('route'),
    houseNumber,
    addition,
    postcode: postcodeSuffix ? `${postcode}-${postcodeSuffix}` : postcode,
    city: getLong('locality') || getLong('postal_town') || getLong('sublocality_level_1'),
    country,
    region: getLong('administrative_area_level_1'),
    regionCode: getShort('administrative_area_level_1'),
  }
}
