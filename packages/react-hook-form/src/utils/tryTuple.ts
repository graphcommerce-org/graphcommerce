export const tryAsync =
  <R, Args extends unknown[]>(
    fn: (...args: Args) => Promise<R> | R,
  ): ((...args: Args) => Promise<[R, undefined] | [undefined, Error]>) =>
  async (...args: Args) => {
    try {
      return [await fn(...args), undefined]
    } catch (e) {
      console.error(e)
      return [undefined, e as Error]
    }
  }

export const trySync =
  <R, Args extends unknown[]>(
    fn: (...args: Args) => R,
  ): ((...args: Args) => [R, undefined] | [undefined, Error]) =>
  (...args: Args) => {
    try {
      return [fn(...args), undefined]
    } catch (e) {
      console.error(e)
      return [undefined, e as Error]
    }
  }
