export function isProtectedCartOperation(name: string): boolean {
  /* Todo: Determine what operations should be added here */
  const mutations = ['AddProductsToCart', 'CreateEmptyCart']
  return mutations.includes(name)
}
