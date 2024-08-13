/* eslint-disable arrow-body-style */
import { useAlgoliaIndexName, useAlgoliaQuery } from '@graphcommerce/algolia-mesh'
import { GoogleEventTypes, sendEvent } from '@graphcommerce/google-datalayer'
import { useApolloClient } from '@graphcommerce/graphql'
import type { AlgoliaEventsItems_Input } from '@graphcommerce/graphql-mesh'
import { CustomerDocument } from '@graphcommerce/magento-customer/hooks/Customer.gql'
import { cookie } from '@graphcommerce/next-ui'
import { useDebounce } from '@graphcommerce/react-hook-form'
import { useEventCallback } from '@mui/material'
import { useRef } from 'react'
import { AlgoliaSendEventDocument } from '../mutations/AlgoliaSendEvent.gql'
import { isFilterTypeEqual, ProductFilterParams } from '@graphcommerce/magento-product'

const getSHA256Hash = async (input: string) => {
  const textAsBuffer = new TextEncoder().encode(input)
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', textAsBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hash = hashArray.map((item) => item.toString(16).padStart(2, '0')).join('')
  return hash
}

function mapSelectedFiltersToAlgoliaEvent(filters: ProductFilterParams['filters']) {
  const flattenedFilters: string[] = []

  Object.entries(filters).forEach(([key, filter]) => {
    if (isFilterTypeEqual(filter)) {
      const valueArray = (filter.eq ? [filter.eq] : (filter.in ?? [])) as string[]
      valueArray.forEach((value) => {
        if (key === 'category_uid') {
          flattenedFilters.push(`categoryIds:${atob(value)}`)
        } else {
          flattenedFilters.push(`${key}:${encodeURIComponent(value)}`)
        }
      })
    }

    // if (isFilterTypeMatch(value)) return null
    // if (isFilterTypeRange(value)) return null
  })

  return flattenedFilters
}

const LOCAL_STORAGE_KEY = '_algolia_conversion'
function getObjectIDToQuery(): Record<string, { queryID: string; filters: string[] }> {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || 'null') ?? {}
}

function clearAlgoliaIdToQuery() {
  window.localStorage.removeItem(LOCAL_STORAGE_KEY)
}

function saveAlgoliaIdToQuery(
  objectIDs: string[],
  queryID: string,
  incomingFilters: ProductFilterParams['filters'],
) {
  const current = getObjectIDToQuery()
  const filters = mapSelectedFiltersToAlgoliaEvent(incomingFilters)

  objectIDs.forEach((objectID) => {
    current[objectID] = { queryID, filters }
  })

  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current))
}

type AlgoliaEventCommon = {
  index: string
  userToken: string
  authenticatedUserToken?: string
  // timestamp: bigint
  queryID?: string
}

let prevFilters: string[] = []

const dataLayerToAlgoliaMap: {
  [K in keyof Partial<GoogleEventTypes>]: (
    eventName: K,
    eventData: GoogleEventTypes[K],
    common: AlgoliaEventCommon,
  ) => AlgoliaEventsItems_Input[]
} = {
  // todo should we use view_item or view_item_list?
  view_item_list: (eventName, eventData, { queryID, ...common }) => {
    const objectIDs = eventData.items.map((item) => atob(item.item_uid))

    const events: AlgoliaEventsItems_Input[] = []

    if (
      // Values of filters are different when using Algolia vs Magento, thus it does not make sense to send the filters
      queryID &&
      eventData.filter_params?.filters &&
      Object.keys(eventData.filter_params?.filters).length > 0
    ) {
      const filters = mapSelectedFiltersToAlgoliaEvent(eventData.filter_params.filters)

      const newlyAppliedFilters = filters.filter((filter) => !prevFilters.includes(filter))
      prevFilters = filters

      if (newlyAppliedFilters.length > 0) {
        events.push({
          Clicked_filters_Input: {
            eventName: `${eventName}_filter_diff`,
            eventType: 'click',
            filters: newlyAppliedFilters,
            ...common,
          },
        })
      }

      // There is a max of 10 filters per event, if there are more than 10 items
      // we need to split the event into multiple events
      for (let i = 0; i < filters.length; i += 10) {
        events.push({
          Viewed_filters_Input: {
            eventName: `${eventName}_filters`,
            eventType: 'view',
            filters: filters.slice(i, i + 10),
            ...common,
          },
        })
      }
    }

    // There is a max of 20 ObjectIDs per event, if there are more than 20 items
    // we need to split the event into multiple events
    for (let i = 0; i < objectIDs.length; i += 20) {
      events.push({
        Viewed_object_IDs_Input: {
          objectIDs: objectIDs.slice(i, i + 20),
          eventName,
          eventType: 'view',
          ...common,
        },
      })
    }

    return events
  },

  select_item: (eventName, eventData, { queryID, ...common }) => {
    const objectIDs = eventData.items.map((item) => atob(item.item_uid))
    if (queryID) saveAlgoliaIdToQuery(objectIDs, queryID, eventData.filter_params?.filters ?? {})

    return queryID
      ? [
          {
            Clicked_object_IDs_after_search_Input: {
              eventName,
              eventType: 'click',
              objectIDs,
              positions: eventData.items.map((item) => item.index + 1),
              queryID,
              ...common,
            },
          } satisfies AlgoliaEventsItems_Input,
        ]
      : [
          {
            Clicked_object_IDs_Input: {
              eventName,
              eventType: 'click',
              objectIDs: eventData.items.map((item) => atob(item.item_uid)),
              ...common,
            },
          } satisfies AlgoliaEventsItems_Input,
        ]
  },
  add_to_cart: (eventName, eventData, { queryID: _, ...common }) => {
    // It seems that these two events are 'simplified' versions of the Add_to_cart events.
    // - Converted_object_IDs_after_search_Input
    // - Converted_object_IDs_Input

    const events: AlgoliaEventsItems_Input[] = []

    const mapping = getObjectIDToQuery()
    const objectIDs = eventData.items.map((item) => atob(item.item_uid))

    const relevant = objectIDs.map((objectID) => mapping[objectID])
    const queryID = relevant?.[0]?.queryID
    const filters = [...new Set(...relevant.map((item) => item.filters))]

    if (filters.length) {
      // There is a max of 10 filters per event, if there are more than 10 items
      // we need to split the event into multiple events
      for (let i = 0; i < filters.length; i += 10) {
        events.push({
          Converted_filters_Input: {
            eventName: `${eventName}_filters`,
            eventType: 'conversion',
            filters: filters.slice(i, i + 10),
            ...common,
          },
        })
      }
    }

    if (queryID) {
      events.push({
        Added_to_cart_object_IDs_after_search_Input: {
          queryID,
          eventName,
          eventType: 'conversion',
          eventSubtype: 'addToCart',
          objectIDs: eventData.items.map((item) => atob(item.item_uid)),
          objectData: eventData.items.map((item) => ({
            discount: { Float: item.discount ?? 0 },
            price: { Float: Number(item.price.toFixed(15)) },
            quantity: item.quantity,
          })),
          currency: eventData.currency,
          value: { Float: Number(eventData.value.toFixed(15)) },
          ...common,
        },
      } satisfies AlgoliaEventsItems_Input)
    } else {
      events.push({
        Added_to_cart_object_IDs_Input: {
          eventName,
          eventType: 'conversion',
          eventSubtype: 'addToCart',
          objectIDs: eventData.items.map((item) => atob(item.item_uid)),
          objectData: eventData.items.map((item) => ({
            discount: { Float: item.discount ?? 0 },
            price: { Float: Number(item.price.toFixed(15)) },
            quantity: item.quantity,
          })),
          currency: eventData.currency,
          value: { Float: Number(eventData.value.toFixed(15)) },
          ...common,
        },
      } satisfies AlgoliaEventsItems_Input)
    }

    return events
  },

  purchase: (eventName, eventData, common) => {
    const mapping = getObjectIDToQuery()
    const isAfterSearch = !!eventData.items.find((item) => mapping[atob(item.item_uid)]?.queryID)

    const events: AlgoliaEventsItems_Input[] = []

    const objectIDs = eventData.items.map((item) => atob(item.item_uid))
    const relevant = objectIDs.map((objectID) => mapping[objectID])
    const filters = [...new Set(...relevant.map((item) => item.filters))]

    if (filters.length) {
      // There is a max of 10 filters per event, if there are more than 10 items
      // we need to split the event into multiple events
      for (let i = 0; i < filters.length; i += 10) {
        events.push({
          Converted_filters_Input: {
            eventName: `${eventName}_filters`,
            eventType: 'conversion',
            filters: filters.slice(i, i + 10),
            ...common,
          },
        })
      }
    }

    if (isAfterSearch) {
      events.push({
        Purchased_object_IDs_after_search_Input: {
          eventName,
          eventType: 'conversion',
          eventSubtype: 'purchase',
          objectIDs: eventData.items.map((item) => atob(item.item_uid)),
          objectData: eventData.items.map((item) => ({
            discount: { Float: item.discount ?? 0 },
            price: { Float: Number(item.price.toFixed(15)) },
            quantity: item.quantity,
            queryID: mapping[atob(item.item_uid)]?.queryID,
          })),
          currency: eventData.currency,
          value: { Float: Number(eventData.value.toFixed(15)) },
          ...common,
        },
      } satisfies AlgoliaEventsItems_Input)
    } else {
      events.push({
        Purchased_object_IDs_Input: {
          eventName,
          eventType: 'conversion',
          eventSubtype: 'purchase',
          objectIDs: eventData.items.map((item) => atob(item.item_uid)),
          objectData: eventData.items.map((item) => ({
            discount: { Float: item.discount ?? 0 },
            price: { Float: Number(item.price.toFixed(15)) },
            quantity: item.quantity,
          })),
          currency: eventData.currency,
          value: { Float: Number(eventData.value.toFixed(15)) },
          ...common,
        },
      } satisfies AlgoliaEventsItems_Input)
    }

    clearAlgoliaIdToQuery()
    return events
  },
}

export function useSendAlgoliaEvent() {
  const client = useApolloClient()
  const index = useAlgoliaIndexName()
  const algoliaQuery = useAlgoliaQuery()

  const eventsBuffer = useRef<AlgoliaEventsItems_Input[]>([])
  const submit = useDebounce(
    () => {
      if (eventsBuffer.current.length === 0) return

      const events = eventsBuffer.current
      eventsBuffer.current = []

      client
        .mutate({
          mutation: AlgoliaSendEventDocument,
          variables: { events },
        })
        .then(({ data, errors }) => {
          const errorMessage = (errors ?? []).map((e) => e.message)
          if (errorMessage.length > 0) {
            console.log('There was a problem sending the Algolia event to the server', errorMessage)
          }

          const response = data?.algolia_pushEvents

          if (response && response.status !== 200) {
            console.log(
              'There was a problem sending the Algolia event to the server Y',
              response.message,
            )
          }
        })
        .catch((e) => {
          console.error('There was a problem sending the Algolia event to the server Z', e)
        })
    },
    2000,
    { trailing: true },
  )

  return useEventCallback<typeof sendEvent>(async (eventName, eventData) => {
    const email = client.cache.readQuery({ query: CustomerDocument })?.customer?.email
    const authenticatedUserToken = email ? await getSHA256Hash(email) : undefined
    let userToken = cookie('_algolia_userToken')
    if (!userToken) {
      userToken = (Math.random() + 1).toString(36).substring(2)
      cookie('_algolia_userToken', userToken, { sameSite: true })
    }

    // todo check if valid
    if (authenticatedUserToken) {
      userToken = authenticatedUserToken
    }

    const events = dataLayerToAlgoliaMap[eventName]?.(eventName, eventData, {
      index,
      userToken,
      authenticatedUserToken,
      queryID: algoliaQuery.queryID ?? undefined,
      // timestamp: (Math.floor(Date.now() / 1000)),
    })

    if (events) {
      eventsBuffer.current.push(...events)
      submit()
    }
  })
}
