export type SearchContextProps = React.PropsWithChildren<{
  serverProps?: unknown
  // rendersInsideNextjs is needed, because of the InstantSearchSSRProvider data hydration inside the getStaticProps.
  rendersInsideNextjs?: boolean
}>

export function SearchContext(props: SearchContextProps) {
  const { children } = props
  return <>{children}</>
}
