import dynamic from 'next/dynamic'

/** Always load the MessageSnackbar dynamically */
const MessageSnackbar = dynamic(() => import('./MessageSnackbarImpl'), { ssr: false })
export default MessageSnackbar
