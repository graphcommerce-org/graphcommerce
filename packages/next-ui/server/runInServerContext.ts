export function runInServerContext(
  storefront: string,
  cb: (...args: any[]) => any,
  ...args: any[]
) {
  return cb(...args)
}
