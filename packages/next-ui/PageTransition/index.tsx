import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import { useRouter } from 'next/router'
import { Fragment, PropsWithChildren } from 'react'
import useHistoryState from './useHistoryState'

const PageTransition = ({ children }: PropsWithChildren<unknown>) => {
  const router = useRouter()
  useHistoryState()

  return (
    <AnimateSharedLayout type='switch'>
      <AnimatePresence initial={false}>
        <Fragment key={router.asPath}>{children}</Fragment>
      </AnimatePresence>
    </AnimateSharedLayout>
  )
}

export default PageTransition
