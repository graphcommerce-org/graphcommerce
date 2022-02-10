import { PageOptions } from '@graphcommerce/framer-next-pages'
import { iconChevronRight, LayoutHeader, SvgIcon, LayoutTitle } from '@graphcommerce/next-ui'
import { Button } from '@mui/material'
import { GetStaticPaths } from 'next'
import Link from 'next/link'
import { LayoutFull, LayoutFullProps } from '../components/Layout/LayoutFull'
import PageLayout, { LayoutProps } from '../components/Layout/PageLayout'
import { ContentTree, getDirectoryPaths, getDirectoryTree } from '../util/files'

type Props = LayoutProps

function IndexPage(props: Props) {
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
          <Button color='secondary' variant='text' endIcon={<SvgIcon src={iconChevronRight} />}>
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

export const getStaticPaths: GetStaticPaths<{ url: string[] }> = async () => {
  const paths = await getDirectoryPaths('content')

  return {
    fallback: 'blocking',
    paths: paths.map((p) => ({ params: { url: p.split('/') } })),
  }
}

export const getStaticProps = async () => {
  const menuData = await getDirectoryTree('content')

  return {
    props: { menuData },
  }
}
