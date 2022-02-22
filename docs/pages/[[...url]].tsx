import { PageOptions } from '@graphcommerce/framer-next-pages'
import { PageMeta } from '@graphcommerce/next-ui'
import {
  Container,
  Divider,
  Typography,
  Link,
  alpha,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableContainer,
  Paper,
  Box,
} from '@mui/material'
import { GetStaticPaths, GetStaticProps } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { SetRequired } from 'type-fest'
import { LayoutFull, LayoutFullProps } from '../components/Layout/LayoutFull'
import {
  getDirectoryPaths,
  getDirectoryTree,
  getFileContents,
  MatterFields,
  urlToPath,
} from '../lib/files'

type MDXSource = SetRequired<MDXRemoteSerializeResult, 'frontmatter'>
type Props = { source: MDXSource }
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

  if (href[0].startsWith('#')) return [...currentHref, href[0]]

  if (href[0] === 'readme') return relativeUrl(['', ...href.slice(1)], currentHref)

  if (href[0] === '..') {
    return relativeUrl(href.slice(1), currentHref.slice(0, -1))
  }

  if (href[0] === '.') {
    return ['', ...currentHref.slice(0, -1), ...href.slice(1)]
  }

  return relativeUrl(['.', ...href], currentHref)
}

function RelativeLink(props: Omit<JSX.IntrinsicElements['a'], 'ref'>) {
  const asPath = useRouter().asPath?.split('?')[0].split('#')[0]
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
    <PageLink href={newUrl} passHref>
      <Link {...otherProps} target={isExternal ? '_blank' : undefined}>
        {children}
      </Link>
    </PageLink>
  )
}

const mdxComponents: React.ComponentProps<typeof MDXRemote>['components'] = {
  h1: ({ ref, ...props }) => (
    <Typography
      component='h1'
      variant='h2'
      {...props}
      sx={{ mt: '2em', mb: '1em', '&:first-of-type': { mt: '1em' } }}
    />
  ),
  h2: ({ ref, ...props }) => (
    <Typography component='h2' variant='h3' {...props} sx={{ mt: '2em', mb: '0.5em' }} />
  ),
  h3: ({ ref, ...props }) => (
    <Typography component='h3' variant='h4' {...props} sx={{ mt: '2em', mb: '0.5em' }} />
  ),
  h4: ({ ref, ...props }) => <Typography component='h4' variant='h5' {...props} sx={{}} />,
  h5: ({ ref, ...props }) => <Typography component='h5' variant='h6' {...props} sx={{}} />,
  h6: ({ ref, ...props }) => <Typography component='h6' variant='subtitle1' {...props} sx={{}} />,
  p: ({ ref, ...props }) => (
    <Typography variant='body1' {...props} sx={{ mt: '0.5em', mb: '1em' }} />
  ),
  // img: ({ ref, src, ...props }) => {
  //   if (!src) return null
  //   return <Image layout={!props.width ? 'intrinsic' : 'responsive'} src={src} {...props} />
  // },
  hr: ({ ref, ...props }) => (
    <Divider {...props} variant='middle' sx={(theme) => ({ my: theme.spacings.md })} />
  ),
  blockquote: ({ ref, ...props }) => (
    <Typography
      variant='body1'
      component='blockquote'
      {...props}
      sx={[
        (theme) => ({
          display: 'inline-block',
          mt: '1em',
          mb: '0.5em',
          fontStyle: 'italic',
          pl: '1em',
          pr: '1em',
          pt: '0.5em',
          borderRadius: 2,
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          border: `1px solid ${theme.palette.primary.main}`,
          boxShadow: 4,
        }),
      ]}
    />
  ),
  pre: ({ ref, ...props }) => (
    <Box
      component='pre'
      {...props}
      sx={{
        fontFamily: `Menlo, Monaco, Consolas, 'Andale Mono', 'Ubuntu Mono', 'Courier New', monospace`,
        borderRadius: 1.5,

        "&:not([class*='language-'])": {
          backgroundColor: (theme) => [alpha(theme.palette.text.primary, 0.08), '!important'],
          p: '1em',
        },
        "&[class*='language-']": {
          backgroundImage: 'linear-gradient(to top, #003c6780, #00264180 )',
        },
      }}
    />
  ),
  code: ({ ref, ...props }) => (
    <Box
      component='code'
      {...props}
      sx={{
        fontSize: '0.85em',
        "&:not([class*='language-'])": {
          fontFamily: `Menlo, Monaco, Consolas, 'Andale Mono', 'Ubuntu Mono', 'Courier New', monospace`,
          borderRadius: 1.5,
          pt: 0.1,
          pb: 0.3,
          px: 0.7,
          backgroundColor: (theme) => [alpha(theme.palette.text.primary, 0.08), '!important'],
        },
      }}
    />
  ),
  a: RelativeLink,
  table: ({ ref, ...props }) => (
    <TableContainer component={Paper} elevation={4} sx={{ mb: 5 }}>
      <Table {...props} size='small' aria-label='a dense table' />
    </TableContainer>
  ),
  thead: ({ ref, ...props }) => <TableHead {...props} />,
  tbody: ({ ref, ...props }) => <TableBody {...props} />,
  tr: ({ ref, ...props }) => <TableRow {...props} />,
  th: ({ ref, align, ...props }) => <TableCell {...props} />,
  td: ({ ref, align, ...props }) => <TableCell {...props} />,
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
          position: 'relative',
          '& figure': {
            display: 'block',
            margin: '0 auto',
            maxWidth: '100%',
            mb: 8,
            mt: 8,
            aspectRatio: '16 / 9',
            width: '100%',
          },
          '& img, & video': {
            display: 'block',
            margin: '0 auto',
            maxWidth: '100%',
            boxShadow: '0 0px 40px 0 rgba(0,0,0,0.15)',
          },
          '& pre': {
            borderRadius: 2,
            mt: '1em !important',
            mb: '1em !important',
          },
          '& figure > figcaption': {
            paddingLeft: '1em',
            marginTop: '1em',
            typography: 'caption',
            color: 'text.secondary',
          },
          '& hr': {
            m: 0,
            mt: 5,
            mb: 5,
          },
          '& figure > p': { display: 'none' },

          '& .icon.icon-link': {
            background: 'url(/link.svg) no-repeat',
            backgroundSize: 'contain',
            display: 'inline-block',
            verticalAlign: 'middle',
            fontSize: '0.8em',
            mr: '0.2em',
            width: '1.1em',
            height: '1.2em',
            ml: `calc(-0.2em - 1.2em)`,
            opacity: 0.0,
          },
          '& h1:hover .icon.icon-link, & h2:hover .icon.icon-link, & h3:hover .icon.icon-link, & h4:hover .icon.icon-link, & h5:hover .icon.icon-link, & h6:hover .icon.icon-link':
            { opacity: 0.5 },
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
    mdxOptions: {
      format: 'detect',
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrism, rehypeSlug, rehypeAutolinkHeadings],
    },
    parseFrontmatter: true,
  })) as MDXSource

  return { props: { menuData, source } }
}
