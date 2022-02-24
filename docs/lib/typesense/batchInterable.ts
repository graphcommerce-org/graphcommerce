export async function* batchIterable<T>(iterable: AsyncIterableIterator<T>, batchSize: number) {
  let items: T[] = []
  for await (const item of iterable) {
    items.push(item)
    if (items.length >= batchSize) {
      yield items
      items = []
    }
  }
  if (items.length !== 0) {
    yield items
  }
}
