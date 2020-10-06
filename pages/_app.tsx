import App from 'components/Page/App'
import { AppProps } from 'components/Page/types'
import ThemedProvider from 'components/Theme'

export default function ThemedApp(props: AppProps) {
  return (
    <ThemedProvider>
      <App {...props} />
      <script src='https://polyfill.io/v3/polyfill.min.js?features=ResizeObserver' />
    </ThemedProvider>
  )
}
