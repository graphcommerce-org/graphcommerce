export type SearchContextProps = React.PropsWithChildren<{
  serverProps?: unknown
  isNext?: boolean
}>

export function SearchContext(props: SearchContextProps) {
  const { children } = props
  return <>{children}</>
}
