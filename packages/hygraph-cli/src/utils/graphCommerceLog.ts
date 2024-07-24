export const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()

export const graphcommerceLog = (message: string, type?: 'info' | 'warning' | 'error') => {
  const color = {
    error: '\x1b[31m\x1b[1m%s\x1b[0m',
    warning: '\x1b[33m\x1b[1m%s\x1b[0m',
    info: '\x1b[36m\x1b[1m%s\x1b[0m',
  }
  // eslint-disable-next-line no-console
  console.log(type ? color[type] : '', `${message}`)
}
