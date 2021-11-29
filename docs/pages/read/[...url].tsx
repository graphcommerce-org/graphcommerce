import fs from 'fs'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { SheetProps } from '@graphcommerce/next-ui'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import React from 'react'
import FullPageShell from '../../components/AppShell/FullPageShell'
import Layout, { LayoutProps } from '../../components/Layout'
import sanitizeDirectoryTree from '../../components/SidebarMenu/sanitizeDirectoryTree'
import { getAbsoluteFilePath, getDirectoryTree } from '../../util/files'

type PageProps = LayoutProps & { compiledMdxSource: MDXRemoteSerializeResult; title: string }

function ArticlePage(props: PageProps) {
  const { menuData, compiledMdxSource, title } = props

  return (
    <Layout menuData={menuData}>
      <MDXRemote {...compiledMdxSource} />
    </Layout>
  )
}

const pageOptions: PageOptions<SheetProps> = {
  Layout: FullPageShell,
}
ArticlePage.pageOptions = pageOptions

export default ArticlePage

export const getStaticPaths = () => {
  // todo
  return {
    paths: [{ params: { url: ['/'] } }],
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({ params }) => {
  const { url } = params
  const documentationTree = getDirectoryTree('content')

  if (url.length !== 2) return { notFound: true }

  const sectionDir = url[0]
  const articleName = url[1]
  const mdxPath = getAbsoluteFilePath(`content/${sectionDir}/${articleName}.mdx`)

  if (fs.existsSync(mdxPath)) {
    return {
      props: {
        menuData: sanitizeDirectoryTree(documentationTree),
        compiledMdxSource: await serialize(fs.readFileSync(mdxPath).toString()),
        title: url[1],
      },
    }
  } else {
    return { notFound: true }
  }
}
