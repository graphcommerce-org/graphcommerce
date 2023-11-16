import { MessageSnackbar } from './MessageSnackbar'
import { MessageSnackbarProps } from './MessageSnackbarImpl'

export type DismissibleSnackbarProps = MessageSnackbarProps & {
  id: string
  storageType?: 'localStorage' | 'sessionStorage'
}
export function DismissibleSnackbar(props: DismissibleSnackbarProps) {
  const { storageType = 'localStorage', id, onClose, ...rest } = props
  const messageId = `MessageSnackBar_${id}`

  if (storageType && !id && process.env.NODE_ENV !== 'production') {
    console.error('MessageSnackbar with a storageType set must has an id.')
  }

  if (storageType && id && globalThis[storageType]?.getItem(messageId)) {
    return null
  }

  return (
    <MessageSnackbar
      {...rest}
      onClose={() => {
        if (id && storageType) {
          globalThis[storageType]?.setItem(messageId, `${Date.now()}`)
        }
        onClose?.()
      }}
    />
  )
}
