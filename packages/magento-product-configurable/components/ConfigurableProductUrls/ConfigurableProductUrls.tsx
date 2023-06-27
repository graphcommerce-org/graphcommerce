import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useConfigurableOptionsSelection } from '../../hooks/useConfigurableOptionsSelection'

type ConfigurableProductUrlsProps = {
  url_key?: string
  index?: number
}

export function ConfigurableProductUrls(props: ConfigurableProductUrlsProps) {
  const { url_key, index = 0 } = props
  const router = useRouter()
  const { configured } = useConfigurableOptionsSelection({ url_key, index })

  useEffect(() => {
    const currentUrlPath = router.asPath.split('/')
    const currentUrlKey = currentUrlPath[currentUrlPath.length - 1]
    const simpleProductUrlKey = configured?.configurable_product_options_selection?.variant?.url_key

    if (simpleProductUrlKey && simpleProductUrlKey !== currentUrlKey) {
      router.replace(`/p/${simpleProductUrlKey}`, undefined, { scroll: false }).catch((error) => {
        // Handle the error here, if necessary
        console.error('Failed to replace URL:', error)
      })
    }
  }, [configured, router])
}
