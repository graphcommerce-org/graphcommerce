import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import React from 'react'
import Article from '../../components/Article'
import Grid, { data } from '../../components/Grid'
import StackDebug from '../../components/StackDebug'
import StackedDrawer from '../../components/StackedDrawer'
import { StackOptions } from '../_app'

function ArticlePage({ articleId }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <StackedDrawer>
      <StackDebug />
      <Article id={articleId} />

      <Link href='/'>
        <a>Link</a>
      </Link>
      <Grid />
      {Array(100)
        .fill(undefined)
        .map((_, idx) => idx)
        .map((idx) => (
          <br key={idx} />
        ))}
    </StackedDrawer>
  )
}

const stackOptions: StackOptions = {
  stack: true,
  scope: ({ router }) => router.pathname,
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
