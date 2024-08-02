export default function prepareAddToCartEvent(eventData) {
  console.log('eventData', eventData)
  return {
    eventType: 'view',
    eventName: 'Items Viewed',
    index: '',
    objectIDs: ['item-1'],
    userToken: 'anonymous-xxxxxx-xx-xxx-xxxxxx',
    authenticatedUserToken: 'user-xxxxxx-xx-xxx-xxxxxx',
    timestamp: 1673636676000,
  }
}
