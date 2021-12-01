import fs from 'fs'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import React from 'react'
import { LayoutFull, LayoutFullProps } from '../../components/Layout/LayoutFull'
import PageLayout, { LayoutProps } from '../../components/Layout/PageLayout'
import sanitizeDirectoryTree from '../../components/SidebarMenu/sanitizeDirectoryTree'
import { getAbsoluteFilePath, getDirectoryTree } from '../../util/files'

type PageProps = LayoutProps & { compiledMdxSource: MDXRemoteSerializeResult; title: string }

function ArticlePage(props: PageProps) {
  const { menuData, compiledMdxSource, title } = props

  return (
    <PageLayout menuData={menuData}>
      <MDXRemote {...compiledMdxSource} />
    </PageLayout>
  )
}

const pageOptions: PageOptions<LayoutFullProps> = {
  Layout: LayoutFull,
}
ArticlePage.pageOptions = pageOptions

export default ArticlePage

export const getStaticPaths = () =>
  // todo
  ({
    paths: [{ params: { url: ['/'] } }],
    fallback: 'blocking',
  })

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
  }
  return { notFound: true }
}
