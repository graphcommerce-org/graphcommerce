import { PreviewData } from '@graphcommerce/graphql'
import { useFormContext } from '@graphcommerce/react-hook-form'

export function useDraftModeForm() {
  return useFormContext<{ previewData: PreviewData }>()
}
