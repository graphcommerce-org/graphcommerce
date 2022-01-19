import dynamic from 'next/dynamic'

/** Always load the MessageSnackbar dynamically */
export const MessageSnackbar = dynamic(() => import('./MessageSnackbarImpl'), { ssr: false })
