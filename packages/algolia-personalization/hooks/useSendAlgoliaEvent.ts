import { useAlgoliaIndexName, useAlgoliaQuery } from '@graphcommerce/algolia-mesh'
import { useEventCallback } from '@mui/material'
import { SelectItem, SendEvent, ViewItem, ViewItemList } from '@graphcommerce/google-datalayer'
import { useApolloClient } from '@graphcommerce/graphql'
import { CustomerDocument } from '@graphcommerce/magento-customer/hooks/Customer.gql'
import { cookie } from '@graphcommerce/next-ui'
import {
  AlgoliaSendEventDocument,
  AlgoliaSendEventMutationVariables,
} from '../mutations/AlgoliaSendEvent.gql'

const getSHA256Hash = async (input: string) => {
  const textAsBuffer = new TextEncoder().encode(input)
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', textAsBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hash = hashArray.map((item) => item.toString(16).padStart(2, '0')).join('')
  return hash
}

type EventInput = NonNullable<AlgoliaSendEventMutationVariables['events'][number]>

export function useSendAlgoliaEvent() {
  const client = useApolloClient()
  const index = useAlgoliaIndexName()
  const algoliaQuery = useAlgoliaQuery()

  return useEventCallback<SendEvent>(async (eventN, eventD) => {
    const email = client.cache.readQuery({ query: CustomerDocument })?.customer?.email
    const authenticatedUserToken = email ? await getSHA256Hash(email) : undefined

    let userToken = cookie('_algolia_userToken')
    if (!userToken) {
      userToken = (Math.random() + 1).toString(36).substring(2)
      cookie('_algolia_userToken', userToken, { sameSite: true })
    }

    const common = { index, userToken, authenticatedUserToken }

    const dataLayerToAlgolia: Record<
      string,
      ((eventName: string, eventData: any) => EventInput) | undefined
    > = {
      select_item: (eventName: string, eventData: SelectItem) =>
        algoliaQuery.queryID
          ? {
              Clicked_object_IDs_after_search_Input: {
                eventName,
                eventType: 'click',
                objectIDs: eventData.items?.map((item) => atob(item.item_uid)),
                positions: [],
                queryID: algoliaQuery.queryID,
                ...common,
              },
            }
          : {
              Clicked_object_IDs_Input: {
                eventName,
                eventType: 'click',
                objectIDs: eventData.items?.map((item) => atob(item.item_uid)),
                positions: [],
                ...common,
              },
            },
      // view_item_list: (eventName: string, eventData: ViewItemList) => ({
      //   Viewed_object_IDs_Input: {
      //     eventName,
      //     eventType: 'view',
      //     objectIDs: eventData.items?.map((item) => atob(item.item_uid)),
      //     ...common,
      //   },
      // }),
      // view_item: (eventName: string, eventData: ViewItem) => ({
      //   Viewed_object_IDs_Input: {
      //     eventName,
      //     eventType: 'view',
      //     objectIDs: eventData.items?.map((item) => atob(item.item_uid)),
      //     ...common,
      //   },
      // }),
    }

    const eventMapping = dataLayerToAlgolia[eventN]

    if (!eventMapping) return

    const events = eventMapping?.(eventN, eventD)
    if (!events) return

    client
      .mutate({
        mutation: AlgoliaSendEventDocument,
        variables: {
          events,
        },
      })
      .then(({ data, errors }) => {
        const errorMessage = (errors ?? []).map((e) => e.message).filter((m) => m !== 'OK')
        if (errorMessage.length > 0) {
          console.log('There was a problem sending the Algolia event to the server X', errorMessage)
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
  })
}
