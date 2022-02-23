import { PageOptions } from '@graphcommerce/framer-next-pages'
import { LayoutOverlay, LayoutOverlayProps } from '@graphcommerce/next-ui'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import SidebarMenu from '../../components/SidebarMenu'
import {
  FileNode,
  getDirectoryPaths,
  getDirectoryTree,
  getFileContents,
  urlToPath,
} from '../../lib/files'

type Props = { menuData: FileNode } & LayoutOverlayProps
type Param = { url: string[] }

export default function MenuPage(props: Props) {
  const { menuData } = props
  const url = (useRouter().query.url as Param['url'] | undefined)?.join('/') ?? ''

  return <SidebarMenu {...menuData} selected={`/${url}`} />
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  Layout: () => (
    <LayoutOverlay
      variantSm='bottom'
      variantMd='left'
      sizeMd='floating'
      sizeSm='floating'
      justifySm='start'
      justifyMd='start'
    />
  ),
  overlayGroup: 'menu',
}
MenuPage.pageOptions = pageOptions

export const getStaticPaths: GetStaticPaths<{ url: string[] }> = async () => {
  const paths = await getDirectoryPaths('content')

  return {
    fallback: 'blocking',
    paths: paths.map((p) => ({ params: { url: p.split('/') } })),
  }
}

export const getStaticProps: GetStaticProps<Props, Param> = async ({ params }) => {
  const url = params?.url ?? []
  const menuData = await getDirectoryTree('content')
  if (!menuData) return { notFound: true }

  const filePath = urlToPath(url, menuData)
  if (!filePath) return { notFound: true }

  const res = await getFileContents('content', filePath)

  if (res === false) return { notFound: true }

  return { props: { menuData } }
}
