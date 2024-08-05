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
          const errorMessage = (errors ?? []).map((e) => e.message).filter((m) => m !== 'OK')
          if (errorMessage.length > 0) {
            console.log(
              'There was a problem sending the Algolia event to the server X',
              errorMessage,
            )
          }

          const response = data?.algolia_pushEvents

          if (response?.__typename === 'AlgoliaEventsResponse') {
            if (response.status !== 200) {
              console.log(
                'There was a problem sending the Algolia event to the server Y',
                response.message,
              )
            }
          }
        })
        .catch((e) => {
          console.error('There was a problem sending the Algolia event to the server Z', e)
        })
    },
    500,
    { trailing: true },
  )

  return useEventCallback<typeof sendEvent>(async (eventN, eventD) => {
    const email = client.cache.readQuery({ query: CustomerDocument })?.customer?.email
    const authenticatedUserToken = email ? await getSHA256Hash(email) : undefined

    let userToken = cookie('_algolia_userToken')
    if (!userToken) {
      userToken = (Math.random() + 1).toString(36).substring(2)
      cookie('_algolia_userToken', userToken, { sameSite: true })
    }

    const common = { index, userToken, authenticatedUserToken }

    const dataLayerToAlgolia: {
      [K in keyof Partial<GoogleEventTypes>]: (
        eventName: K,
        eventData: GoogleEventTypes[K],
      ) => AlgoliaEventsItems_Input
    } = {
      select_item: (eventName, eventData) =>
        algoliaQuery.queryID
          ? {
              Clicked_object_IDs_after_search_Input: {
                eventName,
                eventType: 'click',
                objectIDs: eventData.items.map((item) => atob(item.item_uid)),
                positions: eventData.items.map((item) => item.index),
                queryID: algoliaQuery.queryID,
                ...common,
              },
            }
          : {
              Clicked_object_IDs_Input: {
                eventName,
                eventType: 'click',
                objectIDs: eventData.items.map((item) => atob(item.item_uid)),
                positions: eventData.items.map((item) => item.index),
                ...common,
              },
            },
      add_to_cart: (eventName, eventData): AlgoliaEventsItems_Input =>
        algoliaQuery.queryID
          ? ({
              Added_to_cart_object_IDs_after_search_Input: {
                eventName,
                eventType: 'conversion',
                eventSubtype: 'addToCart',
                objectIDs: eventData.items.map((item) => atob(item.item_uid)),
                queryID: algoliaQuery.queryID,
                ...common,
              },
            } satisfies AlgoliaEventsItems_Input)
          : ({
              Added_to_cart_object_IDs_Input: {
                eventName,
                eventType: 'conversion',
                eventSubtype: 'addToCart',
                objectIDs: eventData.items.map((item) => atob(item.item_uid)),
                ...common,
              },
            } satisfies AlgoliaEventsItems_Input),
      // Todo: Checking for queryID doesn't make sense here. On the checkout page, the queryID will always be empty.
      purchase: (eventName, eventData) =>
        algoliaQuery.queryID
          ? ({
              Purchased_object_IDs_after_search_Input: {
                eventName,
                eventType: 'conversion',
                eventSubtype: 'purchase',
                objectData: eventData.items.map((item) => ({
                  discount: { Float: item.discount ?? 0 },
                  price: { Float: item.price },
                  quantity: item.quantity,
                  queryID: algoliaQuery.queryID,
                })),
                objectIDs: eventData.items.map((item) => atob(item.item_uid)),
                value: { Float: eventData.value },
                currency: eventData.currency,
                ...common,
              },
            } satisfies AlgoliaEventsItems_Input)
          : ({
              Purchased_object_IDs_Input: {
                eventName,
                eventType: 'conversion',
                eventSubtype: 'purchase',
                objectData: eventData.items.map((item) => ({
                  discount: { Float: item.discount ?? 0 },
                  price: { Float: item.price },
                  quantity: item.quantity,
                  queryID: algoliaQuery.queryID,
                })),
                objectIDs: eventData.items.map((item) => atob(item.item_uid)),
                value: { Float: eventData.value },
                currency: eventData.currency,
                ...common,
              },
            } satisfies AlgoliaEventsItems_Input),

      // Todo: Implement the following events
      // - Converted_object_IDs_after_search_Input
      // - Converted_object_IDs_Input
      // - Clicked_filters_Input
      // - Converted_filters_Input
    }

    const eventMapping = dataLayerToAlgolia[eventN]

    if (!eventMapping) return

    const event = eventMapping?.(eventN, eventD)
    if (event) {
      eventsBuffer.current.push(event)
      submit()
    }
  })
}
