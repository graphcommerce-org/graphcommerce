export type BackButtonProps = {
  title: string
  backFallbackHref: string
  backFallbackTitle: string
}

export type UiFC<T = Record<string, unknown>> = React.FC<BackButtonProps & T> & {
  holdBackground: boolean
}
