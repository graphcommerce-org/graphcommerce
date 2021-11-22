import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  Button,
  iconChevronRight,
  SheetShellBaseProps,
  SvgImageSimple,
  Title,
} from '@graphcommerce/next-ui'
import Link from 'next/link'
import React from 'react'
import FullPageShell from '../components/AppShell/FullPageShell'
import FullPageShellHeader from '../components/AppShell/FullPageShellHeader'
import Layout, { LayoutProps } from '../components/Layout'
import sanitizeDirectoryTree from '../components/SidebarMenu/sanitizeDirectoryTree'
import { getDirectoryTree } from '../util/files'

type PageProps = LayoutProps

function IndexPage(props: PageProps) {
  const { menuData } = props

  return (
    <>
      <FullPageShellHeader>
        <Title size='small'>Documentation</Title>
      </FullPageShellHeader>
      <Layout menuData={menuData}>
        <p>
          Setup your <i>Progressive Web App</i> (PWA) within 5 minutes using GraphCommerce.
        </p>
        <Link href='/read/1-getting-started/apollo-client-local-state' passHref>
          <Button
            color='secondary'
            variant='text'
            size='small'
            endIcon={<SvgImageSimple src={iconChevronRight} size='small' inverted />}
          >
            Start developing now
          </Button>
        </Link>
      </Layout>
    </>
  )
}

const pageOptions: PageOptions<SheetShellBaseProps> = {
  SharedComponent: FullPageShell,
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
