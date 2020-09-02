import { useRouter } from 'next/router'
import { useState } from 'react'

/**
 * Allows to exit from the last know non section
 * example:
 * 1. with sectionUrl = '/account' and user is on '/products'
 * 2. toggleSection is called: user is navigated to '/account'
 * 3. navigates to `/account/login`
 * 4. toggleSection is called: user is navigated to `/products`
 */
export default function useNavigationSection(sectionUrl: string, fallback = '/') {
  const router = useRouter()
  const isInSection = router.pathname.startsWith(sectionUrl)
  const [[url, as], setHistoricPage] = useState<[string, string]>(
    isInSection ? [fallback, fallback] : [router.pathname, router.asPath],
  )

  if (!isInSection && (url !== router.pathname || as !== router.asPath)) {
    setHistoricPage([router.pathname, router.asPath])
  }

  const toggleSection = () => (isInSection ? router.push(url, as) : router.push(sectionUrl))

  return { isInSection, toggleSection }
}
