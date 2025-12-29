declare module '*.po' {
  export const messages: Record<
    string,
    string | Array<string | Array<string | (string | undefined) | Record<string, unknown>>>
  >
}
