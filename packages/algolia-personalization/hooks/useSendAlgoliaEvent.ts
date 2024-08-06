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

const getSHA256Hash = async (input: string) => {
  const textAsBuffer = new TextEncoder().encode(input)
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', textAsBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hash = hashArray.map((item) => item.toString(16).padStart(2, '0')).join('')
  return hash
}

function getAlgoliaIdToQuery(): Record<string, string> {
  return JSON.parse(localStorage.getItem('_algolia_id_to_query') || 'null') ?? {}
}

function clearAlgoliaIdToQuery() {
  window.localStorage.removeItem(`_algolia_id_to_query`)
}

function saveAlgoliaIdToQuery(queryID: string, objectIDs: string[]) {
  const current = getAlgoliaIdToQuery()

  if (queryID) {
    // current.view_item_list[item_list_name] = queryID
    objectIDs.forEach((objectID) => {
      current[objectID] = queryID
    })
  }

  window.localStorage.setItem(`_algolia_id_to_query`, JSON.stringify(current))
}

type AlgoliaEventCommon = {
  index: string
  userToken: string
  authenticatedUserToken?: string
  // timestamp: bigint
  queryID?: string
}

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

    // There is a max of 20 ObjectIDs per event, if there are more than 20 items
    // we need to split the event into multiple events
    const events: AlgoliaEventsItems_Input[] = []
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

  // view_item: (eventName, eventData, { queryID, ...common }) => [
  //   {
  //     Viewed_object_IDs_Input: {
  //       objectIDs: eventData.items.map((item) => atob(item.item_uid)),
  //       eventName,
  //       eventType: 'view',
  //       ...common,
  //     },
  //   },
  // ],

  select_item: (eventName, eventData, { queryID, ...common }) => {
    const objectIDs = eventData.items.map((item) => atob(item.item_uid))
    if (queryID) saveAlgoliaIdToQuery(queryID, objectIDs)

    return queryID
      ? [
          {
            Clicked_object_IDs_after_search_Input: {
              eventName,
              eventType: 'click',
              objectIDs,
              positions: eventData.items.map((item) => item.index),
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

    const mapping = getAlgoliaIdToQuery()
    const objectIDs = eventData.items.map((item) => atob(item.item_uid))
    const queryID = objectIDs.map((objectID) => mapping[objectID])?.[0]

    return queryID
      ? [
          // {
          //   // todo
          //   Converted_filters_Input: {
          //     eventName,
          //     eventType: 'conversion',
          //   },
          // },
          {
            Added_to_cart_object_IDs_after_search_Input: {
              queryID,
              eventName,
              eventType: 'conversion',
              eventSubtype: 'addToCart',
              objectIDs: eventData.items.map((item) => atob(item.item_uid)),
              objectData: eventData.items.map((item) => ({
                discount: { Float: item.discount ?? 0 },
                price: { Float: item.price },
                quantity: item.quantity,
                queryID: mapping[atob(item.item_uid)],
              })),
              currency: eventData.currency,
              value: { Float: eventData.value },
              ...common,
            },
          } satisfies AlgoliaEventsItems_Input,
        ]
      : [
          {
            Added_to_cart_object_IDs_Input: {
              eventName,
              eventType: 'conversion',
              eventSubtype: 'addToCart',
              objectIDs: eventData.items.map((item) => atob(item.item_uid)),
              objectData: eventData.items.map((item) => ({
                discount: { Float: item.discount ?? 0 },
                price: { Float: item.price },
                quantity: item.quantity,
              })),
              currency: eventData.currency,
              value: { Float: eventData.value },
              ...common,
            },
          } satisfies AlgoliaEventsItems_Input,
        ]
  },

  purchase: (eventName, eventData, common) => {
    const mapping = getAlgoliaIdToQuery()
    const isAfterSearch = !!eventData.items.find((item) => mapping[atob(item.item_uid)])
    clearAlgoliaIdToQuery()

    return isAfterSearch
      ? [
          {
            Purchased_object_IDs_after_search_Input: {
              eventName,
              eventType: 'conversion',
              eventSubtype: 'purchase',
              objectIDs: eventData.items.map((item) => atob(item.item_uid)),
              objectData: eventData.items.map((item) => ({
                discount: { Float: item.discount ?? 0 },
                price: { Float: item.price },
                quantity: item.quantity,
                queryID: mapping[atob(item.item_uid)],
              })),
              currency: eventData.currency,
              value: { Float: eventData.value },
              ...common,
            },
          } satisfies AlgoliaEventsItems_Input,
        ]
      : [
          {
            Purchased_object_IDs_Input: {
              eventName,
              eventType: 'conversion',
              eventSubtype: 'purchase',
              objectIDs: eventData.items.map((item) => atob(item.item_uid)),
              objectData: eventData.items.map((item) => ({
                discount: { Float: item.discount ?? 0 },
                price: { Float: item.price },
                quantity: item.quantity,
              })),
              currency: eventData.currency,
              value: { Float: eventData.value },
              ...common,
            },
          } satisfies AlgoliaEventsItems_Input,
        ]
  },

  // Todo: Implement the following events

  // ???
  // - Clicked_filters_Input
  // - Converted_filters_Input
  // - Viewed_filters_Input
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
