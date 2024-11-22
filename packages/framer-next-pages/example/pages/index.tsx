import type { GetStaticProps } from 'next'
import { Grid } from '../components/Grid'
import { StackDebug } from '../components/StackedDebugger'

type IndexProps = { title: string }

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

export const getStaticProps: GetStaticProps<IndexProps> = async () =>
  Promise.resolve({
    props: {
      title: 'Index Page',
    },
  })
