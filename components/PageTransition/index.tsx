import { BasePageLayoutComponentProps, PageLayoutFC } from 'components/Page/types'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import useHistoryState from './useHistoryState'

type PageTransitionFC = React.FC<{ Layout: PageLayoutFC } & BasePageLayoutComponentProps>

const PageTransition: PageTransitionFC = ({ children, Layout, ...pageLayoutProps }) => {
  const router = useRouter()
  useHistoryState()

  return (
    <AnimateSharedLayout type='switch'>
      <AnimatePresence initial={false}>
        {Layout ? (
          <Layout key={router.asPath} {...pageLayoutProps}>
            {children}
          </Layout>
        ) : (
          <Fragment key={router.asPath}>{children}</Fragment>
        )}
      </AnimatePresence>
    </AnimateSharedLayout>
  )
}

export default PageTransition
