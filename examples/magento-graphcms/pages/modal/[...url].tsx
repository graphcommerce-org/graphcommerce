import { PageOptions } from '@graphcommerce/framer-next-pages'
import { HygraphPagesQuery } from '@graphcommerce/graphcms-ui'
import { hygraphPageContent } from '@graphcommerce/graphcms-ui/server'
import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import { MetaRobots, LayoutOverlayHeader, LayoutTitle, PageMeta } from '@graphcommerce/next-ui'
import { enhanceStaticPaths, enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { Box, Typography } from '@mui/material'
import { InferGetStaticPropsType } from 'next'
import { LayoutOverlay, LayoutOverlayProps, RowRenderer } from '../../components'
import { layoutProps } from '../../components/Layout/layout'
import { LayoutDocument } from '../../components/Layout/Layout.gql'

type Props = HygraphPagesQuery
type RouteProps = { url: string[] }

function ModalPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { pages } = props
  const page = pages?.[0]

  if (!pages?.[0]) return <div />

  const metaRobots = page?.metaRobots.toLowerCase().split('_').flat(1) as MetaRobots[]

  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span'>
          {page.title}
        </LayoutTitle>
      </LayoutOverlayHeader>
      <PageMeta
        title={page.metaTitle ?? ''}
        metaDescription={page.metaDescription}
        metaRobots={metaRobots ?? ['noindex']}
      />
      <Box pt={4}>
        <LayoutTitle>{page.title}</LayoutTitle>
        <Typography variant='body1' align='center'>
          {page.metaDescription ?? ''}
        </Typography>
      </Box>

      <RowRenderer content={page.content} />
    </>
  )
}

ModalPage.pageOptions = {
  Layout: LayoutOverlay,
  overlayGroup: 'modal',
  layoutProps: { variantMd: 'bottom' },
} as PageOptions

export default ModalPage

export const getStaticPaths = enhanceStaticPaths<RouteProps>('blocking', ({ locale }) =>
  [['modal']].map((url) => ({ params: { url }, locale })),
)

export const getStaticProps = enhanceStaticProps(
  layoutProps<Props, RouteProps>(async ({ params }) => {
    const urlKey = params?.url.join('/') ?? '??'
    const page = hygraphPageContent(`modal/${urlKey}`)

    if (!(await page).data.pages?.[0]) return { notFound: true }

    return {
      props: {
        ...(await page).data,
      },
      revalidate: 60 * 20,
    }
  }),
)
