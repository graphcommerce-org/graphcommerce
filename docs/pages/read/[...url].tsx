import fs from 'fs'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { Link } from '@material-ui/core'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { LayoutFull, LayoutFullProps } from '../../components/Layout/LayoutFull'
import PageLayout, { LayoutProps } from '../../components/Layout/PageLayout'
import MDXWrapper from '../../components/MDXWrapper'
import NextPrevButtons from '../../components/NextPrevButtons'
import { sanitizeDirectoryTree } from '../../components/SidebarMenu/sanitizeDirectoryTree'
import { getAbsoluteFilePath, getDirectoryTree } from '../../util/files'

type PageProps = LayoutProps & { compiledMdxSource: MDXRemoteSerializeResult }

const components = {
  a: Link,
  pre: ({ children }) => (
    <SyntaxHighlighter language={children.props.className?.split('-')[1] ?? 'tsx'}>
      {children.props.children}
    </SyntaxHighlighter>
  ),
}

function ArticlePage(props: PageProps) {
  const { menuData, compiledMdxSource } = props

  return (
    <PageLayout menuData={menuData}>
      <MDXWrapper>
        <MDXRemote {...compiledMdxSource} components={components} />
      </MDXWrapper>
      <NextPrevButtons menuData={menuData} />
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
    paths: [{ params: { url: ['/1-1/getting-started/intro'] } }],
    fallback: 'blocking',
  })

export const getStaticProps = async ({ params }) => {
  const { url } = params
  const documentationTree = getDirectoryTree('content')

  if (url.length !== 3) return { notFound: true }

  const [chapter, paragraph] = url[0].split('-')
  const sectionDir = `${chapter}-${url[1]}`
  const articleName = `${paragraph}-${url[2]}`

  const mdxPath = getAbsoluteFilePath(`content/${sectionDir}/${articleName}.mdx`)

  if (fs.existsSync(mdxPath)) {
    return {
      props: {
        menuData: sanitizeDirectoryTree(documentationTree),
        compiledMdxSource: await serialize(fs.readFileSync(mdxPath).toString()),
      },
    }
  }
  return { notFound: true }
}
