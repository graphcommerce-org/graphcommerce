import { Button, MessageSnackbar } from '@graphcommerce/next-ui'
import { useRouter } from 'next/router'

export function DraftMode() {
  const router = useRouter()

  return (
    <MessageSnackbar
      variant='pill'
      severity='warning'
      open={router.isPreview}
      disableBackdropClick
      disableClose
      action={
        <>
          <Button
            color='secondary'
            onClick={() => {
              window.location.href = '/api/preview?revalidate=1'
            }}
          >
            Revalidate Page
          </Button>
          <Button
            color='secondary'
            onClick={() => {
              window.location.href = '/api/preview'
            }}
          >
            Exit Draft Mode
          </Button>
        </>
      }
    >
      <div>Draft Mode</div>
    </MessageSnackbar>
  )
}
