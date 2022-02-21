import { PageOptions } from '@graphcommerce/framer-next-pages'
import { PageMeta } from '@graphcommerce/next-ui'
import { Container, Divider, Typography } from '@mui/material'
import { GetStaticPaths, GetStaticProps } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Link from 'next/link'
import { useRouter } from 'next/router'
import rehypeHighlight from 'rehype-highlight'
import { SetRequired } from 'type-fest'
import { LayoutFull, LayoutFullProps } from '../components/Layout/LayoutFull'
import { LayoutProps } from '../components/Layout/PageLayout'
import {
  getDirectoryPaths,
  getDirectoryTree,
  getFileContents,
  MatterFields,
  urlToPath,
} from '../lib/files'

type MDXSource = SetRequired<MDXRemoteSerializeResult, 'frontmatter'>
type Props = LayoutProps & { source: MDXSource }
type Param = { url: string[] }
type GetStatic = GetStaticProps<Props, Param>

/**
 * Handle relative hrefs
 *
 * - If a link doesn't start with a slash OR it starts with './' it should replace the latest slug
 *   with the new path
 * - If a link starts with a slash it shouldn't be relative
 * - If a link starts with '../' it should move one segment up.
 * - If a link starts with '../../' it should move two segments up, so this should be recursive
 */
function relativeUrl(href: string[], currentHref: string[]): string[] {
  if (href[0].startsWith('http') || href[0].startsWith('/')) return href

  if (href[0] === 'readme') return relativeUrl(['', ...href.slice(1)], currentHref)

  if (href[0] === '..') {
    return relativeUrl(href.slice(1), currentHref.slice(0, -1))
  }

  if (href[0] === '.') {
    return ['', ...currentHref.slice(0, -1), ...href.slice(1)]
  }

  return relativeUrl(['.', ...href], currentHref)
}

function RelativeLink(props: JSX.IntrinsicElements['a']) {
  const asPath = useRouter().asPath?.split('?')[0]
  const { href = '', children, ...otherProps } = props

  let newUrl = href.replace('.mdx', '')
  newUrl = newUrl.replace('.md', '')

  newUrl = relativeUrl(newUrl.split('/'), asPath.split('/').slice(1)).join('/')

  if (newUrl.startsWith('/packages') || newUrl.startsWith('/examples')) {
    newUrl = `https://github.com/ho-nl/m2-pwa/tree/master${newUrl}`
  }

  const isExternal = newUrl.startsWith('http')

  if (!newUrl.startsWith('/') && !isExternal) newUrl = `/${newUrl}`
  if (newUrl.endsWith('/')) newUrl = newUrl.slice(0, -1)

  return (
    <Link href={newUrl}>
      <a {...otherProps} target={isExternal ? '_blank' : undefined}>
        {children}
      </a>
    </Link>
  )
}

const mdxComponents: React.ComponentProps<typeof MDXRemote>['components'] = {
  h1: ({ ref, ...props }) => (
    <Typography component='h1' variant='h2' {...props} sx={{ mb: '1em' }} />
  ),
  h2: ({ ref, ...props }) => (
    <Typography component='h2' variant='h3' {...props} sx={{ mt: '1em', mb: '0.5em' }} />
  ),
  h3: ({ ref, ...props }) => (
    <Typography component='h3' variant='h4' {...props} sx={{ mt: '1em', mb: '0.5em' }} />
  ),
  h4: ({ ref, ...props }) => <Typography component='h4' variant='h5' {...props} sx={{}} />,
  h5: ({ ref, ...props }) => <Typography component='h5' variant='h6' {...props} sx={{}} />,
  h6: ({ ref, ...props }) => <Typography component='h6' variant='subtitle1' {...props} sx={{}} />,
  p: ({ ref, ...props }) => (
    <Typography variant='body1' {...props} sx={{ mt: '1em', mb: '0.5em' }} />
  ),
  // img: ({ ref, src, ...props }) => {
  //   if (!src) return null
  //   return <Image layout={!props.width ? 'intrinsic' : 'responsive'} src={src} {...props} />
  // },
  hr: ({ ref, ...props }) => (
    <Divider {...props} variant='middle' sx={(theme) => ({ my: theme.spacings.md })} />
  ),
  a: RelativeLink,
}

function IndexPage(props: Props) {
  const { source } = props
  const { metaTitle, menu, metaDescription } = source.frontmatter as MatterFields
  const prettyRoute = useRouter()
    .asPath.split('?')[0]
    .split('/')
    .map((v) => v.replace(/-/g, ' ').replace(/^./, (x) => x.toUpperCase()))
    .reverse()
    .filter(Boolean)

  return (
    <>
      <PageMeta
        title={metaTitle ?? menu ?? prettyRoute.join(' - ')}
        metaDescription={metaDescription}
      />
      <Container
        maxWidth='md'
        sx={{
          '& figure': {
            display: 'block',
            margin: '0 auto',
            maxWidth: '100%',
          },
          '& img': {
            display: 'block',
            margin: '0 auto',
            maxWidth: '100%',
          },
          '& figure > figcaption': {
            textAlign: 'center',
            textTransform: 'uppercase',
            fontSize: '0.75em',
            fontWeight: 'bold',
            letterSpacing: '0.1em',
            color: '#828282',
            marginTop: '0.5em',
          },
          '& figure > p': { display: 'none' },
        }}
      >
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
    mdxOptions: { format: 'detect', rehypePlugins: [() => rehypeHighlight({})] },
    parseFrontmatter: true,
  })) as MDXSource

  return { props: { menuData, source } }
}
