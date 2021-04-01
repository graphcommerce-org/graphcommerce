import { StackOptions } from '@reachdigital/framer-next-pages/types'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import React from 'react'
import Grid, { data } from '../../components/Grid'
import StackDebug from '../../components/StackedDebugger'
import StackedDrawer from '../../components/StackedDrawer'

function ArticlePage({ articleId }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <StackedDrawer>
      <StackDebug />
      <h1>Multi Stack {articleId}</h1>
      <Grid />
    </StackedDrawer>
  )
}

const stackOptions: StackOptions = {
  stack: true,
}
ArticlePage.stackOptions = stackOptions

export default ArticlePage

// eslint-disable-next-line @typescript-eslint/require-await
export async function getStaticProps({
  params: { articleId },
}: GetStaticPropsContext<{ articleId: string }>) {
  return { props: { articleId } }
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function getStaticPaths() {
  return {
    paths: data.map((articleId) => ({ params: { articleId: articleId.toString() } })),
    fallback: false,
  }
}
