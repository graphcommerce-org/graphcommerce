/* eslint-disable @typescript-eslint/require-await */
import { PageOptions } from '@reachdigital/framer-next-pages'
import { AnimatePresence, motion } from 'framer-motion'
import { GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import React from 'react'
import Grid, { data } from '../../components/Grid'
import StackDebug from '../../components/StackedDebugger'
import StackedDrawer from '../../components/StackedDrawer'

function ArticlePage({ articleId }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <StackedDrawer>
      <StackDebug />
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height: '100%',
        }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            style={{ position: 'absolute', left: 0, top: 0 }}
            key={articleId}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
          >
            <h1>Single Stack {articleId}</h1>
            <Grid />
          </motion.div>
        </AnimatePresence>
      </div>
    </StackedDrawer>
  )
}

ArticlePage.pageOptions = {
  stacked: true,
  scope: ({ router }) => router.pathname,
} as PageOptions

export default ArticlePage

type ParsedUrlQuery = { articleId: string }
export async function getStaticPaths(): Promise<GetStaticPathsResult<ParsedUrlQuery>> {
  return {
    paths: data.map((articleId) => ({ params: { articleId: articleId.toString() } })),
    fallback: false,
  }
}

export async function getStaticProps(ctx: GetStaticPropsContext<ParsedUrlQuery>) {
  return {
    props: ctx.params,
  }
}
