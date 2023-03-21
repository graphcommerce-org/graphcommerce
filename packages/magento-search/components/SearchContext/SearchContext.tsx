export type SearchContextProps = React.PropsWithChildren

export function SearchContext(props: SearchContextProps) {
  const { children } = props
  return <>{children}</>
}
