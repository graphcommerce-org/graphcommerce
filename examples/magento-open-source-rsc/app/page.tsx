import { redirect } from 'next/navigation'

/**
 * Root page redirects to the default store Hardcoded redirect to avoid importing @graphcommerce
 * packages that use next/router
 */
export default function RootPage() {
  // Default to 'en' store - this should be replaced with config lookup
  // once the packages are updated for App Router compatibility
  redirect('/en')
}
