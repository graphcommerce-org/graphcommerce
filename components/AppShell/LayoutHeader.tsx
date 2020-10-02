import { useTheme } from '@material-ui/core'
import PageLayout from 'components/Page/PageLayout'
import { PageLayoutFC, GetProps } from 'components/Page/types'
import usePhaseMode from 'components/PageTransition/usePhaseMode'
import { m as motion, usePresence } from 'framer-motion'
import { useEffect } from 'react'
import Header from './Header'

const LayoutHeader: PageLayoutFC<GQLLayoutHeaderQuery> = ({ children, urlResolver, menu }) => {
  const theme = useTheme()
  const [, safeToRemove] = usePresence()
  const { mode } = usePhaseMode()

  useEffect(() => {
    if (safeToRemove && mode === 'shallow') safeToRemove()
  }, [mode, safeToRemove])

  return (
    <PageLayout urlResolver={urlResolver} themeColor={theme.palette.primary.main}>
      <motion.div
        {...(mode === 'deep' && {
          initial: { opacity: 1 },
          animate: { opacity: 1, transition: { duration: 0 } },
          exit: { opacity: 1, transition: { duration: 0 } },
        })}
        {...(mode === 'shallow' && {
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { duration: 0 } },
          exit: { opacity: 0, transition: { duration: 0 } },
        })}
      >
        <Header menu={menu} urlResolver={urlResolver} />
      </motion.div>
      {children}
    </PageLayout>
  )
}

export type LayoutHeaderProps = GetProps<typeof LayoutHeader>

export default LayoutHeader
