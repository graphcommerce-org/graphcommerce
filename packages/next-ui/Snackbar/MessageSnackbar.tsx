export type MessageSnackbarProps = {
  children?: React.ReactNode
}

export default function MessageSnackbar(props: MessageSnackbarProps) {
  const { children } = props

  return <>{children}</>
}
