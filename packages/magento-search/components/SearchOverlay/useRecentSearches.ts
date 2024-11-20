import { useEffect, useState } from 'react'

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  useEffect(() => {
    const storedSearches: string[] = JSON.parse(localStorage.getItem('recentSearches') || '[]')
    setRecentSearches(storedSearches)
  }, [])

  return {
    recentSearches,
    updateRecentSearches: (searchTerm: string) => {
      if (searchTerm?.length <= 3) {
        return
      }
      const formattedSearchTerm = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)
      const updatedSearches = new Set([formattedSearchTerm, ...recentSearches].slice(0, 5))
      const newSearches = Array.from(updatedSearches)
      localStorage.setItem('recentSearches', JSON.stringify(newSearches))
    },
  }
}
