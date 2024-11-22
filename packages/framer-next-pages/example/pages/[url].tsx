import type { GetStaticPaths, GetStaticProps } from 'next'
import { Grid } from '../components/Grid'
import { StackDebug } from '../components/StackedDebugger'

type IndexProps = { title: string }
type RouteProps = { url: string }

function Index(props: IndexProps) {
  const { title } = props

  return (
    <div style={{ paddingLeft: 60, paddingRight: 20 }}>
      <h1>{title}</h1>
      <StackDebug />
      <Grid />
    </div>
  )
}

export default Index

export const getStaticPaths: GetStaticPaths<RouteProps> = async () =>
  Promise.resolve({
    paths: [{ params: { url: 'second' } }, { params: { url: 'third' } }],
    fallback: 'blocking',
  })

export const getStaticProps: GetStaticProps<IndexProps, RouteProps> = async ({ params }) =>
  Promise.resolve({
    props: { title: `Page ${params?.url}` },
  })
