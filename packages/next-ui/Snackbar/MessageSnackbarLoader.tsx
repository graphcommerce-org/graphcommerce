import dynamic from 'next/dynamic'

// We provide a loader for the MessageSnackbar because it will only be required after an action of the user.
const MessageSnackbarLoader = dynamic({ loader: import('./MessageSnackbar'), ssr: false })
export default MessageSnackbarLoader
