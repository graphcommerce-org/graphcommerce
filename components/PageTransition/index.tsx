import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import useHistoryState from './useHistoryState'

const PageTransition: React.FC = ({ children }) => {
  const router = useRouter()
  useHistoryState()

  return (
    <AnimatePresence initial={false}>
      <Fragment key={router.asPath}>{children}</Fragment>
    </AnimatePresence>
  )
}

export default PageTransition
