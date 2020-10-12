import App from 'components/Page/App'
import { AppProps } from 'components/Page/types'
import PageLoadIndicator from 'components/PageLoadIndicator'
import ThemedProvider from 'components/Theme'

export default function ThemedApp(props: AppProps) {
  return (
    <ThemedProvider>
      <PageLoadIndicator />
      <App {...props} />
      <script src='https://polyfill.io/v3/polyfill.min.js?features=ResizeObserver' />
    </ThemedProvider>
  )
}
