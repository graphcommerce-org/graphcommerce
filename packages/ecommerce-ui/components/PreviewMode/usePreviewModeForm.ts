import { PreviewData } from '@graphcommerce/graphql'
import { useFormContext } from '@graphcommerce/react-hook-form'

export function usePreviewModeForm() {
  return useFormContext<{ previewData: PreviewData }>()
}
