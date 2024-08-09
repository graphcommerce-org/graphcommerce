export default function prepareAddToCartEvent(eventData) {
  console.log('event', eventData)
  return {
    eventType: 'conversion',
    eventSubtype: 'addToCart',
    eventName: 'Products Added to Cart',
    index: '',
    objectIDs: ['item-1', 'item-10'],
    objectData: [
      {
        price: null,
        discount: null,
        quantity: null,
      },
      {
        price: null,
      },
    ],
    value: null,
    currency: '',
    userToken: 'anonymous-xxxxxx-xx-xxx-xxxxxx',
    authenticatedUserToken: 'user-xxxxxx-xx-xxx-xxxxxx',
    timestamp: 1673636676000,
  }
}
