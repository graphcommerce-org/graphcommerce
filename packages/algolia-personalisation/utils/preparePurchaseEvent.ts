export default function preparePurchaseEvent(eventData) {
  console.log('eventData', eventData)
  return {
    eventType: 'conversion',
    eventSubtype: 'purchase',
    eventName: 'Products Purchased',
    index: 'prod_ecommerce_EN',
    objectIDs: ['item-1'],
    objectData: [
      {
        price: 15.0,
        discount: 5.0,
        quantity: 10,
      },
    ],
    value: 150.0,
    currency: 'EUR',
    userToken: 'anonymous-xxxxxx-xx-xxx-xxxxxx',
    authenticatedUserToken: 'user-xxxxxx-xx-xxx-xxxxxx',
    timestamp: 1673636676000,
  }
}
