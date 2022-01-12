import { PageOptions } from '@graphcommerce/framer-next-pages'
import { iconChevronRight, LayoutHeader, SvgImageSimple, LayoutTitle } from '@graphcommerce/next-ui'
import { Button } from '@mui/material'
import Link from 'next/link'
import { LayoutFull, LayoutFullProps } from '../components/Layout/LayoutFull'
import PageLayout, { LayoutProps } from '../components/Layout/PageLayout'
import { sanitizeDirectoryTree } from '../components/SidebarMenu/sanitizeDirectoryTree'
import { getDirectoryTree } from '../util/files'

type PageProps = LayoutProps

function IndexPage(props: PageProps) {
  const { menuData } = props

  return (
    <>
      <LayoutHeader>
        <LayoutTitle size='small'>Documentation</LayoutTitle>
      </LayoutHeader>
      <PageLayout menuData={menuData}>
        <p>
          Setup your <i>Progressive Web App</i> (PWA) within 5 minutes using GraphCommerce.
        </p>
        <Link href='/read/1-1/getting-started/introduction' passHref>
          <Button
            color='secondary'
            variant='text'
            endIcon={<SvgImageSimple src={iconChevronRight} />}
          >
            Start developing now
          </Button>
        </Link>
      </PageLayout>
    </>
  )
}

const pageOptions: PageOptions<LayoutFullProps> = {
  Layout: LayoutFull,
}
IndexPage.pageOptions = pageOptions

export default IndexPage

export const getStaticProps = () => {
  const documentationTree = getDirectoryTree('content')

  return {
    props: {
      menuData: sanitizeDirectoryTree(documentationTree),
    },
  }
}
