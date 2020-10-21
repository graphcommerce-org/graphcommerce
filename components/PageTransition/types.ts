type UiFCBaseProps = {
  title: string
  backFallbackHref?: string | null
  backFallbackTitle?: string | null
}
export type UiFC<T = Record<string, unknown>> = React.FC<UiFCBaseProps & T> & {
  holdBackground: boolean
}
