import { googleMapsApiKey } from '@graphcommerce/next-config/config'
import { Loader } from '@googlemaps/js-api-loader'
import type { ChangeEvent, KeyboardEvent } from 'react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type { FormattedAddress } from '../utils/formatAddress'
import { formatAddress } from '../utils/formatAddress'

const addressPrimaryTypes = ['street_address', 'premise', 'subpremise', 'route']
const requestDelay = 250

type PlacesAutocompleteLibrary = Pick<
  google.maps.PlacesLibrary,
  'AutocompleteSessionToken' | 'AutocompleteSuggestion'
>

export type UsePlacesAutocompleteOptions = {
  onAddress: (address: FormattedAddress) => void
}

export function usePlacesAutocomplete({ onAddress }: UsePlacesAutocompleteOptions) {
  const [placesLibrary, setPlacesLibrary] = useState<PlacesAutocompleteLibrary>()
  const [placesError, setPlacesError] = useState<Error>()
  const [isLoaded, setIsLoaded] = useState(false)
  const [predictions, setPredictions] = useState<google.maps.places.PlacePrediction[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const sessionToken = useRef<google.maps.places.AutocompleteSessionToken | undefined>(undefined)
  const requestNumber = useRef(0)
  const addressSearchName = `places-search-${useId()}`
  const listboxId = `places-listbox-${useId()}`

  useEffect(() => {
    if (!googleMapsApiKey) return undefined

    let active = true
    const loader = new Loader({ apiKey: googleMapsApiKey, version: 'weekly' })
    void loader
      .importLibrary('places')
      .then((library) => {
        if (!active) return
        setPlacesLibrary(library)
        setIsLoaded(true)
        setPlacesError(undefined)
      })
      .catch((error: unknown) => {
        if (!active) return
        setIsLoaded(false)
        setPlacesError(error instanceof Error ? error : new Error('Unable to load Google Places'))
      })

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    const input = searchValue.trim()
    const currentRequest = ++requestNumber.current

    if (!placesLibrary || input.length < 3) {
      setLoading(false)
      setPredictions([])
      setActiveIndex(-1)
      if (!input) sessionToken.current = undefined
      return undefined
    }

    setLoading(true)
    const timeout = window.setTimeout(() => {
      sessionToken.current ??= new placesLibrary.AutocompleteSessionToken()

      void placesLibrary.AutocompleteSuggestion.fetchAutocompleteSuggestions({
        includedPrimaryTypes: addressPrimaryTypes,
        input,
        sessionToken: sessionToken.current,
      })
        .then(({ suggestions }) => {
          if (currentRequest !== requestNumber.current) return

          const nextPredictions = suggestions.flatMap((suggestion) =>
            suggestion.placePrediction ? [suggestion.placePrediction] : [],
          )
          setPredictions(nextPredictions)
          setActiveIndex(-1)
          setOpen(nextPredictions.length > 0)
          setPlacesError(undefined)
        })
        .catch((error: unknown) => {
          if (currentRequest !== requestNumber.current) return
          setPredictions([])
          setOpen(false)
          setPlacesError(
            error instanceof Error ? error : new Error('Unable to search for addresses'),
          )
        })
        .finally(() => {
          if (currentRequest === requestNumber.current) setLoading(false)
        })
    }, requestDelay)

    return () => window.clearTimeout(timeout)
  }, [placesLibrary, searchValue])

  const selectPrediction = useCallback(
    async (prediction: google.maps.places.PlacePrediction) => {
      requestNumber.current += 1
      setLoading(false)
      setOpen(false)
      setPredictions([])
      setActiveIndex(-1)

      try {
        const place = prediction.toPlace()
        await place.fetchFields({ fields: ['addressComponents'] })
        if (place.addressComponents) {
          onAddress(formatAddress({ addressComponents: place.addressComponents }))
        }
        setPlacesError(undefined)
      } catch (error) {
        setPlacesError(
          error instanceof Error ? error : new Error('Unable to retrieve the selected address'),
        )
      } finally {
        sessionToken.current = undefined
      }
    },
    [onAddress],
  )

  const closeSuggestions = useCallback(() => {
    setOpen(false)
    setActiveIndex(-1)
    sessionToken.current = undefined
  }, [])

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }, [])

  const onFocus = useCallback(() => {
    setOpen(predictions.length > 0)
  }, [predictions.length])

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Escape' || event.key === 'Tab') {
        closeSuggestions()
        return
      }
      if (!predictions.length) return

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setOpen(true)
        setActiveIndex((current) => (current + 1) % predictions.length)
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        setOpen(true)
        setActiveIndex((current) => (current <= 0 ? predictions.length - 1 : current - 1))
      } else if (event.key === 'Enter' && open && activeIndex >= 0) {
        event.preventDefault()
        void selectPrediction(predictions[activeIndex])
      }
    },
    [activeIndex, closeSuggestions, open, predictions, selectPrediction],
  )

  const autocompleteAvailable = Boolean(googleMapsApiKey && isLoaded)
  const listboxOpen = autocompleteAvailable && open && predictions.length > 0

  return {
    activeIndex,
    addressSearchName,
    autocompleteAvailable,
    closeSuggestions,
    error: placesError,
    listboxId,
    listboxOpen,
    loading,
    onChange,
    onFocus,
    onKeyDown,
    predictions,
    selectPrediction,
    setActiveIndex,
  }
}
