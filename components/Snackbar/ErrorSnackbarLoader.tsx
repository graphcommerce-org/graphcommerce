import dynamic from 'next/dynamic'

// We provide a loader for the ErrorSnackbar because it will only be required after an action of the user.
const ErrorSnackbarLoader = dynamic({ loader: import('./ErrorSnackbar'), ssr: false })
export default ErrorSnackbarLoader
