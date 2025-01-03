import { useMotionSelector } from '@graphcommerce/framer-utils'
import { SearchFab } from '@graphcommerce/magento-search/components/SearchFab/SearchFab.interceptor'
import { motionValue } from 'framer-motion'
import dynamic from 'next/dynamic'
import type { SearchOverlayProps } from './SearchOverlay'
import { searchOverlayIsOpen } from './SearchOverlayProvider'

export const searchOverlayLoading = motionValue(false)

const loaded = motionValue(false)

const SearchOverlayDynamic = dynamic(
  async () => {
    searchOverlayLoading.set(true)
    const { SearchOverlay } = await import('./SearchOverlay')
    searchOverlayLoading.set(false)
    loaded.set(true)
    return SearchOverlay
  },
  { ssr: false },
)

export function SearchOverlayLoader(props: SearchOverlayProps) {
  const openOrLoaded = useMotionSelector([loaded, searchOverlayIsOpen], (v) => v[0] || v[1])
  if (!openOrLoaded) return null
  return <SearchOverlayDynamic {...props} />
}
