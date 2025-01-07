import { useRouter } from 'next/router'
import { PreviewModeDisabled } from './PreviewModeDisabled'
import { PreviewModeEnabled } from './PreviewModeEnabled'

function getPreviewUrl() {
  const url = new URL(window.location.href)
  url.pathname = '/api/preview'
  ;[...url.searchParams.entries()].forEach(([key]) => url.searchParams.delete(key))
  return url
}

export function PreviewMode() {
  const router = useRouter()

  return router.isPreview ? <PreviewModeEnabled /> : <PreviewModeDisabled />
}
