import { useEffect, useState } from 'react'
import { MessageSnackbar } from './MessageSnackbar'
import type { MessageSnackbarProps } from './MessageSnackbarImpl'

export type DismissibleSnackbarProps = MessageSnackbarProps & {
  id: string
  storageType?: 'localStorage' | 'sessionStorage'
}
export function DismissibleSnackbar(props: DismissibleSnackbarProps) {
  const { storageType = 'localStorage', id, onClose, ...rest } = props
  const messageId = `DismissibleSnackbar_${id}`
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(!globalThis[storageType]?.getItem(messageId))
  }, [messageId, storageType])

  return (
    <MessageSnackbar
      {...rest}
      open={open}
      onClose={() => {
        globalThis[storageType]?.setItem(messageId, `${Date.now()}`)
        onClose?.()
      }}
    />
  )
}
