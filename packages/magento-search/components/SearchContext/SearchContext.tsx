export type SearchContextProps = React.PropsWithChildren<{
  serverProps?: unknown
}>

export function SearchContext(props: SearchContextProps) {
  const { children } = props
  return <>{children}</>
}
