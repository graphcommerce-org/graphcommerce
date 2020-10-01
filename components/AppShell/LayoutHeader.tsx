import { useTheme } from '@material-ui/core'
import PageLayout from 'components/Page/PageLayout'
import { PageLayoutFC, GetProps } from 'components/Page/types'
import overlay from 'components/PageTransition/overlay'
import Header from './Header'

const LayoutHeader: PageLayoutFC<GQLLayoutHeaderQuery> = ({ children, urlResolver, menu }) => {
  const theme = useTheme()
  return (
    <PageLayout urlResolver={urlResolver} themeColor={theme.palette.primary.main}>
      <Header menu={menu} urlResolver={urlResolver} />
      {children}
    </PageLayout>
  )
}

LayoutHeader.pageTransition = overlay

export type LayoutHeaderProps = GetProps<typeof LayoutHeader>

export default LayoutHeader
