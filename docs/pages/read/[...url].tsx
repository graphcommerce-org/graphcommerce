import { PageOptions } from '@graphcommerce/framer-next-pages'
import { SheetShellBaseProps } from '@graphcommerce/next-ui'
import { Link } from '@material-ui/core'
import fs from 'fs'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import React from 'react'
import FullPageShell from '../../components/AppShell/FullPageShell'
import Layout, { LayoutProps } from '../../components/Layout'
import MDXWrapper from '../../components/MDXWrapper'
import { sanitizeDirectoryTree } from '../../components/SidebarMenu/sanitizeDirectoryTree'
import { getAbsoluteFilePath, getDirectoryTree } from '../../util/files'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

type PageProps = LayoutProps & { compiledMdxSource: any; title: string }

function ArticlePage(props: PageProps) {
  const { menuData, compiledMdxSource } = props

  const components = {
    a: Link,
    pre: ({ children }) => {
      return (
        <SyntaxHighlighter language={children.props.className?.split('-')[1] ?? 'tsx'}>
          {children.props.children}
        </SyntaxHighlighter>
      )
    },
  }

  return (
    <Layout menuData={menuData}>
      <MDXWrapper>
        <MDXRemote {...compiledMdxSource} components={components} />
      </MDXWrapper>
    </Layout>
  )
}

const pageOptions: PageOptions<SheetShellBaseProps> = {
  SharedComponent: FullPageShell,
}
ArticlePage.pageOptions = pageOptions

export default ArticlePage

export const getStaticPaths = () => {
  // todo
  return {
    paths: [{ params: { url: ['/1-1/getting-started/intro'] } }],
    fallback: 'blocking',
  }
}

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
  } else {
    return { notFound: true }
  }
}
