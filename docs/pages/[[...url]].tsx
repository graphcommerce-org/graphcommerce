import { PageOptions } from '@graphcommerce/framer-next-pages'
import { Image } from '@graphcommerce/image'
import { LayoutTitle, PageMeta } from '@graphcommerce/next-ui'
import { Container, Divider, Typography } from '@mui/material'
import { GetStaticPaths, GetStaticProps } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Link from 'next/link'
import { SetRequired } from 'type-fest'
import { LayoutFull, LayoutFullProps } from '../components/Layout/LayoutFull'
import { LayoutProps } from '../components/Layout/PageLayout'
import { getDirectoryPaths, getDirectoryTree, getFileContents, urlToPath } from '../lib/files'

type MDXSource = SetRequired<MDXRemoteSerializeResult, 'frontmatter'>
type Props = LayoutProps & { source: MDXSource }
type Param = { url: string[] }
type GetStatic = GetStaticProps<Props, Param>

const mdxComponents: React.ComponentProps<typeof MDXRemote>['components'] = {
  h1: ({ ref, children, ...props }) => <LayoutTitle variant='h2'>{children}</LayoutTitle>,
  h2: ({ ref, ...props }) => (
    <Typography component='h2' variant='h3' {...props} sx={{ mt: '1em', mb: '0.5em' }} />
  ),
  h3: ({ ref, ...props }) => (
    <Typography component='h3' variant='h4' {...props} sx={{ mt: '1em', mb: '0.5em' }} />
  ),
  h4: ({ ref, ...props }) => <Typography component='h4' variant='h5' {...props} sx={{}} />,
  h5: ({ ref, ...props }) => <Typography component='h5' variant='h6' {...props} sx={{}} />,
  h6: ({ ref, ...props }) => <Typography component='h6' variant='subtitle1' {...props} sx={{}} />,
  p: ({ ref, ...props }) => <Typography variant='body1' {...props} sx={{}} />,
  // img: ({ ref, src, ...props }) => {
  //   if (!src) return null
  //   return <Image layout={!props.width ? 'intrinsic' : 'responsive'} src={src} {...props} />
  // },
  hr: ({ ref, ...props }) => (
    <Divider {...props} variant='middle' sx={(theme) => ({ my: theme.spacings.md })} />
  ),
  a: ({ href, children, ...otherProps }) => (
    <Link href={href ?? ''}>
      <a {...otherProps}>{children}</a>
    </Link>
  ),
}

function IndexPage(props: Props) {
  const { source } = props
  const { title = '', metaDescription } = source.frontmatter

  return (
    <>
      <PageMeta title={title} metaDescription={metaDescription} />
      <Container maxWidth='md'>
        <MDXRemote {...source} components={mdxComponents} />
      </Container>
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

export const getStaticProps: GetStatic = async ({ params }) => {
  const url = params?.url ?? []
  const menuData = await getDirectoryTree('content')
  if (!menuData) return { notFound: true }

  const filePath = urlToPath(url, menuData)
  if (!filePath) return { notFound: true }

  const res = await getFileContents('content', filePath)

  if (res === false) return { notFound: true }

  // todo: https://github.com/rehypejs/rehype/blob/main/doc/plugins.md#list-of-plugins
  // todo: https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins
  const source = (await serialize(res, {
    mdxOptions: { format: 'detect' },
    parseFrontmatter: true,
  })) as MDXSource

  return { props: { menuData, source } }
}
