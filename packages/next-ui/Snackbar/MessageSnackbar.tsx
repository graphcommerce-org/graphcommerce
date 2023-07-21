import dynamic from 'next/dynamic'
import { MessageSnackbarImplProps } from './MessageSnackbarImpl'

/** Always load the MessageSnackbar dynamically */
export const MessageSnackbarImplLoader = dynamic(() => import('./MessageSnackbarImpl'), {
  ssr: false,
})

export type MessageSnackbarProps = MessageSnackbarImplProps & {
  id?: string
  storageType?: 'localStorage' | 'sessionStorage'
}
export function MessageSnackbar(props: MessageSnackbarProps) {
  const { storageType, id, onClose, ...rest } = props
  const messageId = `MessageSnackBar_${id}`

  if (storageType && !id && process.env.NODE_ENV !== 'production') {
    console.error('MessageSnackbar with a storageType set must has an id.')
  }

  if (storageType && id && globalThis[storageType].getItem(messageId)) {
    return null
  }

  return (
    <MessageSnackbarImplLoader
      {...rest}
      onClose={() => {
        if (id && storageType) {
          globalThis[storageType].setItem(messageId, `${Date.now()}`)
        }
        onClose?.()
      }}
    />
  )
}
