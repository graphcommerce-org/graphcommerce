declare module '*.yml' {
  const content: unknown
  export default content
}

declare module '*.po' {
  const messages: Record<
    string,
    string | Array<string | Array<string | (string | undefined) | Record<string, unknown>>>
  >

  export const messages
}
