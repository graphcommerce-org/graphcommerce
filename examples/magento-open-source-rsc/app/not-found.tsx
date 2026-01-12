import { redirect } from 'next/navigation'

/**
 * Root 404 page - redirects to the default store's 404 page. This handles the case where someone
 * navigates to a URL without a store prefix (e.g., /some-page instead of /en/some-page).
 *
 * For store-specific 404s (when notFound() is called within a page), see `[store]/not-found.tsx`.
 */
export default function NotFound() {
  // Redirect to the default store - the [store]/not-found.tsx will handle the actual 404 display
  redirect('/en')
}
